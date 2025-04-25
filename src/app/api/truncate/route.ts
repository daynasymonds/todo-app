import sql from "@/app/lib/db";

export async function GET(request: Request) {
  console.log("Truncate API called");
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.log("Unauthorized access attempt to truncate");
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  console.log("Truncating task_lists and users tables");

  try {
    const result = await sql`TRUNCATE TABLE task_lists, users CASCADE`;
    console.log("Truncated task_lists and users tables", result);
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Error truncating task_lists and users tables", error);
    return new Response("Error truncating tables", {
      status: 500,
    });
  }
}
