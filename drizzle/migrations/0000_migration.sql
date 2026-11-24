CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  request_type text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  postal_code text NOT NULL,
  subject text NOT NULL,
  brand text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  page_path text NOT NULL DEFAULT '',
  attachments jsonb NOT NULL DEFAULT '[]'::jsonb
);

GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Geen policies voor anon/authenticated: aanvragen worden enkel server-side
-- (service role) opgeslagen en zijn niet leesbaar voor websitebezoekers.

CREATE INDEX quote_requests_created_at_idx ON public.quote_requests (created_at DESC);