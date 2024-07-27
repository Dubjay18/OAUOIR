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
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </div>
  );
}
