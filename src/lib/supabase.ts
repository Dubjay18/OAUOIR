import { createClient } from "./supabseClient";

const supabase = createClient();
export const fetchFolders = async () => {
  const { data, error } = await supabase
    .from("frontend_page_folders")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};
export const getPageContentByPath = async (
  path: string[],
): Promise<string | null> => {
  // Start with the root folder
  let parentId: string | null = null;

  for (const segment of path) {
    // Fetch the folder/page with the current segment name and parentId
    let query = supabase
      .from("frontend_page_folders")
      .select("*")
      .eq("name", segment);

    if (parentId) {
      query = query.eq("parent_id", parentId);
    } else {
      query = query.is("parent_id", null); // Root level folders
    }

    const { data: folder, error } = await query.single();

    if (error || !folder) {
      throw new Error(`Path segment "${segment}" not found.`);
    }

    // Move to the next level in the path
    parentId = folder.id;
  }
  // Fetch the content of the final folder/page
  const { data: finalFolder, error: finalError } = await supabase
    .from("frontend_page_folders")
    .select("content")
    .eq("id", parentId)
    .single();

  if (finalError || !finalFolder) {
    throw new Error(`Final path segment content not found.`);
  }

  return finalFolder.content;
};
export const getPageContent = async (fullPath: string): Promise<any> => {
  // Remove 'dashboard' from the path

  // Fetch the page content from Supabase based on the modified path
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("name", fullPath)
    .single();

  if (error || !data) {
    return `Path segment "${fullPath}" not found`;
  }

  return data;
};
