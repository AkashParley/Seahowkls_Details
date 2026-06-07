"use client";

import { motion } from "framer-motion";
import { formatCurrencyCompact } from "@/lib/utils";

interface StatsBarProps {
  deposit: number;
  totalProfit: number;
  profitShare: number;
}

export function StatsBar({ deposit, totalProfit, profitShare }: StatsBarProps) {
  const stats = [
    { label: "Deposit", value: formatCurrencyCompact(deposit) },
    { label: "Total Profit", value: formatCurrencyCompact(totalProfit) },
    { label: "Share Rate", value: `${profitShare}%` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.05 }}
          className="bg-card-secondary border border-white/[0.07] rounded-[10px] px-3 py-3 text-center"
        >
          <div className="text-base font-semibold font-mono text-white leading-none">
            {stat.value || "$0"}
          </div>
          <div className="text-[10px] text-text-muted mt-1 tracking-wide">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
