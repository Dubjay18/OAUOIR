"use client";
import React, { useEffect, useState } from "react";
import { fetchFolders } from "@/lib/supabase";
import { Folder } from "@/components/dashboard/Sidebar";
import { DataFolderContext } from "@/context/DataFolderContext";
import { useQuery } from "@tanstack/react-query";

type DataFolderProviderProps = {
  children: React.ReactNode;
};
export const DataFolderProvider: React.FC<DataFolderProviderProps> = ({
  children,
}) => {
  const query = useQuery({ queryKey: ["folders"], queryFn: fetchFolders });
  return (
    <DataFolderContext.Provider value={query}>
      {children}
    </DataFolderContext.Provider>
  );
};
