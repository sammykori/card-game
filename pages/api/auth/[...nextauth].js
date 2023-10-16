import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/dist/server/api-utils";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        
      }),
    // ...add more providers here
  ],
  secret:process.env.SECRET,
}
export default NextAuth(authOptions)