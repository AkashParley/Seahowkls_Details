"use client";

import { motion } from "framer-motion";
import { Controller, useWatch, type UseFormReturn } from "react-hook-form";
import { RotateCcw, AlertCircle, Layers, Calculator, Users } from "lucide-react";
import type { TopupFormSchema } from "@/lib/validations";
import { formatCurrency } from "@/lib/utils";

interface TopupFormProps {
  form: UseFormReturn<TopupFormSchema>;
  onReset: () => void;
  filledFieldsCount: number;
  totalRequiredFields: number;
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-text-secondary flex items-center">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-danger">
          <AlertCircle size={11} />{error}
        </div>
      )}
    </div>
  );
}

interface AutoFieldProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  valueColor: string;
  borderColor: string;
  hint: string;
}

function AutoField({ label, value, icon, iconBg, valueColor, borderColor, hint }: AutoFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium text-text-secondary flex items-center gap-1.5">
        <span className="w-[16px] h-[16px] rounded-[4px] flex items-center justify-center" style={{ background: iconBg }}>
          {icon}
        </span>
        {label}
        <span className="ml-auto text-[10px] text-text-muted font-normal tracking-wide">AUTO</span>
      </label>
      <div
        className="w-full rounded-[10px] px-3.5 py-2.5 flex items-center justify-between font-mono text-sm border"
        style={{ background: `${borderColor}10`, borderColor: `${borderColor}30` }}
      >
        <span style={{ color: valueColor }} className="font-semibold">
          {value > 0 ? formatCurrency(value) : <span className="text-text-muted">—</span>}
        </span>
        <span className="text-[10px] text-text-muted">{hint}</span>
      </div>
    </div>
  );
}

const inputBase =
  "w-full bg-white/[0.04] border border-white/[0.12] rounded-[10px] px-3.5 py-2.5 text-sm text-white placeholder-text-muted " +
  "outline-none transition-all duration-200 font-sans " +
  "focus:border-primary focus:bg-primary/[0.06] focus:ring-2 focus:ring-primary/25 hover:border-white/20";

const inputError = "border-danger/60 bg-danger/[0.04] focus:border-danger focus:ring-danger/20";

export function TopupForm({ form, onReset, filledFieldsCount, totalRequiredFields }: TopupFormProps) {
  const { register, control, formState: { errors } } = form;

  const deposit = useWatch({ control, name: "deposit" }) ?? 0;
  const totalProfit = useWatch({ control, name: "totalProfit" }) ?? 0;
  const userWithdraw = useWatch({ control, name: "userWithdraw" }) ?? 0;
  const profitShare = useWatch({ control, name: "profitShare" }) ?? 60;

  const fullAndFinal = deposit * 2;
  const withdrawProfit = userWithdraw * (profitShare / 100);
  const pendingProfit = Math.max(0, totalProfit - userWithdraw) * (profitShare / 100);
  const balance = fullAndFinal - withdrawProfit - pendingProfit;
  const oldInvestment = balance / 2;

  const progressPct = (filledFieldsCount / totalRequiredFields) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="text-[11px] font-semibold tracking-[1px] uppercase text-text-muted mb-4 flex items-center gap-2">
        Settlement Form
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-primary">{filledFieldsCount}/{totalRequiredFields}</span>
      </div>

      <div className="bg-card border border-white/[0.07] rounded-2xl p-5 space-y-4">

        {/* Team Name */}
        <FormField id="teamName" label="Team Name" required error={errors.teamName?.message}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/60">
              <Users size={13} />
            </span>
            <input
              id="teamName" type="text" placeholder="e.g. Sachin's Team" autoComplete="off"
              {...register("teamName")}
              className={`${inputBase} pl-9 ${errors.teamName ? inputError : "border-primary/30 bg-primary/[0.04]"}`}
            />
          </div>
        </FormField>

        <div className="h-px bg-white/[0.06]" />

        {/* Name + SH ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField id="name" label="Full Name" required error={errors.name?.message}>
            <input id="name" type="text" placeholder="e.g. John Doe" autoComplete="off"
              {...register("name")} className={`${inputBase} ${errors.name ? inputError : ""}`} />
          </FormField>
          <FormField id="shId" label="SH ID" required error={errors.shId?.message}>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-[10px] bg-white/[0.08] border border-r-0 border-white/[0.12] text-text-muted text-sm font-mono font-medium">
              SHS
            </span>
            <input id="shId" type="text" placeholder="00123" autoComplete="off"
              {...register("shId")}
              className={`${inputBase} rounded-l-none ${errors.shId ? inputError : ""}`} />
          </div>
          </FormField>
        </div>

        {/* MT5 + Deposit Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField id="mt5Number" label="MT5 Number" required error={errors.mt5Number?.message}>
            <input id="mt5Number" type="text" inputMode="numeric" placeholder="e.g. 12345678" autoComplete="off"
              {...register("mt5Number")} className={`${inputBase} font-mono ${errors.mt5Number ? inputError : ""}`} />
          </FormField>
          <FormField id="depositDate" label="Deposit Date" required error={errors.depositDate?.message}>
            <input
              id="depositDate" type="date" autoComplete="off"
              {...register("depositDate", {
                setValueAs: (val: string) => {
                  if (!val) return "";
                  const [yyyy, mm, dd] = val.split("-");
                  return `${dd}-${mm}-${yyyy?.slice(2)}`;
                },
              })}
              className={`${inputBase} font-mono ${errors.depositDate ? inputError : ""}`}
              style={{ colorScheme: "dark" }}
            />
          </FormField>
        </div>

        {/* Deposit + Total Profit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField id="deposit" label="Deposit (USD)" required error={errors.deposit?.message}>
            <input id="deposit" type="number" placeholder="0.00" min="0" step="0.01" autoComplete="off"
              {...register("deposit", { valueAsNumber: true })}
              className={`${inputBase} font-mono ${errors.deposit ? inputError : ""}`} />
          </FormField>
          <FormField id="totalProfit" label="Total Profit (USD)" error={errors.totalProfit?.message}>
            <input id="totalProfit" type="number" placeholder="0.00" min="0" step="0.01" autoComplete="off"
              {...register("totalProfit", { valueAsNumber: true })}
              className={`${inputBase} font-mono ${errors.totalProfit ? inputError : ""}`} />
          </FormField>
        </div>

        {/* Withdraw Amount + Profit Share */}
        <div className="grid grid-cols-2 gap-4 items-end">
          <FormField id="userWithdraw" label="Withdraw Amount (USD)" error={errors.userWithdraw?.message}>
            <input id="userWithdraw" type="number" placeholder="0.00" min="0" step="0.01" autoComplete="off"
              {...register("userWithdraw", { valueAsNumber: true })}
              className={`${inputBase} font-mono ${errors.userWithdraw ? inputError : ""}`} />
          </FormField>
          <FormField id="profitShare" label="Profit %" error={errors.profitShare?.message}>
            <Controller
              name="profitShare" control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  {[60, 70].map((val) => (
                    <button key={val} type="button" onClick={() => field.onChange(val)}
                      className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                        field.value === val
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-white/[0.03] border-white/[0.10] text-text-muted hover:border-white/20"
                      }`}>
                      {val}%
                    </button>
                  ))}
                </div>
              )}
            />
          </FormField>
        </div>

        {/* Auto fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <AutoField
            label="Full & Final" value={fullAndFinal}
            icon={<Layers size={10} className="text-amber-400" />}
            iconBg="rgba(245,158,11,0.2)" valueColor="#F59E0B" borderColor="#F59E0B" hint="× 2"
          />
          <AutoField
            label="Withdraw Profit" value={withdrawProfit}
            icon={<Calculator size={10} className="text-red-400" />}
            iconBg="rgba(239,68,68,0.2)" valueColor="#F87171" borderColor="#EF4444" hint={`× ${profitShare}%`}
          />
          <AutoField
            label="Pending Profit" value={pendingProfit}
            icon={<Calculator size={10} className="text-violet-400" />}
            iconBg="rgba(139,92,246,0.2)" valueColor="#A78BFA" borderColor="#8B5CF6" hint={`× ${profitShare}%`}
          />
        </div>

        {/* Balance + Old Investment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[10px] px-3.5 py-3 border flex flex-col gap-0.5"
            style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.25)" }}>
            <span className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">Balance</span>
            <span className="font-mono text-sm font-semibold text-emerald-400">
              {balance !== 0 ? formatCurrency(balance) : "—"}
            </span>
          </div>
          <div className="rounded-[10px] px-3.5 py-3 border flex flex-col gap-0.5"
            style={{ background: "rgba(99,102,241,0.10)", borderColor: "rgba(99,102,241,0.35)" }}>
            <span className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">Old Investment</span>
            <span className="font-mono text-sm font-bold text-primary">
              {oldInvestment !== 0 ? formatCurrency(oldInvestment) : "—"}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[10px] text-text-muted mb-1.5">
            <span>Form completion</span>
            <span className="font-medium text-primary">{Math.round(progressPct)}%</span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Reset */}
        <motion.button
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
          onClick={onReset} type="button"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px]
            bg-danger/[0.08] border border-danger/20 text-danger text-sm font-medium
            transition-all duration-200 hover:bg-danger/[0.15] hover:border-danger/35 cursor-pointer"
        >
          <RotateCcw size={14} />
          Reset All Fields
        </motion.button>
      </div>
    </motion.div>
  );
}