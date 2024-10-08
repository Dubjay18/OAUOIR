"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import Quill and register a custom module
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export const AvailableLineHeights = Array.from(Array(110).keys()).map(
  (x) => `${(80 + x * 5) / 100}`
);
// Define a custom blot for visualization
const BlockEmbed = Quill.import("blots/block/embed");

const Parchment = Quill.import("parchment");
const LineHeightStyle = new Parchment.Attributor.Style(
  "line-height",
  "line-height",
  {
    scope: Parchment.Scope.INLINE,
    whitelist: ["1", "1.5", "2", "2.5", "3"], // Only these values will be allowed
  }
);

Quill.register(LineHeightStyle, true);

class VisualizationBlot extends BlockEmbed {
  static blotName = "visualization";
  static tagName = "div";
  static className = "visualization";

  static create(value: any) {
    const node = super.create(VisualizationBlot.tagName);
    node.setAttribute("data-visualization", value);
    node.innerHTML = `Visualization: ${value}`;
    node.style.border = "1px solid #ccc";
    node.style.padding = "10px";
    node.style.margin = "10px 0";
    node.style.display = "flex";
    node.style.justifyContent = "center";
    node.style.alignItems = "center";
    node.style.fontSize = "1.2em";
    node.style.fontWeight = "bold";
    node.style.color = "#333";

    return node;
  }

  static value(node: any) {
    return node.getAttribute("data-visualization");
  }
}

// Register the custom blot with Quill
Quill.register("formats/visualization", VisualizationBlot, true);

const icons = Quill.import("ui/icons");
icons["embedVisualization"] = `<svg viewbox="0 0 18 18"> 
  <path fill="currentColor" d="M3,3 L15,3 L15,15 L3,15 Z M5,5 L13,5 L13,13 L5,13 Z"/>
</svg>`;

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      [{ "line-height": ["1", "1.5", "2", "2.5", "3"] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["bold", "italic", "underline", "embedVisualization"],
    ],
    handlers: {
      embedVisualization: function (this: any) {
        const url = prompt("Enter the URL of the visualization:");
        if (url) {
          const range = this.quill.getSelection();
          if (range) {
            this.quill.insertEmbed(range.index, "visualization", url);
          }
        }
      },
    },
  },
};

const Editor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={[
          "header",
          "line-height",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "visualization",
        ]}
      />
    </>
  );
};

export default Editor;
