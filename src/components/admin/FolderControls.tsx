import React from "react";
import { Button } from "../ui/button";
import { Folder } from "../dashboard/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FolderControlsProps {
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  newPageName: string;
  setNewPageName: (name: string) => void;
  handleAddFolder: (folderId: string) => void;
  handleAddPage: (folderId: string) => void;
  loading: boolean;
  error: any;
  routes: Folder[];
}

export const FolderControls: React.FC<FolderControlsProps> = ({
  newFolderName,
  setNewFolderName,
  newPageName,
  setNewPageName,
  handleAddFolder,
  handleAddPage,
  loading,
  error,
  routes,
}) => {
  const [folderId, setFolderId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [openFolder, setOpenFolder] = React.useState(false);
  const dialogSubmit = () => {
    handleAddPage(folderId as string);
    if (!error && !loading) setOpen(false);
    console.log(error);
  };
  const dialogSubmitFolder = () => {
    console.log(folderId, "folderId", newFolderName);

    handleAddFolder(folderId as string);
    if (!error && !loading) setOpenFolder(false);
    console.log(error);
  };

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
        <FolderDialog
          folderId={folderId}
          setFolderId={setFolderId}
          folders={routes}
          open={openFolder}
          submit={dialogSubmitFolder}
          loading={loading}
        >
          <Button
            variant={"outline"}
            type="button"
            onClick={() => setOpenFolder(true)}
            disabled={loading || !newFolderName || newFolderName === ""}
          >
            Add Folder
          </Button>
        </FolderDialog>
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
        <FolderDialog
          folderId={folderId}
          setFolderId={setFolderId}
          folders={routes}
          open={open}
          submit={dialogSubmit}
          loading={loading}
        >
          <Button
            type="button"
            disabled={loading || newPageName === ""}
            onClick={() => setOpen(true)}
          >
            Add Page
          </Button>
        </FolderDialog>
      </div>
    </div>
  );
};

function FolderDialog({
  folderId,
  setFolderId,
  folders,
  children,
  open,
  submit,
  loading,
}: {
  folders: Folder[];
  folderId: string | null;
  setFolderId: (id: string | null) => void;
  children: React.ReactNode;
  open: boolean;
  submit: () => void;
  loading: boolean;
}) {
  let onlyFolders = folders.filter((folder) => folder.is_folder);
  return (
    <Dialog modal open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>select a route folder for the page</DialogTitle>
          <DialogDescription>
            Choose a folder to add a new page to
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {onlyFolders.map((folder) => (
            <div
              className={` flex justify-between items-center p-2 border border-gray-200 hover:bg-slate-200 duration-300 transition-all cursor-pointer rounded-md ${
                folderId == folder?.id && "bg-slate-200"
              }`}
              key={folder.id}
              onClick={() => setFolderId(folder.id)}
            >
              {folder.name}
            </div>
          ))}
          <div
            className={` flex justify-between items-center p-2 border border-gray-200 hover:bg-slate-200 duration-300 transition-all cursor-pointer rounded-md ${
              folderId == null && "bg-slate-200"
            }`}
            onClick={() => setFolderId(null)}
          >
            No Parent Folder
          </div>
        </div>
        <div>
          <Button type="button" disabled={loading} onClick={() => submit()}>
            {loading ? "Loading" : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
