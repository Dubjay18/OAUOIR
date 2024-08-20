import React from "react";
import { Button } from "../ui/button";

interface FolderControlsProps {
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  newPageName: string;
  setNewPageName: (name: string) => void;
  handleAddFolder: () => void;
  handleAddPage: () => void;
  loading: boolean;
}

export const FolderControls: React.FC<FolderControlsProps> = ({
  newFolderName,
  setNewFolderName,
  newPageName,
  setNewPageName,
  handleAddFolder,
  handleAddPage,
  loading,
}) => {
  return (
    <div className="flex items-center gap-5 w-full">
      <div className="flex flex-col w-full">
        <label>
          New Folder Name:
          <div className="flex bg-[#F4F4F4] border-b-2 border-[#8D8D8D]">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="h-12 px-2 bg-transparent w-full outline-none"
            />
          </div>
        </label>
        <br />
        <Button
          variant={"outline"}
          onClick={handleAddFolder}
          disabled={loading}
        >
          Add Folder
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <label>
          New Page Name:
          <div className="flex bg-[#F4F4F4] border-b-2 border-[#8D8D8D]">
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="h-12 px-2 bg-transparent w-full outline-none"
            />
          </div>
        </label>
        <br />
        <Button onClick={handleAddPage} disabled={loading}>
          Add Page
        </Button>
      </div>
    </div>
  );
};
