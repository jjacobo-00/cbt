import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardLineChart from "@/app/dashboard/(charts)/LineChart";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <DashboardLineChart />
    </div>
  );
}
