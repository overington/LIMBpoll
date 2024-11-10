"use client";
/**
 * Admin page
 *
 * This page allows the user to set the question ID and view the current voting
 * results. The user can also open and close voting.
 *
 */

import Link from "next/link";
import Card from "@/components/Card";
import Dashboard from "@/components/Dashboard";


export default function AdminPage() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Dashboard />
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/">Vote</Link>
        <Link href="/admin">admin</Link>
      </footer>
    </div>
  );
}
