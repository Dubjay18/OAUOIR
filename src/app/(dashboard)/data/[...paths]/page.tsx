"use client";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/context/PageContentContext";
import useDataPageContent from "@/hooks/useDataPageContent";
import { IbmPlexSans } from "@/lib/fonts";
import { Loader2 } from "lucide-react";
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

      // Adding an event listener for messages from the iframe
      window.addEventListener("message", (event) => {
        if (event.origin === new URL(url as string).origin) {
          // Check that the message is from a trusted origin
          const { height } = event.data;
          if (height && typeof height === "number") {
            const iframe = visualizationElement.querySelector("iframe");
            if (iframe) {
              iframe.style.height = `${height}px`;
            }
          }
        }
      });

      visualizationElement.innerHTML = `
        <div class="iframe-container" style="width: 100%; overflow: hidden;">
          <iframe 
            src="${url}" 
            style="width: 100%; border: none;" 
            scrolling="no"
          ></iframe>
        </div>
      `;
      div.replaceWith(visualizationElement);
    });

    return doc.body.innerHTML;
  };

  const isFullEmbed = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.querySelector("[data-full-embed]") !== null;
  };
  const { content, loading, error } = usePageContent();

  const fullEmbedUrl = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const visualizationDivs = doc.querySelectorAll("[data-full-embed]");
    if (!visualizationDivs.length) return "";
    return visualizationDivs[0].getAttribute("data-full-embed");
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>An Error Occurred</p>
          <Button
            onClick={() => window.location.reload()}
            variant={"destructive"}
          >
            Reload
          </Button>
        </div>
      </div>
    );
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
    <div className="ql-snow min-h-screen ">
      <div
        className={`ql-editor p-5  max-w-2xl mx-auto ${IbmPlexSans.className}`}
        dangerouslySetInnerHTML={{
          __html: renderVisualizations(content || ""),
        }}
      />
    </div>
  );
}
