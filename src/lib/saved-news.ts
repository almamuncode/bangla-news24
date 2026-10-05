import "server-only";
import { db } from "@/lib/db";

export type SavedNews = {
  _id: string;
  userId: string;
  articleId: string;
  title: string;
  savedAt: Date;
};

export const savedNews = db.collection<SavedNews>("saved_news");
export const bookmarkId = (userId: string, articleId: string) => JSON.stringify([userId, articleId]);
