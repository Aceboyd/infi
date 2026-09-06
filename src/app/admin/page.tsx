import { redirect } from "next/navigation";
import AdminOperations from "@/components/AdminOperations";
import { requireAdmin } from "@/lib/operations";

export default async function AdminPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect(error instanceof Error && error.message === "FORBIDDEN" ? "/dashboard" : "/sign-in");
  }
  return <AdminOperations />;
}
