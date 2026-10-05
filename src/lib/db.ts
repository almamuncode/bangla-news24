import "server-only";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & { newsMongo?: MongoClient };
export const client = globalForMongo.newsMongo ?? new MongoClient(process.env.MONGODB_URL as string);
if (process.env.NODE_ENV !== "production") globalForMongo.newsMongo = client;
export const db = client.db("bangla-news-24");
