import prisma from "@/lib/prisma";

const BACKUP_VERSION = 1;

const TABLES = [
  {
    key: "customPackages",
    modelName: "customPackage",
    dateFields: ["createdAt", "updatedAt"],
  },
  {
    key: "topicSuggestions",
    modelName: "topicSuggestion",
    dateFields: ["createdAt", "updatedAt"],
  },
  {
    key: "contactMessages",
    modelName: "contactMessage",
    dateFields: ["createdAt", "updatedAt"],
  },
  {
    key: "emailQueue",
    modelName: "emailQueue",
    dateFields: ["createdAt", "updatedAt"],
  },
  {
    key: "users",
    modelName: "user",
    dateFields: ["createdAt", "updatedAt", "resetTokenExpiry"],
  },
  {
    key: "payments",
    modelName: "payment",
    dateFields: ["createdAt", "updatedAt"],
  },
  {
    key: "blogs",
    modelName: "blog",
    dateFields: ["createdAt", "updatedAt"],
  },
  {
    key: "purchases",
    modelName: "purchase",
    dateFields: ["createdAt", "updatedAt"],
  },
];

const RESTORE_ORDER = [
  "customPackages",
  "topicSuggestions",
  "contactMessages",
  "emailQueue",
  "users",
  "payments",
  "blogs",
  "purchases",
];

const DELETE_ORDER = [
  "purchases",
  "blogs",
  "payments",
  "users",
  "emailQueue",
  "contactMessages",
  "topicSuggestions",
  "customPackages",
];

function toBackupRecord(record) {
  return JSON.parse(JSON.stringify(record));
}

function reviveDateFields(record, dateFields) {
  const revived = { ...record };

  for (const field of dateFields) {
    if (revived[field]) {
      revived[field] = new Date(revived[field]);
    }
  }

  return revived;
}

export async function buildDatabaseBackup() {
  const entries = await Promise.all(
    TABLES.map(async ({ key, modelName }) => {
      const rows = await prisma[modelName].findMany({
        orderBy: { createdAt: "asc" },
      });

      return [key, rows.map(toBackupRecord)];
    }),
  );

  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    source: {
      app: "novotion-app",
      provider: "prisma-postgresql",
    },
    tables: Object.fromEntries(entries),
  };
}

export async function restoreDatabaseBackup(backup) {
  if (!backup || typeof backup !== "object") {
    throw new Error("Backup file is invalid.");
  }

  if (backup.version !== BACKUP_VERSION) {
    throw new Error("Unsupported backup version.");
  }

  const tables = backup.tables;

  if (!tables || typeof tables !== "object") {
    throw new Error("Backup file is missing table data.");
  }

  for (const tableName of RESTORE_ORDER) {
    if (!Array.isArray(tables[tableName])) {
      throw new Error(`Backup file is missing the ${tableName} table.`);
    }
  }

  await prisma.$transaction(async (tx) => {
    for (const tableName of DELETE_ORDER) {
      await tx[tableName].deleteMany({});
    }

    for (const { key, modelName, dateFields } of TABLES) {
      const records = tables[key].map((record) =>
        reviveDateFields(record, dateFields),
      );

      if (records.length > 0) {
        await tx[modelName].createMany({
          data: records,
        });
      }
    }
  });

  return {
    version: BACKUP_VERSION,
    restoredAt: new Date().toISOString(),
    counts: Object.fromEntries(
      await Promise.all(
        TABLES.map(async ({ key, modelName }) => [
          key,
          await prisma[modelName].count(),
        ]),
      ),
    ),
  };
}
