"use client"
import useDataPageContent from "@/hooks/useDataPageContent";

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

  return <div>{content}</div>;
};
