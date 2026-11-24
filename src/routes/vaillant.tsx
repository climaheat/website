import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vaillant")({
  component: () => <Outlet />,
});
