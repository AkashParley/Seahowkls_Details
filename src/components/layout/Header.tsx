"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.07] glass"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-primary flex items-center justify-center shadow-primary flex-shrink-0">
            <TrendingUp size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-tight text-white leading-none">
              Seahowlks
            </div>
            <div className="text-[10px] text-text-muted font-medium tracking-[0.6px] uppercase leading-none mt-[3px]">
              Topup Details
            </div>
          </div>
        </div>

        {/* Center badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-text-muted font-medium">
            Professional Profit Settlement Dashboard
          </span>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 bg-success/10 border border-success/25 rounded-full px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success live-dot" />
          <span className="text-[11px] font-medium text-success flex items-center gap-1">
            <Zap size={10} />
            Live
          </span>
        </div>
      </div>
    </motion.header>
  );
}
