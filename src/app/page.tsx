import PageLayout from "@/components/PageLayout";
import { UserDashboard } from "@/components/Dashboard";
import { USER_TOKEN } from "@/data/config";

export default function HomePage() {
  return (
    <PageLayout token={USER_TOKEN}>
      <UserDashboard token={USER_TOKEN} />
    </PageLayout>
  );
}
