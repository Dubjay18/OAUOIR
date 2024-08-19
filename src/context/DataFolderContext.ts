import { Folder } from "@/components/dashboard/Sidebar";
import {
  QueryObserverRefetchErrorResult,
  UseQueryResult,
} from "@tanstack/react-query";
import React from "react";

export const DataFolderContext = React.createContext<
  UseQueryResult<any[], Error>
>({} as UseQueryResult<any[], Error>);
