import React from "react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { EditorType } from "@/types";

const QuillEditor = dynamic(() => import("./Editor"), { ssr: false });

interface EditorControlsProps {
  selectedFolderId: string | null;
  editorType: EditorType;
  setEditorType: (type: EditorType) => void;
  content: string;
  fullEmbedContent: string;
  handleSaveContent: () => void;
  setFullEmbedContent: (content: string) => void;
  handleChangeContent: (content: string) => void;
  loading: boolean;
}

export const EditorControls: React.FC<EditorControlsProps> = ({
  selectedFolderId,
  editorType,
  setEditorType,
  content,
  fullEmbedContent,
  handleSaveContent,
  setFullEmbedContent,
  handleChangeContent,
  loading,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap mx-auto mt-10">
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
          <h2 className="text-xl my-2">Edit Content</h2>
          <QuillEditor value={content} onChange={handleChangeContent} />
          <br />
          <Button onClick={handleSaveContent} disabled={loading}>
            Save Content
          </Button>
        </div>
      )}
      {selectedFolderId && editorType == EditorType.Embed && (
        <div>
          <h2 className="text-xl my-2">Add Embed link</h2>
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
