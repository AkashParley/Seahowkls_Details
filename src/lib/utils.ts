import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CalculatedSummary } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrencyCompact(value: number): string {
  if (value === 0) return "$0";
  if (Math.abs(value) >= 1_000_000) return "$" + (value / 1_000_000).toFixed(2) + "M";
  if (Math.abs(value) >= 1_000) return "$" + (value / 1_000).toFixed(1) + "K";
  return formatCurrency(value);
}

export interface CalculationResult {
  fullAndFinal: number;
  withdrawProfit: number;
  pendingProfit: number;
  balance: number;
  oldInvestment: number;
}

export function calculateAll(
  deposit: number,
  totalProfit: number,
  userWithdraw: number,
  sharePercentage: number
): CalculationResult {
  const fullAndFinal = deposit * 2;
  const withdrawProfit = userWithdraw * (sharePercentage / 100);
  const pendingProfit = Math.max(0, totalProfit - userWithdraw) * (sharePercentage / 100);
  const balance = fullAndFinal - withdrawProfit - pendingProfit;
  const oldInvestment = balance / 2;
  return { fullAndFinal, withdrawProfit, pendingProfit, balance, oldInvestment };
}

export function buildSummaryText(summary: CalculatedSummary): string {
  const s = summary;
  const share = s.profitShare;
  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
  const remaining = Math.max(0, s.totalProfit - s.userWithdraw);

  return [
    `*TOPUP DETAILS*`,
    `*Name:* ${s.name}`,
    `*MT5:* ${s.mt5Number}`,
    `*SH ID:* SHS${s.shId}`,
    `*Date:* ${s.depositDate || "—"}`,
    `*Deposit:* ${fmt(s.deposit)}`,
    `*Profit Share:* ${share}%`,
    `*Full & Final*`,
    `${fmt(s.deposit)} × 2 = *${fmt(s.fullAndFinal)}*`,
    `*Total Profit:* ${fmt(s.totalProfit)}`,
    `*Withdraw Profit*`,
    `${fmt(s.userWithdraw)} × ${share}% = *${fmt(s.withdrawProfit)}*`,
    `*Pending Profit*`,
    `${fmt(s.totalProfit)} − ${fmt(s.userWithdraw)} = ${fmt(remaining)}`,
    `${fmt(remaining)} x ${share}% = *${fmt(s.pendingProfit)}*`,
    `*Balance*`,
    `${fmt(s.fullAndFinal)} − ${fmt(s.withdrawProfit)} − ${fmt(s.pendingProfit)} = *${fmt(s.balance)}*`,
    `*OLD INVESTMENT*`,
    `${fmt(s.balance)} ÷ 2 = *${fmt(s.oldInvestment)}*`,
    `*Team:* ${s.teamName}`,
  ].join("\n");
}

export function getCurrentTimestamp(): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date());
}

export function getCurrentDate(): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "long", day: "numeric",
  }).format(new Date());
}