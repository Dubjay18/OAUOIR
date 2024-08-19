"use client";
import { DataFolderProvider } from "@/providers/Datafolderprovider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function AppProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DataFolderProvider>{children}</DataFolderProvider>
      </QueryClientProvider>
    </>
  );
}

export default AppProviders;
