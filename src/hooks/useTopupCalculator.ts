"use client";

import { useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { topupFormSchema, type TopupFormSchema } from "@/lib/validations";
import { calculateAll, buildSummaryText, getCurrentTimestamp } from "@/lib/utils";
import type { CalculatedSummary } from "@/types";

const DEFAULT_VALUES: TopupFormSchema = {
  teamName: "Sachin's Team",
  name: "",
  mt5Number: "",
  shId: "",
  depositDate: "",
  deposit: 0,
  totalProfit: 0,
  userWithdraw: 0,
  profitShare: 60,
};

export function useTopupCalculator() {
  const form = useForm<TopupFormSchema>({
    resolver: zodResolver(topupFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const watchedValues = useWatch({ control: form.control });

  const calculated = useMemo(() => {
    return calculateAll(
      watchedValues.deposit ?? 0,
      watchedValues.totalProfit ?? 0,
      watchedValues.userWithdraw ?? 0,
      watchedValues.profitShare ?? 60
    );
  }, [watchedValues.deposit, watchedValues.totalProfit, watchedValues.userWithdraw, watchedValues.profitShare]);

  const summary: CalculatedSummary = useMemo(() => ({
    teamName: watchedValues.teamName ?? "Sachin's Team",
    name: watchedValues.name ?? "",
    mt5Number: watchedValues.mt5Number ?? "",
    shId: watchedValues.shId ?? "",
    depositDate: watchedValues.depositDate ?? "",
    deposit: watchedValues.deposit ?? 0,
    totalProfit: watchedValues.totalProfit ?? 0,
    userWithdraw: watchedValues.userWithdraw ?? 0,
    profitShare: watchedValues.profitShare ?? 60,
    ...calculated,
    generatedAt: getCurrentTimestamp(),
  }), [watchedValues, calculated]);

  const getSummaryText = useCallback(() => buildSummaryText(summary), [summary]);
  const resetAll = useCallback(() => form.reset(DEFAULT_VALUES), [form]);

  const filledFieldsCount = useMemo(() => {
    let count = 0;
    if (watchedValues.name) count++;
    if (watchedValues.mt5Number) count++;
    if (watchedValues.shId) count++;
    if (watchedValues.deposit) count++;
    return count;
  }, [watchedValues.name, watchedValues.mt5Number, watchedValues.shId, watchedValues.deposit]);

  return { form, calculated, summary, getSummaryText, resetAll, filledFieldsCount, totalRequiredFields: 4 };
}