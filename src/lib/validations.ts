import { z } from "zod";

export const topupFormSchema = z.object({
  teamName: z.string().min(1, "Team name is required").max(60, "Max 60 characters"),
  name: z.string().min(1, "Full name is required").min(2, "Min 2 characters").max(100),
  mt5Number: z.string().min(1, "MT5 Number is required").regex(/^\d+$/, "Digits only").min(5).max(20),
  shId: z.string().min(1, "SH ID is required").max(50),
  depositDate: z.string().min(1, "Deposit date is required"),
  deposit: z.number({ invalid_type_error: "Must be a number" }).min(1, "Must be > 0").max(10_000_000),
  totalProfit: z.number({ invalid_type_error: "Must be a number" }).min(0).max(10_000_000).optional().default(0),
  userWithdraw: z.number({ invalid_type_error: "Must be a number" }).min(0, "Cannot be negative").max(10_000_000).optional().default(0),
  profitShare: z.union([z.literal(60), z.literal(70)], {
    errorMap: () => ({ message: "Must be 60% or 70%" }),
  }),
});

export type TopupFormSchema = z.infer<typeof topupFormSchema>;