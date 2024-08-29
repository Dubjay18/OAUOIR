"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useDataPageContent, {
  UsePageContentResult,
} from "@/hooks/useDataPageContent";

// Define the shape of the context
interface PageContentContextProps extends UsePageContentResult {}

// Create the context
const PageContentContext = createContext<PageContentContextProps | undefined>(
  undefined
);

// Create a provider component
export const PageContentProvider = ({
  path,
  children,
}: {
  path: string[];
  children: ReactNode;
}) => {
  const pageContent = useDataPageContent(path);

  return (
    <PageContentContext.Provider value={pageContent}>
      {children}
    </PageContentContext.Provider>
  );
};

// Create a custom hook to use the PageContentContext
export const usePageContent = () => {
  const context = useContext(PageContentContext);
  if (context === undefined) {
    throw new Error("usePageContent must be used within a PageContentProvider");
  }
  return context;
};
