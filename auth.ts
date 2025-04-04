import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z, ZodError } from "zod";
import type { User } from "@/app/types";
import bcrypt from "bcrypt";
import sql from "@/app/lib/db";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

async function getUser(email: string): Promise<User> {
  try {
    const user = await sql<
      User[]
    >`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await SignInSchema.parseAsync(
            credentials
          );
          
          const user = await getUser(email);
          if (user) {
            const isPassword = await bcrypt.compare(password, user.password);
            if (isPassword) {
              console.log("User found:", user);
              const session = auth();
              console.log("credsProvider: Session:", session);
              return user;
            }
          }
          
        } catch (error) {
          if (error instanceof ZodError) {
            console.log("credentials object is not expected format");
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
