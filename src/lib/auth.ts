import { betterAuth } from "better-auth";
import { client, db } from "@/lib/db";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
});
