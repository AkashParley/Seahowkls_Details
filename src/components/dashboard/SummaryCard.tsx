"use client";

import { motion } from "framer-motion";
import {
  User, Hash, CreditCard, TrendingUp, Percent,
  Layers, ArrowDownCircle, Calculator, Scale, Users, IdCard, CalendarDays,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CalculatedSummary } from "@/types";

interface SummaryCardProps {
  summary: CalculatedSummary;
}

interface SummaryRowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  formula?: string;
  highlight?: "success" | "hero" | "balance";
  dimmed?: boolean;
}

function SummaryRow({ icon, iconBg, label, value, formula, highlight, dimmed }: SummaryRowProps) {
  return (
    <div className={`py-2.5 border-b border-white/[0.06] last:border-b-0 ${
      highlight === "hero" ? "border-t-2 border-primary/30 mt-2 pt-3.5 bg-primary/[0.04] -mx-1 px-1 rounded-lg"
      : highlight === "balance" ? "border-t border-white/[0.08] mt-1 pt-3.5"
      : highlight === "success" ? "border-t border-white/[0.08] mt-1 pt-3.5"
      : ""
    }`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2.5 text-sm ${dimmed ? "text-text-muted" : "text-text-secondary"}`}>
          <div className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
            {icon}
          </div>
          {label}
        </div>
        <div className={`font-mono text-[13px] font-medium ${
          highlight === "hero" ? "text-primary text-lg font-bold"
          : highlight === "balance" ? "text-emerald-400 text-base font-semibold"
          : highlight === "success" ? "text-success text-base font-semibold"
          : dimmed ? "text-text-muted" : "text-white"
        }`}>
          {value || "—"}
        </div>
      </div>
      {formula && (
        <div className="mt-1 ml-[34px] text-[10px] font-mono text-text-muted leading-relaxed"
          style={{ color: "rgba(156,163,175,0.6)" }}>
          {formula}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold tracking-[1px] uppercase text-text-muted pt-2 pb-1 flex items-center gap-2">
      {children}
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  );
}

function fmt(v: number) { return formatCurrency(v); }

export function SummaryCard({ summary }: SummaryCardProps) {
  const share = summary.profitShare;

  return (
    <motion.div
      id="summary-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-card border border-white/[0.07] rounded-2xl p-5"
    >
      {/* Team Badge */}
      {summary.teamName && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center bg-primary/20">
              <Users size={13} className="text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-[1px] font-semibold">Team</div>
              <div className="text-sm font-semibold text-white leading-tight">{summary.teamName}</div>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border"
            style={{ background: "rgba(99,102,241,0.12)", borderColor: "rgba(99,102,241,0.3)", color: "#818CF8" }}>
            SETTLEMENT
          </div>
        </div>
      )}

      <div className="text-[11px] font-semibold tracking-[1px] uppercase text-text-muted mb-3 flex items-center gap-2">
        Account Details
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      <div className="space-y-0">
        {/* Account Info */}
        <SummaryRow icon={<User size={11} className="text-primary" />} iconBg="rgba(99,102,241,0.18)" label="Name" value={summary.name} />
        <SummaryRow icon={<Hash size={11} className="text-secondary" />} iconBg="rgba(139,92,246,0.18)" label="MT5 Number" value={summary.mt5Number} />
        <SummaryRow icon={<CalendarDays size={11} className="text-sky-400" />} iconBg="rgba(56,189,248,0.18)" label="Deposit Date" value={summary.depositDate || "—"} />
        <SummaryRow icon={<IdCard size={11} className="text-amber-400" />} iconBg="rgba(245,158,11,0.18)" label="SH ID" value={summary.shId} />

        {/* Inputs */}
        <SectionLabel>Inputs</SectionLabel>
        <SummaryRow icon={<CreditCard size={11} className="text-success" />} iconBg="rgba(16,185,129,0.18)" label="Deposit" value={fmt(summary.deposit)} />
        <SummaryRow icon={<TrendingUp size={11} className="text-primary" />} iconBg="rgba(99,102,241,0.18)" label="Total Profit" value={fmt(summary.totalProfit)} />
        <SummaryRow icon={<ArrowDownCircle size={11} className="text-red-400" />} iconBg="rgba(239,68,68,0.18)" label="Withdraw Amount" value={fmt(summary.userWithdraw)} />
        <SummaryRow icon={<Percent size={11} className="text-secondary" />} iconBg="rgba(139,92,246,0.18)" label="Profit Share" value={`${share}%`} />

        {/* Calculation */}
        <SectionLabel>Calculation</SectionLabel>

        <SummaryRow
          icon={<Layers size={11} className="text-amber-400" />}
          iconBg="rgba(245,158,11,0.18)"
          label="Full & Final"
          value={fmt(summary.fullAndFinal)}
          formula={`${fmt(summary.deposit)} × 2 = ${fmt(summary.fullAndFinal)}`}
          dimmed
        />
        <SummaryRow
          icon={<ArrowDownCircle size={11} className="text-red-400" />}
          iconBg="rgba(239,68,68,0.18)"
          label="Withdraw Profit"
          value={fmt(summary.withdrawProfit)}
          formula={`${fmt(summary.userWithdraw)} × ${share}% = ${fmt(summary.withdrawProfit)}`}
          dimmed
        />
        <SummaryRow
          icon={<Calculator size={11} className="text-violet-400" />}
          iconBg="rgba(139,92,246,0.18)"
          label="Pending Profit"
          value={fmt(summary.pendingProfit)}
          formula={`(${fmt(summary.totalProfit)} − ${fmt(summary.userWithdraw)}) × ${share}% = ${fmt(summary.pendingProfit)}`}
        />
        <SummaryRow
          icon={<Scale size={11} className="text-emerald-400" />}
          iconBg="rgba(16,185,129,0.18)"
          label="Balance"
          value={fmt(summary.balance)}
          formula={`${fmt(summary.fullAndFinal)} − ${fmt(summary.withdrawProfit)} − ${fmt(summary.pendingProfit)} = ${fmt(summary.balance)}`}
          highlight="balance"
        />
        <SummaryRow
          icon={<CreditCard size={11} className="text-primary" />}
          iconBg="rgba(99,102,241,0.28)"
          label="Old Investment"
          value={fmt(summary.oldInvestment)}
          formula={`${fmt(summary.balance)} ÷ 2 = ${fmt(summary.oldInvestment)}`}
          highlight="hero"
        />
      </div>

      {/* Team footer */}
      {summary.teamName && (
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-center gap-1.5">
          <Users size={10} className="text-text-muted" />
          <span className="text-[10px] text-text-muted tracking-wide">{summary.teamName}</span>
        </div>
      )}
    </motion.div>
  );
}