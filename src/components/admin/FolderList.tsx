import React from "react";
import { Button } from "../ui/button";
import { Folder } from "../dashboard/Sidebar";

interface FolderListProps {
  folders: Folder[];
  handleSelectFolderOrPage: (folder: Folder) => void;
  handleDeleteFolderOrPage: (id: string) => void;
  loading: boolean;
}

export const FolderList: React.FC<FolderListProps> = ({
  folders,
  handleSelectFolderOrPage,
  handleDeleteFolderOrPage,
  loading,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-5">Folder/Page List</h2>
      <div>
        {folders.map((folder, i) => (
          <div
            className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
            key={`i-${folder.id}`}
          >
            <p
              className="text-3xl"
              onClick={() => handleSelectFolderOrPage(folder)}
            >
              {folder.is_folder ? "📁" : "📄"} {folder.name}
            </p>
            <Button
              variant={"destructive"}
              onClick={() => handleDeleteFolderOrPage(folder.id)}
              disabled={loading}
              size={"sm"}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
