import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

// Import and register custom embed
import "@/lib/customQuill";

// Custom toolbar for embedding visualizations
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1"> </option>
      <option value="2"> </option>
      <option value=""> </option>
    </select>
    <button className="ql-bold"> </button>
    <button className="ql-italic"> </button>
    <button className="ql-link"> </button>
    <button className="ql-image"> </button>
    <button className="ql-video"> </button>
    <button className="ql-embed"> Embed </button>
  </div>
);

// Add handler for custom embed button
const CustomQuill = () => {
  useEffect(() => {
    const toolbar = Quill.import("modules/toolbar");
    toolbar.handlers.embed = function () {
      const range = this.quill.getSelection();
      const url = prompt("Enter the URL of the visualization:");
      if (url) {
        this.quill.insertEmbed(
          range.index,
          "embed",
          url,
          (Quill as any).sources.USER,
        );
      }
    };
  }, []);

  return null;
};

export { CustomToolbar, CustomQuill };
