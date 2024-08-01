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
    const doc = parser.parseFromString(html, 'text/html');
    
    const visualizationDivs = doc.querySelectorAll('[data-visualization]');
    visualizationDivs.forEach((div) => {
      const url = div.getAttribute('data-visualization');
      const visualizationElement = document.createElement('div');
      // Replace this with actual logic to render the visualization
      visualizationElement.innerHTML = `<iframe src="${url}" width="600" height="400"></iframe>`;
      div.replaceWith(visualizationElement);
    });
  
    return doc.body.innerHTML;
  };
  const { content, loading, error } = useDataPageContent(params.paths);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ql-snow">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: renderVisualizations(content || '') }}
      />
    </div>
  );
}
