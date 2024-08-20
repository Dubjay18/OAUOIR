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
  path: string[]
): Promise<string | null> => {
  // Start with the root folder
  let parentId: string | null = null;

  for (const segment of path) {
    console.log(segment, path);

    // Fetch the folder/page with the current segment name and parentId
    let query = supabase
      .from("frontend_page_folders")
      .select("*")
      .eq("name", segment);
    console.log(parentId);

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

// Add a new folder
export const addFolder = async (name: string, parentId: string | null) => {
  const { error } = await supabase
    .from("frontend_page_folders")
    .insert([{ name, parent_id: parentId, is_folder: true }]);

  if (error) throw new Error(error.message);
};

// Add a new page
export const addPage = async (name: string, parentId: string | null) => {
  const { error } = await supabase
    .from("frontend_page_folders")
    .insert([{ name, parent_id: parentId, is_folder: false, content: "" }]);

  if (error) throw new Error(error.message);
};

// Delete a folder or page
export const deleteFolderOrPage = async (id: string) => {
  const { error } = await supabase
    .from("frontend_page_folders")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

// Save content to a page
export const saveContent = async (id: string | null, content: string) => {
  const { error } = await supabase
    .from("frontend_page_folders")
    .update({ content })
    .eq("id", id);

  if (error) throw new Error(error.message);
};
