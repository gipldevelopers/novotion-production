"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Database,
  Download,
  FileJson,
  Loader2,
  ShieldAlert,
  Upload,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ADMIN_MODE_TOKEN = "super-acceess-token-gipl9011";

const AdminDatabasePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const canAccessDatabase = searchParams.get("mode") === ADMIN_MODE_TOKEN;

  useEffect(() => {
    if (!canAccessDatabase) {
      router.replace("/admin");
    }
  }, [canAccessDatabase, router]);

  if (!canAccessDatabase) {
    return null;
  }

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await fetch("/api/admin/database/export");

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.error || "Failed to export database");
      }

      const fileBlob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(fileBlob);
      const contentDisposition = response.headers.get("content-disposition") || "";
      const match = contentDisposition.match(/filename="([^"]+)"/);
      const fileName = match?.[1] || `novotion-database-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Database backup downloaded");
    } catch (error) {
      toast.error(error.message || "Failed to export database");
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFileName(file ? file.name : "");
  };

  const handleImport = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please select a backup file first");
      return;
    }

    if (!acknowledged) {
      toast.error("Please confirm that you want to replace the current database");
      return;
    }

    const confirmed = window.confirm(
      "This will replace the current database with the uploaded backup. Continue?",
    );

    if (!confirmed) {
      return;
    }

    setIsImporting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/database/import", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to import database");
      }

      toast.success("Database restored successfully");
      setAcknowledged(false);
      setSelectedFileName("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.message || "Failed to import database");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-red-50 text-red-600">
          <Database className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Backup</h1>
          <p className="text-gray-500 mt-1">
            Export the full application database to one JSON file, then restore it
            on another server when needed.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Download className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Export database</h2>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Downloads a single JSON backup containing users, payments, orders,
            blogs, messages, packages, and other admin-managed records.
          </p>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-60"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting ? "Exporting..." : "Download backup"}
          </button>

          <div className="mt-4 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <ShieldAlert className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              Keep this file secure. It contains your production data and should
              be treated like a sensitive database dump.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Upload className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Import database</h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Upload a backup file to replace the current data on this server.
            Make sure the target server already has the same Prisma schema.
          </p>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Backup file</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
              />
            </label>

            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-semibold">Destructive action</p>
                <p>
                  Importing will wipe the current database tables before restoring
                  the uploaded backup.
                </p>
              </div>
            </div>

            {selectedFileName ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileJson className="h-4 w-4" />
                <span>{selectedFileName}</span>
              </div>
            ) : null}

            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(event) => setAcknowledged(event.target.checked)}
                className="mt-1"
              />
              <span>
                I understand this will replace the current database on this server.
              </span>
            </label>

            <button
              onClick={handleImport}
              disabled={isImporting}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-600 text-white font-medium disabled:opacity-60"
            >
              {isImporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isImporting ? "Importing..." : "Restore backup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDatabasePage() {
  return (
    <Suspense fallback={null}>
      <AdminDatabasePageContent />
    </Suspense>
  );
}
