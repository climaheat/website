import { useEffect, useRef, useState } from "react";

/**
 * Stil, lussend sfeerfilmpje.
 * - Laadt pas wanneer het bijna in beeld komt (behalve `eager` bovenaan de pagina).
 * - Pauzeert buiten beeld, zodat de pagina licht en vlot blijft.
 * - Respecteert "beperkte beweging": dan blijft enkel het voorbeeldbeeld zichtbaar.
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(eager);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches || !visible.current) video.pause();
      else video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = Boolean(entry?.isIntersecting);
        if (visible.current) setActive(true);
        sync();
      },
      { rootMargin: "250px 0px" },
    );
    observer.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && visible.current) video.play().catch(() => undefined);
  }, [active]);

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}

/** Sfeerfilmpje met terracotta kaderlijn. */
export function VideoFigure({
  src,
  poster,
  aspect = "aspect-[2.2/1]",
  className = "",
}: {
  src: string;
  poster: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={`border-l-[3px] border-accent pl-3 ${className}`}>
      <div className="overflow-hidden bg-muted">
        <AmbientVideo src={src} poster={poster} className={`${aspect} w-full object-cover`} />
      </div>
    </figure>
  );
}
