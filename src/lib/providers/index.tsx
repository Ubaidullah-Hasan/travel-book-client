"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/src/context/user.provider";
import AllPostProvider from "@/src/context/allPostData.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AllPostProvider>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </AllPostProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
