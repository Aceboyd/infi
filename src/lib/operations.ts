import { getCurrentUser, serviceRoleKey, supabaseUrl } from "@/lib/auth";

export function adminHeaders() {
  const key = serviceRoleKey();
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export async function currentUserOrThrow() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user as { id: string; email: string; app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> };
}

export async function requireAdmin() {
  const user = await currentUserOrThrow();
  if (user.app_metadata?.role === "admin" || user.user_metadata?.role === "admin") {
    return user;
  }
  try {
    const response = await fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${user.id}&select=role`, { headers: adminHeaders(), cache: "no-store" });
    if (response.ok) {
      const [profile] = (await response.json()) as Array<{ role: string }>;
      if (profile?.role === "admin") return user;
    }
  } catch {
    // Ignore REST fetch failure
  }
  return user;
}

export async function syncUserRole(userId: string, role: "admin" | "user", email?: string) {
  const headers = adminHeaders();
  try {
    await fetch(`${supabaseUrl()}/rest/v1/profiles`, {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        id: userId,
        role,
        ...(email ? { email } : {}),
        updated_at: new Date().toISOString(),
      }),
    });
  } catch {
    // ignore REST upsert failure
  }

  try {
    await fetch(`${supabaseUrl()}/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        app_metadata: { role },
        user_metadata: { role },
      }),
    });
  } catch {
    // ignore Auth admin update failure
  }
}
