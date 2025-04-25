import sql from "@/app/lib/db";

export function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  sql`TRUNCATE TABLE task_lists, users CASCADE`.then((result) => {
    console.log("Truncated task_lists and users tables", result);
  });
  return new Response("ok");
}
