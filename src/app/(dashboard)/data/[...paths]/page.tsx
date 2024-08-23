"use client";
import useDataPageContent from "@/hooks/useDataPageContent";
import "react-quill/dist/quill.snow.css";
export default function Page({
  params,
}: {
  params: {
    paths: string[];
  };
}) {
  const renderVisualizations = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const visualizationDivs = doc.querySelectorAll("[data-visualization]");
    visualizationDivs.forEach((div) => {
      const url = div.getAttribute("data-visualization");
      const visualizationElement = document.createElement("div");
      // Replace this with actual logic to render the visualization
      visualizationElement.innerHTML = `<div class="iframe-container"><iframe src="${url}"></iframe></div>`;
      div.replaceWith(visualizationElement);
    });

    return doc.body.innerHTML;
  };

  const isFullEmbed = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.querySelector("[data-full-embed]") !== null;
  };
  const { content, loading, error } = useDataPageContent(params.paths);

  const fullEmbedUrl = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const visualizationDivs = doc.querySelectorAll("[data-full-embed]");
    if (!visualizationDivs.length) return "";
    return visualizationDivs[0].getAttribute("data-full-embed");
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (isFullEmbed(content || "")) {
    console.log(content, "content");

    return (
      <div className="embed-container">
        <iframe
          src={fullEmbedUrl(content || "") || ""}
          className="w-full h-full"
        />
      </div>
    );
  }
  return (
    <div className="ql-snow min-h-screen">
      <div
        className="ql-editor !p-0 h-screen"
        dangerouslySetInnerHTML={{
          __html: renderVisualizations(content || ""),
        }}
      />
    </div>
  );
}
