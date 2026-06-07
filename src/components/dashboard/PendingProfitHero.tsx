"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface PendingProfitHeroProps {
  oldInvestment: number;
  deposit: number;
  profitShare: number;
  withdrawProfit: number;
  pendingProfit: number;
  balance: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 200, damping: 25 });
  const display = useTransform(spring, (v) => formatCurrency(v));
  useEffect(() => { spring.set(value); }, [spring, value]);
  return <motion.span>{display}</motion.span>;
}

export function PendingProfitHero({ oldInvestment, deposit, profitShare, withdrawProfit, pendingProfit, balance }: PendingProfitHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl p-6 text-center"
      style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))", border: "1px solid rgba(99,102,241,0.25)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.18), transparent 60%)" }} />
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-xl" style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />

      <div className="relative z-10">
        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-text-muted mb-2">Old Investment</div>

        <motion.div
          key={Math.round(oldInvestment)}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-5xl sm:text-6xl font-bold tracking-[-2px] gradient-text font-mono leading-none mb-3"
        >
          <AnimatedNumber value={oldInvestment} />
        </motion.div>

        {/* Breakdown row */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-mono">
          <span><span className="text-text-muted">Withdraw: </span><span className="text-red-400 font-medium">{formatCurrency(withdrawProfit)}</span></span>
          <span className="text-white/20">|</span>
          <span><span className="text-text-muted">Pending: </span><span className="text-violet-400 font-medium">{formatCurrency(pendingProfit)}</span></span>
          <span className="text-white/20">|</span>
          <span><span className="text-text-muted">Balance: </span><span className="text-emerald-400 font-medium">{formatCurrency(balance)}</span></span>
        </div>

        <div className="mt-2 text-[10px] text-text-muted font-mono">
          <span className="text-primary font-medium">{formatCurrency(deposit)}</span>
          <span className="mx-1 opacity-50">·</span>
          <span className="text-secondary font-medium">{profitShare}% share</span>
          <span className="mx-1 opacity-50">·</span>
          <span className="opacity-60">Full & Final {formatCurrency(deposit * 2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
