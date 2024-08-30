"use client";
import { Button } from "@/components/ui/button";
import { DataFolderContext } from "@/context/DataFolderContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useLayoutEffect } from "react";

export default function Page() {
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (isError) {
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
  useLayoutEffect(() => {
    if (folders) {
      router.push(`/data/${folders[0]?.name}`);
    }
  }, [folders]);
  return (
    <div>
      <h1>DataPage</h1>
    </div>
  );
}
