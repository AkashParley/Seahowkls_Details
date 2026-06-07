"use client";

import { toast } from "sonner";
import { useTopupCalculator } from "@/hooks/useTopupCalculator";
import { useExport } from "@/hooks/useExport";
import { Header } from "@/components/layout/Header";
import { TopupForm } from "@/components/dashboard/TopupForm";
import { PendingProfitHero } from "@/components/dashboard/PendingProfitHero";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ActionButtons } from "@/components/dashboard/ActionButtons";
import { useWatch } from "react-hook-form";
import type { TopupFormSchema } from "@/lib/validations";

function DashboardContent() {
  const { form, calculated, summary, getSummaryText, resetAll, filledFieldsCount, totalRequiredFields } = useTopupCalculator();
  const { copySummary, downloadPDF, downloadPNG, isExportingPDF, isExportingPNG } = useExport(summary, getSummaryText);
  const watched = useWatch({ control: form.control }) as Partial<TopupFormSchema>;

  const requireFilled = async (fn: () => Promise<void>) => {
    if (!watched.name || !watched.mt5Number || !watched.shId || !watched.deposit) {
      toast.error("Please fill in all required fields before exporting.");
      return;
    }
    await fn();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">

          <TopupForm
            form={form}
            onReset={() => { resetAll(); toast.success("Form reset successfully!"); }}
            filledFieldsCount={filledFieldsCount}
            totalRequiredFields={totalRequiredFields}
          />

          <div className="flex flex-col gap-4">
            <div className="text-[11px] font-semibold tracking-[1px] uppercase text-text-muted flex items-center gap-2">
              Live Summary
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <PendingProfitHero
              oldInvestment={calculated.oldInvestment}
              deposit={watched.deposit ?? 0}
              profitShare={watched.profitShare ?? 60}
              withdrawProfit={calculated.withdrawProfit}
              pendingProfit={calculated.pendingProfit}
              balance={calculated.balance}
            />

            <StatsBar
              deposit={watched.deposit ?? 0}
              totalProfit={watched.totalProfit ?? 0}
              profitShare={watched.profitShare ?? 60}
            />

            <SummaryCard summary={summary} />

            <ActionButtons
              onCopy={() => requireFilled(copySummary)}
              onDownloadPDF={() => requireFilled(downloadPDF)}
              onDownloadPNG={() => requireFilled(downloadPNG)}
              isExportingPDF={isExportingPDF}
              isExportingPNG={isExportingPNG}
            />
          </div>
        </div>
      </main>
      <footer className="border-t border-white/[0.05] py-4 px-6 text-center">
          <p className="text-[11px] text-text-muted">
            Seahowlks Topup Details · Professional Profit Settlement Dashboard
            <span className="mx-2 opacity-30">·</span>
            All figures in USD
            <span className="mx-2 opacity-30">·</span>
            Developed by <span className="text-primary font-medium">Parle</span>
          </p>
      </footer>
    </div>
  );
}

export default function Page() {
  return <DashboardContent />;
}
