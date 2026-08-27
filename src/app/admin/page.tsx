import { redirect } from "next/navigation";
import AdminOperations from "@/components/AdminOperations";
import { requireAdmin } from "@/lib/operations";

export default async function AdminPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/dashboard");
  }
  return <AdminOperations />;
}
