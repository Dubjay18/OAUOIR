import React from "react";
import { Button } from "../ui/button";
import { Folder } from "../dashboard/Sidebar";
import { Loader2 } from "lucide-react";

interface FolderListProps {
  folders: Folder[];
  handleSelectFolderOrPage: (folder: Folder) => void;
  handleDeleteFolderOrPage: (id: string) => void;
  loading: boolean;
  selectedId?: string;
}

export const FolderList: React.FC<FolderListProps> = ({
  folders,
  handleSelectFolderOrPage,
  handleDeleteFolderOrPage,
  loading,
  selectedId,
}) => {
  function sortByParentChildRelationship(data: Folder[]) {
    // Create a map to store nodes by their ID for easy lookup
    const nodeMap = new Map();
    data.forEach((item) => nodeMap.set(item.id, item));

    // Create a new array for sorted output
    const sorted: Folder[] = [];

    // Function to recursively add an item and its parents
    function addNodeAndParents(node: any) {
      if (node.parent_id) {
        const parent = nodeMap.get(node.parent_id);
        if (!sorted.includes(parent)) {
          addNodeAndParents(parent);
        }
      }
      if (!sorted.includes(node)) {
        sorted.push(node);
      }
    }

    // Iterate over the original data array
    data.forEach((item) => addNodeAndParents(item));

    return sorted;
  }
  const sortedFolders = sortByParentChildRelationship(folders);

  return (
    <div>
      <h2 className="text-2xl font-semibold my-5">Folder/Page List</h2>
      <div>
        {sortedFolders.map((folder, i) => (
          <div
            className={`flex justify-between items-center p-2 border border-gray-200 hover:bg-slate-200 ${
              selectedId == folder?.id && "bg-slate-200"
            } duration-300 transition-all cursor-pointer rounded-md`}
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
              {loading ? (
                <Loader2 className="animate-spin text-primary" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
