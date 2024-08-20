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
import { FolderControls } from "./FolderControls";
import { FolderList } from "./FolderList";
import { EditorControls } from "./EditorControls";
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

      <FolderControls
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        newPageName={newPageName}
        setNewPageName={setNewPageName}
        handleAddFolder={handleAddFolder}
        handleAddPage={handleAddPage}
        loading={loading}
      />

      <FolderList
        folders={folders}
        handleSelectFolderOrPage={handleSelectFolderOrPage}
        handleDeleteFolderOrPage={handleDeleteFolderOrPage}
        loading={loading}
      />

      <EditorControls
        selectedFolderId={selectedFolderId}
        editorType={editorType}
        setEditorType={setEditorType}
        content={content}
        fullEmbedContent={fullEmbedContent}
        handleSaveContent={handleSaveContent}
        setFullEmbedContent={setFullEmbedContent}
        handleChangeContent={handleChangeContent}
        loading={loading}
      />
    </div>
  );
};

export default Admin;
