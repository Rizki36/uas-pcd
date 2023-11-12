import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "./Components/Sidebar";
import Head from "next/head";

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
  if (typeof window !== "undefined") return;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <div className="bg-base-100 flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
