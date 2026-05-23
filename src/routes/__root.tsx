import { createRootRoute, Outlet } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { AppleMascot } from "@/components/AppleMascot";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <I18nProvider>
      <Outlet />
      <AppleMascot />
    </I18nProvider>
  );
}
