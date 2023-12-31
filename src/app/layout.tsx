import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "./Components/Sidebar";
import ThemeWrapper from "./Components/ThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFitra | Image Processing",
  description: "Tugas UAS Pengolahan Citra Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeWrapper className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <div className="bg-base-100 flex-1 py-4">{children}</div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
