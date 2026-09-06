import LiveUserDashboard from "@/components/LiveUserDashboard";
import { getCurrentUser } from "@/lib/auth";
import { getUserRole } from "@/lib/operations";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const role = await getUserRole(user);
  if (role === "admin") redirect("/admin");
  const name = user.user_metadata?.first_name || user.email?.split("@")[0] || "Member";
  return <LiveUserDashboard name={name} userEmail={user.email || ""} />;
}
