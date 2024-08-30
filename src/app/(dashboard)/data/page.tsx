"use client";
import { Button } from "@/components/ui/button";
import { DataFolderContext } from "@/context/DataFolderContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useLayoutEffect } from "react";

export default function Page() {
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const router = useRouter();
  useLayoutEffect(() => {
    if (folders) {
      router.push(`/data/${folders[0]?.name}`);
    }
  }, [folders, router]);
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

  return (
    <div>
      <h1 className="text-2xl font-bold underline">
        Welcome To OAU&apos;s Real Time data dashboard
      </h1>
      <p className="text-lg mt-4">
        This is a dashboard that displays real time data from the Obafemi
        Awolowo University, Ile-Ife
      </p>
      {!!folders?.length && <p>Redirecting...</p>}
    </div>
  );
}
