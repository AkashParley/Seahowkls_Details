"use client";

import { useState, useCallback } from "react";
import type { CalculatedSummary } from "@/types";
import { toast } from "sonner";

export function useExport(summary: CalculatedSummary, getSummaryText: () => string) {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPNG, setIsExportingPNG] = useState(false);

  const copySummary = useCallback(async () => {
    const text = getSummaryText();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success("Summary copied to clipboard!");
    } catch {
      toast.error("Failed to copy. Please try again.");
    }
  }, [getSummaryText]);

  const downloadPDF = useCallback(async () => {
    setIsExportingPDF(true);
    try {
      const { exportToPDF } = await import("@/lib/export");
      await exportToPDF(summary);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsExportingPDF(false);
    }
  }, [summary]);

  const downloadPNG = useCallback(async () => {
    setIsExportingPNG(true);
    try {
      const { exportToPNG } = await import("@/lib/export");
      await exportToPNG("summary-card");
      toast.success("PNG downloaded successfully!");
    } catch (error) {
      console.error("PNG export error:", error);
      toast.error("Failed to generate PNG. Please try again.");
    } finally {
      setIsExportingPNG(false);
    }
  }, []);

  return {
    copySummary,
    downloadPDF,
    downloadPNG,
    isExportingPDF,
    isExportingPNG,
  };
}
