import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export async function fetchPages() {
  const query = `*[_type == "page"]{
    _id,
    name,
    isFolder,
    parentId->{
      _id,
      name
    },
    editorType,
    content[] {
      ...,
      _type == "embed" => {
        embedUrl,
        embedDescription
      }
    },
    fullEmbedUrl
  }`;

  const result = await client.fetch(query);
  return result;
}
export async function fetchPageContent(id: string) {
  const query = `
    *[_type == "page" && _id == $id][0]{
      _id,
      name,
      "content": coalesce(fullEmbedUrl, content)
    }
  `;

  const params = { id };

  try {
    const result = await client.fetch(query, params);
    return result;
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw new Error("Failed to fetch page content.");
  }
}

export async function fetchData() {
  const query = `*[_type == "page"]{
    _id,
    name,
    parentId->{
      _id,
      name
    },
  }`;

  const result = await client.fetch(query);
  return result;
}
