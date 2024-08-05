import { Folder } from "@/components/dashboard/Sidebar";
import React from "react";

export const DataFolderContext = React.createContext<Folder[] | null>(null);
