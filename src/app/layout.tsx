import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Seahowlks Topup Details | Professional Profit Settlement Dashboard",
  description:
    "Calculate and manage MT5 profit settlements with real-time pending profit computation, PDF export, and professional reporting.",
  keywords: ["seahowlks", "topup", "profit", "MT5", "settlement", "dashboard"],
  authors: [{ name: "Seahowlks" }],
  openGraph: {
    title: "Seahowlks Topup Details",
    description: "Professional Profit Settlement Dashboard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background min-h-screen`}
      >
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1F2937",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F9FAFB",
              fontFamily: "var(--font-dm-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
