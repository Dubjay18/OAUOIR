import { getPageContentByPath } from "@/lib/supabase";
import { useState, useEffect } from "react";

export interface UsePageContentResult {
  content: string | null;
  loading: boolean;
  error: string | null;
}

const useDataPageContent = (path: string[]): UsePageContentResult => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const pageContent = await getPageContentByPath(path);
        setContent(pageContent);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path]);

  return { content, loading, error };
};

export default useDataPageContent;
