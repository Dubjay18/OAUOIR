"use client";
import { IbmPlexSans, poppins } from "@/lib/fonts";
import {
  addFolder,
  addPage,
  deleteFolderOrPage,
  fetchFolders,
  saveContent,
} from "@/lib/supabase";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Folder } from "../dashboard/Sidebar";
import { Button } from "../ui/button";
const QuillEditor = dynamic(() => import("./Editor"), { ssr: false });

enum EditorType {
  Article = "article",
  Embed = "embed",
}
const Admin: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newPageName, setNewPageName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editorType, setEditorType] = useState<EditorType>(EditorType.Article);
  const [fullEmbedContent, setFullEmbedContent] = useState<string>("");

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
      if (editorType == EditorType.Article) {
        if (selectedFolderId) {
          saveContent(selectedFolderId, content);
        }
      } else {
        saveContent(
          selectedFolderId,
          handleFullEmbedContent(fullEmbedContent) as string
        );
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const FindFullEmbedDiviContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const visualizationDivs = doc.querySelectorAll("[data-full-embed]");
    if (!visualizationDivs.length) return "";

    visualizationDivs.forEach((div) => {
      const url = div.getAttribute("data-full-embed");
      const visualizationElement = document.createElement("div");
      visualizationElement.innerHTML = `<div class="visualization" data-full-embed="${url}" style="border: 1px solid rgb(204, 204, 204); padding: 10px; margin: 10px 0px; display: flex; justify-content: center; align-items: center; font-size: 1.2em; font-weight: bold; color: rgb(51, 51, 51);">Visualization: ${url}</div>`;
      div.replaceWith(visualizationElement);
    });

    return doc.body.innerHTML;
  };
  const handleSelectFolderOrPage = (folder: Folder) => {
    setSelectedFolderId(folder.id);
    setContent(folder.content || "");
    setFullEmbedContent(FindFullEmbedDiviContent(folder.content || ""));
  };

  const handleChangeContent = (content: string) => {
    if (!selectedFolderId) return;
    setContent(content);
  };

  const handleFullEmbedContent = (content: string) => {
    if (!selectedFolderId) return;

    return `<div class="visualization" data-full-embed="${content}" style="border: 1px solid rgb(204, 204, 204); padding: 10px; margin: 10px 0px; display: flex; justify-content: center; align-items: center; font-size: 1.2em; font-weight: bold; color: rgb(51, 51, 51);">Visualization: ${content}</div>`;
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
      <div className="flex items-center justify-center">
        <div className="flex items-center  gap mx-auto mt-10">
          <Button
            variant={editorType == EditorType.Article ? "default" : "ghost"}
            onClick={() => setEditorType(EditorType.Article)}
          >
            Article + Embed
          </Button>{" "}
          - or -
          <Button
            variant={editorType == EditorType.Embed ? "default" : "ghost"}
            onClick={() => setEditorType(EditorType.Embed)}
          >
            Full Embed
          </Button>
        </div>
      </div>
      {selectedFolderId && editorType == EditorType.Article && (
        <div>
          <h2 className={`${IbmPlexSans.className} text-xl my-2`}>
            Edit Content
          </h2>
          <QuillEditor value={content} onChange={handleChangeContent} />
          <br />
          <Button onClick={handleSaveContent} disabled={loading}>
            Save Content
          </Button>
        </div>
      )}
      {selectedFolderId && editorType == EditorType.Embed && (
        <div>
          <h2 className={`${IbmPlexSans.className} text-xl my-2`}>
            Add Embed link
          </h2>
          <input
            value={fullEmbedContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFullEmbedContent(e.target.value);
            }}
            className="w-full h-10 p-2 rounded-md border border-neutral-300"
          />
          <br />
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
