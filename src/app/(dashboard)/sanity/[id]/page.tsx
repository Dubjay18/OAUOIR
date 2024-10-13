import PageContent from "@/components/sanity/PageContent";
import React from "react";

function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  console.log(params.id);

  return <PageContent id={params.id} />;
}

export default Page;
