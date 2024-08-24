export enum EditorType {
  Article = "article",
  Embed = "embed",
}

export type TArticle = {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  author?: string;
  date?: string;
  content?: string;
};
