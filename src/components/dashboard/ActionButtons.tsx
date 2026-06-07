"use client";

import { motion } from "framer-motion";
import {
  Copy,
  FileDown,
  ImageDown,
  Loader2,
} from "lucide-react";

interface ActionButtonsProps {
  onCopy: () => void;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  isExportingPDF: boolean;
  isExportingPNG: boolean;
}

interface ActionBtnProps {
  onClick: () => void;
  disabled?: boolean;
  variant: "outline" | "success" | "primary";
  icon: React.ReactNode;
  label: string;
  fullWidth?: boolean;
}

function ActionBtn({
  onClick,
  disabled,
  variant,
  icon,
  label,
  fullWidth,
}: ActionBtnProps) {
  const variants = {
    outline:
      "bg-white/[0.04] border border-white/[0.12] text-text-secondary hover:bg-white/[0.08] hover:text-white hover:border-white/20",
    success:
      "bg-success/[0.08] border border-success/25 text-success hover:bg-success/[0.15] hover:border-success/40",
    primary:
      "bg-gradient-primary text-white shadow-primary hover:shadow-primary-lg border border-primary/20",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`
        flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px]
        text-[13px] font-medium transition-all duration-200 cursor-pointer
        disabled:opacity-45 disabled:cursor-not-allowed
        ${fullWidth ? "col-span-2" : ""}
        ${variants[variant]}
      `}
    >
      {disabled ? <Loader2 size={14} className="animate-spin" /> : icon}
      {label}
    </motion.button>
  );
}

export function ActionButtons({
  onCopy,
  onDownloadPDF,
  onDownloadPNG,
  isExportingPDF,
  isExportingPNG,
}: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="grid grid-cols-2 gap-3"
    >
      <ActionBtn
        onClick={onCopy}
        variant="outline"
        icon={<Copy size={14} />}
        label="Copy Summary"
      />
      <ActionBtn
        onClick={onDownloadPDF}
        disabled={isExportingPDF}
        variant="success"
        icon={<FileDown size={14} />}
        label={isExportingPDF ? "Generating…" : "Download PDF"}
      />
      <ActionBtn
        onClick={onDownloadPNG}
        disabled={isExportingPNG}
        variant="primary"
        icon={<ImageDown size={14} />}
        label={isExportingPNG ? "Generating…" : "Download PNG"}
        fullWidth
      />
    </motion.div>
  );
}
