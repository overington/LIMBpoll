"use client";
/**
 * Admin page
 *
 * This page allows the user to set the question ID and view the current voting
 * results. The user can also open and close voting.
 *
 */

import { AdminDashboard } from "@/components/Dashboard";
import { ADMIN_TOKEN } from "@/data/config";
import PageLayout from "@/components/PageLayout";


export default function AdminPage() {
  return (
  <PageLayout token={ADMIN_TOKEN}>
    <AdminDashboard token={ADMIN_TOKEN} />
  </PageLayout>
  );
}
