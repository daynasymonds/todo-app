"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import z from "zod";
import sql from "@/app/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export type SignupState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirm?: string[];
  };
  message?: string | null;
};

const SignupFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine(
        (p) => /[a-zA-Z]+/g.test(p ?? ""),
        "Password must contain at least one letter."
      )
      .refine(
        (p) => /[0-9]/g.test(p ?? ""),
        "Password must contain at least one number."
      )
      .refine(
        (p) => /[!@#\$%\^\&*\)\(+=._-]+/g.test(p ?? ""),
        "Password must contain at least one special character."
      ),
    confirm: z.string().min(8),
  })
  .refine((obj) => obj.confirm === obj.password, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "SignOutError":
          return "An error occurred in the sign out process.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(prevState: SignupState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create account.",
    };
  }

  const { email, password } = validatedFields.data;
  const existing = await sql`SELECT id FROM users WHERE email = ${email};`;
  if (existing.length > 0) {
    return {
      message: "An account with this email already exists.",
    } as SignupState;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
    return {
      message: "Database Error: failed to create account.",
    } as SignupState;
  }

  redirect("/");
}
