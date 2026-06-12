import { requireAdmin } from "@/lib/admin-auth";
import { buildDatabaseBackup } from "@/lib/database-backup";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();

  if (auth.error) {
    return auth.error;
  }

  try {
    const backup = await buildDatabaseBackup();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `novotion-database-backup-${timestamp}.json`;

    return new Response(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Database export error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to export database backup" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
