"use client";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Folder } from "../dashboard/Sidebar";
import { addFolder, addPage, deleteFolderOrPage, fetchFolders, saveContent } from "@/lib/supabase";
import { Button } from "../ui/button";
import { IbmPlexSans, poppins } from "@/lib/fonts";
import Editor from "./Editor";

const Admin: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newPageName, setNewPageName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getFolders = async () => {
      const data = await fetchFolders();
      setFolders(data);
    };

    getFolders();
  }, []);

  const refetchFolders = async () => {
    const data = await fetchFolders();
    setFolders(data);
  };

  const handleAddFolder = async () => {
    setLoading(true);
    setError(null);

    try {
      addFolder(newFolderName, selectedFolderId);

      const data = await fetchFolders();
      setFolders(data);
      setNewFolderName("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      refetchFolders();
    }
  };
  const handleAddPage = async () => {
    setLoading(true);
    setError(null);

    try {
      addPage(newPageName, selectedFolderId);
      const data = await fetchFolders();
      setFolders(data);
      setNewPageName("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolderOrPage = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      deleteFolderOrPage(id);
      const data = await fetchFolders();
      setFolders(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async () => {
    setLoading(true);
    setError(null);

    try {
    saveContent(selectedFolderId, content);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFolderOrPage = (folder: Folder) => {
    setSelectedFolderId(folder.id);
    setContent(folder.content || "");
  };

  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  return (
    <div className="container">
      <h1 className={`text-5xl ${poppins.className} font-bold`}>Admin Panel</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="flex items-center gap-5 w-full">
        <div className="flex flex-col w-full">
          <label>
            New Folder Name:
            <div className="flex bg-[#F4F4F4] border-b-2  border-[#8D8D8D]">
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
            <div className="flex bg-[#F4F4F4] border-b-2  border-[#8D8D8D]">
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
      <div>
        <h2 className={`${poppins.className} text-2xl font-semibold my-5`}>
          Folder/Page List
        </h2>
        <div>
          {folders.map((folder) => (
            <div
              className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
              key={folder.id}
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
      {selectedFolderId && (
        <div>
          <h2 className={`${IbmPlexSans.className} text-xl my-2`}>
            Edit Content
          </h2>
          <Editor value={content} onChange={handleChangeContent} />
          <br />
          <Button onClick={handleSaveContent} disabled={loading}>
            Save Content
          </Button>
        </div>
      )}
    </div>
  );
};

export default Admin;
