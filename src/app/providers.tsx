"use client";
import { AppProvider } from "@context/appContext";
import { HeroUIProvider, Spinner, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 10,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <HeroUIProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen bg-gray-50">
                <Spinner variant="gradient" />
              </div>
            }
          >
            <AppProvider>
              {children}
              <ToastProvider />
            </AppProvider>
          </Suspense>
        </HeroUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
