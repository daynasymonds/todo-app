"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import z from "zod";
import sql from "@/app/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { TasksDto, emptyTasksDto } from "@/app/lib/types";
import { SignupState } from "@/app/lib/types";

const SignupFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(32)
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
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Something went wrong during sign in.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  redirect("/");
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
    const insertResult = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING
        
        returning id
      `;

    const userId = insertResult[0].id;
    const content = JSON.stringify(emptyTasksDto);
    await sql`
      INSERT INTO task_lists (content, user_id) VALUES (${content}, ${userId})
      `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: failed to create account.",
    } as SignupState;
  }

  redirect("/login");
}

export async function getTaskData(userId: string): Promise<TasksDto> {
  try {
    const list = await sql`
    SELECT content FROM task_lists WHERE user_id::text = ${userId}
  `;

    if (list.length === 1) {
      return JSON.parse(list[0].content) as TasksDto;
    }
  } catch (error) {
    console.error("Error fetching tasks from database:", error);
    return emptyTasksDto;
  }

  console.log("No tasks found for user, returning initial tasks");
  return emptyTasksDto;
}

export async function saveTaskData(tasksDto: TasksDto): Promise<void> {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  if (!userId) {
    console.log("No user ID found, not saving tasks.");
    return;
  }

  const content = JSON.stringify(tasksDto);
  console.log("Saving task data to database");
  try {
    await sql`
    UPDATE task_lists SET content = ${content} WHERE user_id::text = ${userId}
    `;
  } catch (error) {
    console.error("Error saving tasks to database:", error);
  }
}
