import { requireAdmin } from "@/lib/admin-auth";
import { restoreDatabaseBackup } from "@/lib/database-backup";

export const runtime = "nodejs";

async function readBackupFromRequest(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.text !== "function") {
      throw new Error("Please upload a JSON backup file.");
    }

    return JSON.parse(await file.text());
  }

  return request.json();
}

export async function POST(request) {
  const auth = await requireAdmin();

  if (auth.error) {
    return auth.error;
  }

  try {
    const backup = await readBackupFromRequest(request);
    const result = await restoreDatabaseBackup(backup);

    return new Response(JSON.stringify({ message: "Database restored", result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database import error:", error);

    return new Response(
      JSON.stringify({ error: error.message || "Failed to import database backup" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
