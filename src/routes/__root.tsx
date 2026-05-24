import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import "../lib/i18n";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { InquiryModal } from "@/components/InquiryModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/adminStore";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { loadSettings, isLoaded } = useAdminStore();
  const [minLoadFinished, setMinLoadFinished] = useState(false);

  useEffect(() => {
    loadSettings();
    // 2000ms ensures the GIF plays exactly once (or close to it)
    const timer = setTimeout(() => setMinLoadFinished(true), 2000);
    return () => clearTimeout(timer);
  }, [loadSettings]);

  const showLoader = !isLoaded || !minLoadFinished;

  return (
    <QueryClientProvider client={queryClient}>
      {/* 
        We always render the Outlet so that the website's images and 
        components can load in the background while the GIF plays! 
      */}
      <div className={showLoader ? 'h-screen overflow-hidden' : ''}>
        <Outlet />
      </div>
      
      <WhatsAppFloatingButton />
      <InquiryModal />

      {/* Foreground Loader */}
      {showLoader && (
        <div className="fixed inset-0 z-[99999] bg-[#020817] flex flex-col items-center justify-center pb-12 sm:pb-0">
          <div className="flex flex-col items-center justify-center -translate-y-12">
            <img src="/loader.gif" alt="Loading..." className="w-80 h-80 sm:w-96 sm:h-96 object-contain" />
            <div className="-mt-16 sm:-mt-20 text-orange-500 tracking-widest font-bold text-xs uppercase animate-pulse">Loading KRISHNA SCALE...</div>
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}
