"use client";
import { fetchPageContent } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { useState, useEffect } from "react";

const PageContent = ({ id }: { id: string }) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const customComponents = {
    types: {
      embed: ({
        value,
      }: {
        value: {
          embedDescription: string;
          embedUrl: string;
        };
      }) => (
        <div>
          <h4>{value.embedDescription}</h4>
          <iframe
            src={value.embedUrl}
            title={value.embedDescription}
            style={{ width: "100%", height: "400px", border: "none" }}
          />
        </div>
      ),
      // Fallback for unknown block types
      undefined: (block: any) => (
        <div>
          <p>Unknown block type</p>
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div>
      ),
    },
    marks: {
      link: ({
        children,
        value,
      }: {
        children: React.ReactNode;
        value: {
          href: string;
        };
      }) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchPageContent(id);
        setContent(result);
      } catch (error) {
        console.error("Error fetching page content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return <div>No content found.</div>;
  }

  // If it's a full embed URL, render it in an iframe
  if (
    typeof content?.content == "string" &&
    content?.content?.startsWith("http")
  ) {
    return (
      <div className="embed-container">
        <iframe src={content?.content} className="w-full h-full" />
      </div>
    );
  }
  console.log(content, "ksks");

  // If it's article content, render it as HTML
  return (
    <div className="article-content">
      <PortableText
        value={content?.content}
        components={customComponents as any}
      />
    </div>
  );
};

export default PageContent;
