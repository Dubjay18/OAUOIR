"use client";
import React, { useEffect, useState } from "react";
import { fetchFolders } from "@/lib/supabase";
import { Folder } from "@/components/dashboard/Sidebar";
import { DataFolderContext } from "@/context/DataFolderContext";

type DataFolderProviderProps = {
  children: React.ReactNode;
};
export const DataFolderProvider: React.FC<DataFolderProviderProps> = ({
  children,
}) => {
  const [folders, setFolders] = useState<Folder[] | null>(null);

  useEffect(() => {
    const getFolders = async () => {
      const data = await fetchFolders();
      setFolders(data as Folder[]);
    };

    getFolders();
  }, []);

  return (
    <DataFolderContext.Provider value={folders}>
      {children}
    </DataFolderContext.Provider>
  );
};
