export type ProfitShare = 60 | 70;

export interface TopupFormData {
  teamName: string;
  name: string;
  mt5Number: string;
  shId: string;
  depositDate: string;
  deposit: number;
  totalProfit: number;
  userWithdraw: number;
  profitShare: ProfitShare;
}

export interface CalculatedSummary extends TopupFormData {
  fullAndFinal: number;
  withdrawProfit: number;
  pendingProfit: number;
  balance: number;
  oldInvestment: number;
  generatedAt: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}