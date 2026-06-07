import type { CalculatedSummary } from "@/types";
import { formatCurrency, getCurrentDate } from "@/lib/utils";

export async function exportToPDF(summary: CalculatedSummary): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = margin;

  doc.setFillColor(9, 9, 11);
  doc.rect(0, 0, pageW, pageH, "F");

  // Header
  doc.setFillColor(99, 102, 241);
  doc.roundedRect(margin, y, contentW, 18, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("SEAHOWLKS TOPUP DETAILS", margin + 8, y + 11);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(getCurrentDate(), pageW - margin - 2, y + 11, { align: "right" });
  y += 26;

  // Team badge
  if (summary.teamName) {
    doc.setFillColor(25, 25, 50);
    doc.roundedRect(margin, y, contentW, 12, 3, 3, "F");
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.25);
    doc.roundedRect(margin, y, contentW, 12, 3, 3, "D");
    doc.setTextColor(129, 140, 248);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${summary.teamName}`, pageW / 2, y + 8, { align: "center" });
    y += 18;
  }

  // Old Investment hero
  doc.setFillColor(17, 24, 39);
  doc.roundedRect(margin, y, contentW, 30, 4, 4, "F");
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 30, 4, 4, "D");
  doc.setTextColor(156, 163, 175);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("OLD INVESTMENT", pageW / 2, y + 9, { align: "center" });
  doc.setTextColor(129, 140, 248);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(summary.oldInvestment), pageW / 2, y + 22, { align: "center" });
  y += 38;

  // Account + Inputs
  const allRows: [string, string][] = [
    ["Full Name", summary.name],
    ["MT5 Number", summary.mt5Number],
    ["SH ID", summary.shId],
    ["Deposit", formatCurrency(summary.deposit)],
    ["Total Profit", formatCurrency(summary.totalProfit)],
    ["Withdraw Amount", formatCurrency(summary.userWithdraw)],
    ["Profit Share", `${summary.profitShare}%`],
  ];

  doc.setFillColor(15, 17, 23);
  doc.roundedRect(margin, y, contentW, allRows.length * 11 + 8, 4, 4, "F");
  doc.setDrawColor(30, 30, 40);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, y, contentW, allRows.length * 11 + 8, 4, 4, "D");
  y += 6;

  allRows.forEach(([key, value], i) => {
    const rowY = y + i * 11 + 4;
    if (i < allRows.length - 1) {
      doc.setDrawColor(30, 30, 45);
      doc.setLineWidth(0.1);
      doc.line(margin + 4, rowY + 5.5, margin + contentW - 4, rowY + 5.5);
    }
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(key, margin + 6, rowY + 1);
    doc.setTextColor(249, 250, 251);
    doc.setFont("helvetica", "bold");
    doc.text(value, margin + contentW - 6, rowY + 1, { align: "right" });
  });
  y += allRows.length * 11 + 14;

  // Calculation rows
  const calcItems: [string, string, [number, number, number]][] = [
    ["Full & Final (Deposit × 2)", formatCurrency(summary.fullAndFinal), [245, 158, 11]],
    ["Withdraw Profit", formatCurrency(summary.withdrawProfit), [239, 68, 68]],
    ["Pending Profit", formatCurrency(summary.pendingProfit), [139, 92, 246]],
  ];

  calcItems.forEach(([key, value, [r, g, b]]) => {
    doc.setFillColor(r * 0.04, g * 0.04, b * 0.04);
    doc.roundedRect(margin, y, contentW, 13, 3, 3, "F");
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, y, contentW, 13, 3, 3, "D");
    doc.setTextColor(r, g, b);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(key, margin + 6, y + 8);
    doc.setFont("helvetica", "bold");
    doc.text(value, margin + contentW - 6, y + 8, { align: "right" });
    y += 17;
  });

  // Balance
  doc.setFillColor(10, 40, 30);
  doc.roundedRect(margin, y, contentW, 13, 3, 3, "F");
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.25);
  doc.roundedRect(margin, y, contentW, 13, 3, 3, "D");
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Balance", margin + 6, y + 8);
  doc.text(formatCurrency(summary.balance), margin + contentW - 6, y + 8, { align: "right" });
  y += 17;

  // Old Investment
  doc.setFillColor(20, 20, 60);
  doc.roundedRect(margin, y, contentW, 15, 3, 3, "F");
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentW, 15, 3, 3, "D");
  doc.setTextColor(129, 140, 248);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("OLD INVESTMENT", margin + 6, y + 10);
  doc.setFontSize(13);
  doc.text(formatCurrency(summary.oldInvestment), margin + contentW - 6, y + 10, { align: "right" });
  y += 22;

  // Formula note
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Balance = ${formatCurrency(summary.fullAndFinal)} − ${formatCurrency(summary.withdrawProfit)} − ${formatCurrency(summary.pendingProfit)} = ${formatCurrency(summary.balance)}  |  Old Investment = Balance ÷ 2`,
    pageW / 2, y, { align: "center" }
  );

  // Footer
  const footerY = pageH - 14;
  doc.setDrawColor(30, 30, 45);
  doc.setLineWidth(0.2);
  doc.line(margin, footerY - 4, pageW - margin, footerY - 4);
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.text(
    summary.teamName ? `${summary.teamName} · Seahowlks Topup Details · All figures in USD` : "Seahowlks Topup Details · All figures in USD",
    pageW / 2, footerY, { align: "center" }
  );
  doc.text(`Generated: ${summary.generatedAt}`, pageW / 2, footerY + 5, { align: "center" });
  doc.save(`seahowlks-topup-${Date.now()}.pdf`);
}

export async function exportToPNG(elementId: string): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Element not found");
  const canvas = await html2canvas(element, { backgroundColor: "#111827", scale: 2, useCORS: true, logging: false });
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `seahowlks-summary-${Date.now()}.png`;
  link.click();
}