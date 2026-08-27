"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Coins,
  DollarSign,
  Edit3,
  ExternalLink,
  LoaderCircle,
  LogOut,
  Menu,
  PlusCircle,
  Save,
  Search,
  Shield,
  ShieldCheck,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";

type ServiceRequest = {
  id: string;
  user_id: string;
  kind: string;
  amount: number | null;
  currency: string;
  details: Record<string, unknown>;
  created_at: string;
};

type UserAccount = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  role: string;
  created_at: string;
  account_id: string | null;
  available_balance: number;
  credit_limit: number;
  kyc_status: string;
  account_tier: string;
  invested_balance: number;
  total_profit: number;
  bonus_balance: number;
  currency: string;
  admin_message: string;
};

export default function AdminOperations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "queue" | "wallets">("users");

  async function handleSignOut() {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.href = "/sign-in";
  }
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingUser, setSavingUser] = useState(false);
  const [savingWallets, setSavingWallets] = useState(false);
  const [message, setMessage] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  // Deposit Wallets state
  const [depositWallets, setDepositWallets] = useState({
    btc_address: "",
    eth_address: "",
    usdt_trc20_address: "",
    sol_address: "",
    bank_wire_info: "",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    available_balance: "",
    invested_balance: "",
    total_profit: "",
    credit_limit: "",
    bonus_balance: "",
    kyc_status: "not_started",
    account_tier: "Standard",
    currency: "USD",
    role: "user",
    admin_message: "",
    tx_direction: "credit",
    tx_amount: "",
    tx_description: "",
  });

  function selectUserForEdit(user: UserAccount) {
    setSelectedUser(user);
    setSaveSuccess("");
    setEditForm({
      available_balance: String(user.available_balance ?? 0),
      invested_balance: String(user.invested_balance ?? 0),
      total_profit: String(user.total_profit ?? 0),
      credit_limit: String(user.credit_limit ?? 0),
      bonus_balance: String(user.bonus_balance ?? 0),
      kyc_status: user.kyc_status || "not_started",
      account_tier: user.account_tier || "Standard",
      currency: user.currency || "USD",
      role: user.role || "user",
      admin_message: user.admin_message || "",
      tx_direction: "credit",
      tx_amount: "",
      tx_description: "",
    });
  }

  async function loadData() {
    setLoading(true);
    setMessage("");
    try {
      const [requestsRes, usersRes, settingsRes] = await Promise.all([
        fetch("/api/admin/operations"),
        fetch("/api/admin/users"),
        fetch("/api/settings"),
      ]);

      const requestsData = requestsRes.ok ? await requestsRes.json() : {};
      const usersData = usersRes.ok ? await usersRes.json() : {};
      const settingsData = settingsRes.ok ? await settingsRes.json() : {};

      if (!usersRes.ok && usersData.error) {
        setMessage(`User Directory Notice: ${usersData.error}`);
      }

      if (Array.isArray(requestsData.requests)) {
        setRequests(requestsData.requests);
      }
      if (Array.isArray(usersData.users)) {
        setUsers(usersData.users);
        if (usersData.users.length > 0) {
          selectUserForEdit(usersData.users[0]);
        }
      }
      if (settingsData.settings) {
        setDepositWallets(settingsData.settings);
      }
    } catch {
      setMessage("Failed to load administrator data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveWallets(e: React.FormEvent) {
    e.preventDefault();
    setSavingWallets(true);
    setSaveSuccess("");
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(depositWallets),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveSuccess("Crypto deposit addresses updated live for all users!");
        if (data.settings) setDepositWallets(data.settings);
        setTimeout(() => setSaveSuccess(""), 4000);
      } else {
        setMessage(data.error || "Failed to update deposit addresses.");
      }
    } catch {
      setMessage("Network error saving deposit addresses.");
    } finally {
      setSavingWallets(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function handleSaveUserAccount(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser) return;

    setSavingUser(true);
    setSaveSuccess("");
    setMessage("");

    try {
      const payload: Record<string, unknown> = {
        available_balance: Number(editForm.available_balance),
        invested_balance: Number(editForm.invested_balance),
        total_profit: Number(editForm.total_profit),
        credit_limit: Number(editForm.credit_limit),
        bonus_balance: Number(editForm.bonus_balance),
        kyc_status: editForm.kyc_status,
        account_tier: editForm.account_tier,
        currency: editForm.currency,
        role: editForm.role,
        admin_message: editForm.admin_message,
      };

      if (editForm.tx_amount && Number(editForm.tx_amount) > 0) {
        payload.transaction = {
          direction: editForm.tx_direction,
          amount: Number(editForm.tx_amount),
          description: editForm.tx_description || "Admin Account Adjustment",
        };
      }

      const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();
      if (!res.ok) {
        setMessage(body.error ?? "Failed to save user account modifications.");
      } else {
        setSaveSuccess(`Account updated successfully for ${selectedUser.email}`);
        // Refresh local data
        await loadData();
      }
    } catch {
      setMessage("Error updating user account.");
    } finally {
      setSavingUser(false);
    }
  }

  async function review(id: string, decision: "approved" | "rejected") {
    const note = window.prompt("Optional note for the client:") ?? "";
    const response = await fetch(`/api/admin/operations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, note }),
    });
    const body = await response.json();
    if (!response.ok) return setMessage(body.error ?? "Unable to review request.");
    setRequests((items) => items.filter((item) => item.id !== id));
    await loadData();
  }

  async function reviewKyc(req: ServiceRequest, decision: "approved" | "rejected") {
    const note = decision === "approved" ? "KYC Document Approved & Verified by Compliance" : "KYC Document Rejected";
    try {
      await fetch(`/api/admin/operations/${req.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, note }),
      });
      await fetch(`/api/admin/users/${req.user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kyc_status: decision === "approved" ? "verified" : "rejected" }),
      });
      setSaveSuccess(`KYC request ${decision} for user ${req.user_id}`);
      setRequests((items) => items.filter((item) => item.id !== req.id));
      await loadData();
    } catch {
      setMessage("Error processing KYC review.");
    }
  }

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) ||
      u.first_name.toLowerCase().includes(q) ||
      u.last_name.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#f5f0e8] flex flex-col font-sans">
      {/* Mobile Top Navigation */}
      <header className="lg:hidden border-b border-white/10 bg-[#141b18] px-5 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[#c9754d]">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo light />
        </div>
        <span className="rounded bg-[#c9754d]/20 px-2.5 py-1 text-[10px] uppercase font-mono text-[#d88761]">
          Admin Portal
        </span>
      </header>

      <div className="flex-1 flex relative">
        {/* ADMIN SIDEBAR NAVIGATION */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#121916] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 overflow-y-auto">
            {/* Logo & Admin Brand Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <Logo light />
                <p className="mt-1.5 text-[9px] uppercase tracking-[.25em] text-[#c9754d] font-bold">Admin Controller</p>
              </div>
            </div>

            {/* Admin Profile Info Card */}
            <div className="mt-5 rounded-lg bg-[#18211d] p-3.5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#c9754d]/20 text-[#c9754d]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">System Master Administrator</p>
                  <p className="text-[10px] text-[#adc9a1] font-mono">Full Access Granted</p>
                </div>
              </div>
            </div>

            {/* ADMIN NAVIGATION LINKS */}
            <nav className="mt-6 space-y-2">
              <p className="px-2 text-[10px] uppercase tracking-[.22em] text-[#77837b] font-semibold mb-2">
                Administration
              </p>

              <button
                onClick={() => { setActiveTab("users"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-medium transition ${
                  activeTab === "users"
                    ? "bg-[#c9754d] text-white font-semibold shadow-md"
                    : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users size={16} />
                  <span>User Accounts Directory</span>
                </div>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono font-bold">
                  {users.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("queue"); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-medium transition ${
                  activeTab === "queue"
                    ? "bg-[#c9754d] text-white font-semibold shadow-md"
                    : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} />
                  <span>Review & KYC Queue</span>
                </div>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono font-bold">
                  {requests.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("wallets"); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-medium transition ${
                  activeTab === "wallets"
                    ? "bg-[#c9754d] text-white font-semibold shadow-md"
                    : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Wallet size={16} />
                <span>Deposit Wallets & Bank</span>
              </button>
            </nav>
          </div>

          {/* SIGN OUT BUTTON */}
          <div className="p-6 border-t border-white/10">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-[#d88761] hover:bg-[#d88761] hover:text-white transition"
            >
              <LogOut size={16} />
              <span>Sign Out Administrator</span>
            </button>
          </div>
        </aside>

        {/* MAIN ADMIN CONTENT AREA */}
        <main className="lg:pl-[20.5rem] flex-1 p-8 sm:p-12 max-w-[90rem] w-full transition-all">
          {/* Main Top Header */}
          <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">System Administration</p>
              <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-white">
                {activeTab === "users" && `Registered User Accounts (${users.length})`}
                {activeTab === "queue" && `Pending Review & KYC Queue (${requests.length})`}
                {activeTab === "wallets" && "Deposit Wallets & Bank Instructions"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#151c19] px-4 py-2 text-xs font-mono text-[#adc9a1] border border-white/10">
                Total Registered Users: <strong className="text-white">{users.length}</strong>
              </span>
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-lg border border-[#d88761]/30 bg-[#d88761]/10 p-4 text-xs text-[#d88761]">
              {message}
            </div>
          )}

        {/* TAB 1: USER ACCOUNT CONTROL PANEL */}
        {activeTab === "users" && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* User Search & Selection List */}
            <div className="rounded-xl border border-white/10 bg-[#151c19] p-5">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-[#77837b]" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0e1311] py-2.5 pl-9 pr-3 text-xs text-white placeholder-[#77837b] outline-none focus:border-[#c9754d]"
                />
              </div>

              <p className="mt-4 text-[11px] uppercase tracking-wider text-[#77837b]">Registered Clients</p>

              <div className="mt-3 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="py-8 text-center text-xs text-[#8e9b91]">
                    <LoaderCircle className="animate-spin mx-auto mb-2" size={18} />
                    Loading clients...
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <p className="py-6 text-center text-xs text-[#77837b]">No users found.</p>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelected = selectedUser?.id === u.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => selectUserForEdit(u)}
                        className={`w-full rounded-lg p-3 text-left transition border ${
                          isSelected
                            ? "border-[#c9754d] bg-[#c9754d]/15"
                            : "border-white/5 bg-[#1b2320] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="truncate font-medium text-xs text-white">
                            {u.first_name || u.last_name ? `${u.first_name} ${u.last_name}` : u.email.split("@")[0]}
                          </p>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-[#adc9a1]">
                            {u.account_tier}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-[11px] text-[#77837b]">{u.email}</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-[#8e9b91]">
                          <span>Bal: ${u.available_balance.toLocaleString()}</span>
                          <span className="text-[#adc9a1]">Prof: +${u.total_profit.toLocaleString()}</span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Selected User Account Edit Form */}
            <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
              {selectedUser ? (
                <form onSubmit={handleSaveUserAccount}>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-[#c9754d]" />
                        <h2 className="font-serif text-2xl font-medium text-white">
                          {selectedUser.first_name || selectedUser.last_name
                            ? `${selectedUser.first_name} ${selectedUser.last_name}`
                            : selectedUser.email.split("@")[0]}
                        </h2>
                      </div>
                      <p className="mt-1 text-xs text-[#77837b]">
                        Email: <strong className="text-white font-mono">{selectedUser.email}</strong> · User ID: <span className="font-mono text-[#adc9a1]">{selectedUser.id}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[#c9754d]/20 px-3 py-1 text-xs font-semibold text-[#d88761] border border-[#c9754d]/30">
                        Tier: {selectedUser.account_tier || "Standard"}
                      </span>
                    </div>
                  </div>

                  {saveSuccess && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#adc9a1]/30 bg-[#adc9a1]/10 p-3 text-xs text-[#adc9a1]">
                      <CheckCircle size={16} />
                      <span>{saveSuccess}</span>
                    </div>
                  )}

                  {/* Numbers Control Section */}
                  <div className="mt-6">
                    <p className="text-[11px] uppercase tracking-wider text-[#c9754d] font-semibold">
                      1. Financial Balances & Portfolio Metrics (Numbers Input)
                    </p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label className="block text-xs text-[#8e9b91]">Available Cash ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.available_balance}
                          onChange={(e) => setEditForm({ ...editForm, available_balance: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#c9754d]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Invested Portfolio ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.invested_balance}
                          onChange={(e) => setEditForm({ ...editForm, invested_balance: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#c9754d]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Total Profit / Yield ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.total_profit}
                          onChange={(e) => setEditForm({ ...editForm, total_profit: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-sm font-mono text-[#adc9a1] outline-none focus:border-[#c9754d]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Credit Line ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.credit_limit}
                          onChange={(e) => setEditForm({ ...editForm, credit_limit: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#c9754d]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Bonus Balance ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.bonus_balance}
                          onChange={(e) => setEditForm({ ...editForm, bonus_balance: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-sm font-mono text-[#d9b66f] outline-none focus:border-[#c9754d]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Base Currency</label>
                        <input
                          type="text"
                          value={editForm.currency}
                          onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-sm font-mono text-white uppercase outline-none focus:border-[#c9754d]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text & Settings Control Section */}
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-[11px] uppercase tracking-wider text-[#c9754d] font-semibold">
                      2. Account Status, Tier & Custom Announcement (Letters Input)
                    </p>

                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs text-[#8e9b91]">KYC Verification Status</label>
                        <div className="mt-1 flex items-center gap-2">
                          <select
                            value={editForm.kyc_status}
                            onChange={(e) => setEditForm({ ...editForm, kyc_status: e.target.value })}
                            className="flex-1 rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-xs text-white outline-none focus:border-[#c9754d]"
                          >
                            <option value="not_started">Not Started</option>
                            <option value="pending">Pending Review</option>
                            <option value="verified">Verified (Approved)</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, kyc_status: "verified" })}
                            className="rounded bg-[#adc9a1]/20 px-3 py-2 text-[11px] font-semibold text-[#adc9a1] border border-[#adc9a1]/30 hover:bg-[#adc9a1] hover:text-black transition shrink-0"
                          >
                            Accept KYC
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, kyc_status: "rejected" })}
                            className="rounded bg-[#d88761]/20 px-3 py-2 text-[11px] font-semibold text-[#d88761] border border-[#d88761]/30 hover:bg-[#d88761] hover:text-white transition shrink-0"
                          >
                            Reject
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Account Level / Tier</label>
                        <input
                          type="text"
                          value={editForm.account_tier}
                          onChange={(e) => setEditForm({ ...editForm, account_tier: e.target.value })}
                          placeholder="e.g. Standard, Silver VIP, Gold Pro, Institutional"
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-xs text-white outline-none focus:border-[#c9754d]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">System Role / Access Privilege</label>
                        <select
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#c9754d]"
                        >
                          <option value="user">Standard Client (User)</option>
                          <option value="admin">System Administrator (Admin)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs text-[#8e9b91]">
                        Admin Alert / Announcement Note to Client (Displays on User Dashboard)
                      </label>
                      <textarea
                        rows={2}
                        value={editForm.admin_message}
                        onChange={(e) => setEditForm({ ...editForm, admin_message: e.target.value })}
                        placeholder="e.g., Your account has been upgraded to VIP level. Withdrawal limits increased."
                        className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] p-3 text-xs text-white placeholder-[#77837b] outline-none focus:border-[#c9754d]"
                      />
                    </div>
                  </div>

                  {/* Manual Transaction Injection */}
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-[11px] uppercase tracking-wider text-[#c9754d] font-semibold">
                      3. Inject Custom Transaction (Optional)
                    </p>

                    <div className="mt-3 grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs text-[#8e9b91]">Transaction Direction</label>
                        <select
                          value={editForm.tx_direction}
                          onChange={(e) => setEditForm({ ...editForm, tx_direction: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-xs text-white outline-none focus:border-[#c9754d]"
                        >
                          <option value="credit">Credit (+ Add Funds)</option>
                          <option value="debit">Debit (- Subtract Funds)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.tx_amount}
                          onChange={(e) => setEditForm({ ...editForm, tx_amount: e.target.value })}
                          placeholder="0.00"
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#c9754d]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#8e9b91]">Description / Note</label>
                        <input
                          type="text"
                          value={editForm.tx_description}
                          onChange={(e) => setEditForm({ ...editForm, tx_description: e.target.value })}
                          placeholder="e.g., Staking Yield / Profit Payout"
                          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0e1311] px-3 py-2 text-xs text-white outline-none focus:border-[#c9754d]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                    <button
                      type="submit"
                      disabled={savingUser}
                      className="flex items-center gap-2 rounded-lg bg-[#c9754d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#b66543] disabled:opacity-50"
                    >
                      {savingUser ? (
                        <>
                          <LoaderCircle className="animate-spin" size={16} />
                          Saving changes...
                        </>
                      ) : (
                        <>
                          <Edit3 size={15} />
                          Save User Account Modifications
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-20 text-center text-xs text-[#77837b]">
                  Select a user account from the left sidebar to view and edit details.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: REVIEW QUEUE */}
        {activeTab === "queue" && (
          <section className="mt-6 border border-white/10 bg-[#151c19] p-5 sm:p-7 rounded-xl">
            {loading ? (
              <div className="flex items-center gap-3 text-sm text-[#a7b1a8]">
                <LoaderCircle className="animate-spin" size={18} />
                Loading pending requests...
              </div>
            ) : requests.length === 0 ? (
              <div className="py-12 text-center">
                <ShieldCheck className="mx-auto text-[#adc9a1]" size={36} />
                <p className="mt-3 text-sm text-[#a7b1a8]">The pending review queue is currently clear.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => {
                  const isKyc = request.kind === "kyc";
                  const docType = (request.details?.document_type as string) || "Identification Document";
                  const docNumber = (request.details?.document_number as string) || "";
                  const docUrl = (request.details?.document_url as string) || "";

                  return (
                    <article key={request.id} className="border border-white/10 p-5 rounded-lg bg-[#0e1311]">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isKyc ? "bg-[#adc9a1]/20 text-[#adc9a1]" : "bg-[#c9754d]/20 text-[#d88761]"
                            }`}>
                              {request.kind}
                            </span>
                            <span className="text-xs text-[#77837b]">ID: {request.id.slice(0, 8)}...</span>
                          </div>

                          <h2 className="text-lg capitalize font-serif text-white font-semibold">
                            {isKyc ? `KYC Document Submission (${docType})` : `${request.kind} Request`}
                            {request.amount ? ` · ${new Intl.NumberFormat("en-US", { style: "currency", currency: request.currency }).format(Number(request.amount))}` : ""}
                          </h2>

                          <p className="text-xs text-[#77837b]">Client User ID: <span className="font-mono text-white">{request.user_id}</span></p>
                          <p className="text-xs text-[#77837b]">Submitted: {new Date(request.created_at).toLocaleString()}</p>

                          {/* KYC Document Details Preview */}
                          {isKyc && (
                            <div className="mt-3 rounded-lg bg-[#151c19] p-4 border border-white/10 space-y-2 text-xs">
                              <p className="font-semibold text-[#adc9a1]">Submitted KYC Details:</p>
                              <p className="text-[#8e9b91]">Document Type: <span className="text-white font-medium">{docType}</span></p>
                              {docNumber && <p className="text-[#8e9b91]">Document / Passport #: <span className="text-white font-mono">{docNumber}</span></p>}

                              {docUrl && (
                                <div className="mt-3">
                                  <p className="text-[10px] text-[#77837b] mb-1.5 uppercase font-semibold">Attached Cloudinary Document Photo:</p>
                                  <a href={docUrl} target="_blank" rel="noreferrer" className="inline-block">
                                    <img src={docUrl} alt="Submitted Document" className="max-h-48 rounded border border-white/10 object-cover hover:opacity-95" />
                                  </a>
                                </div>
                              )}
                            </div>
                          )}

                          {request.details?.note ? (
                            <p className="text-xs text-[#d7ded5] bg-white/5 p-2 rounded">
                              Client note: {String(request.details.note)}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex shrink-0 items-center gap-3 self-end sm:self-start">
                          <button
                            onClick={() => isKyc ? void reviewKyc(request, "rejected") : void review(request.id, "rejected")}
                            className="rounded border border-[#d88761]/40 bg-[#d88761]/10 px-4 py-2 text-xs font-semibold text-[#d88761] hover:bg-[#d88761] hover:text-white transition"
                          >
                            Reject {isKyc ? "KYC" : ""}
                          </button>
                          <button
                            onClick={() => isKyc ? void reviewKyc(request, "approved") : void review(request.id, "approved")}
                            className="rounded bg-[#c9754d] px-5 py-2 text-xs font-semibold text-white hover:bg-[#b66543] transition shadow-md"
                          >
                            {isKyc ? "Accept KYC (Verify User)" : "Approve"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: DEPOSIT WALLETS & BANK INSTRUCTIONS CONTROL */}
        {activeTab === "wallets" && (
          <div className="mt-6 max-w-4xl space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#151c19] p-7 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="p-3 rounded-xl bg-[#c9754d]/20 text-[#c9754d]">
                  <Wallet size={24} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-white font-medium">System Deposit Wallet Addresses</h2>
                  <p className="text-xs text-[#8e9b91]">
                    Configure official crypto wallet deposit addresses and bank wire instructions visible to all clients.
                  </p>
                </div>
              </div>

              {saveSuccess && (
                <div className="mb-6 rounded-lg border border-[#adc9a1]/40 bg-[#adc9a1]/10 p-4 text-xs font-semibold text-[#adc9a1]">
                  ✓ {saveSuccess}
                </div>
              )}

              <form onSubmit={handleSaveWallets} className="space-y-6">
                {/* BTC Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d9b66f]">
                    Bitcoin (BTC) Wallet Address
                  </label>
                  <input
                    type="text"
                    required
                    value={depositWallets.btc_address}
                    onChange={(e) => setDepositWallets({ ...depositWallets, btc_address: e.target.value })}
                    placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa or bc1..."
                    className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-[#0e1311] px-4 font-mono text-xs text-white outline-none focus:border-[#c9754d]"
                  />
                  <p className="mt-1 text-[11px] text-[#77837b]">Network: Bitcoin (BTC)</p>
                </div>

                {/* ETH Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#627EEA]">
                    Ethereum (ETH / ERC-20) Wallet Address
                  </label>
                  <input
                    type="text"
                    required
                    value={depositWallets.eth_address}
                    onChange={(e) => setDepositWallets({ ...depositWallets, eth_address: e.target.value })}
                    placeholder="e.g. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                    className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-[#0e1311] px-4 font-mono text-xs text-white outline-none focus:border-[#c9754d]"
                  />
                  <p className="mt-1 text-[11px] text-[#77837b]">Network: Ethereum ERC-20</p>
                </div>

                {/* USDT TRC20 Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#26A17B]">
                    Tether (USDT TRC-20 / ERC-20) Address
                  </label>
                  <input
                    type="text"
                    required
                    value={depositWallets.usdt_trc20_address}
                    onChange={(e) => setDepositWallets({ ...depositWallets, usdt_trc20_address: e.target.value })}
                    placeholder="e.g. TYDzsYUE2SuYef3ZuSXvmwpt5zkxD59w66"
                    className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-[#0e1311] px-4 font-mono text-xs text-white outline-none focus:border-[#c9754d]"
                  />
                  <p className="mt-1 text-[11px] text-[#77837b]">Network: TRON TRC-20 / Ethereum ERC-20</p>
                </div>

                {/* SOL Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9945FF]">
                    Solana (SOL) Wallet Address
                  </label>
                  <input
                    type="text"
                    required
                    value={depositWallets.sol_address}
                    onChange={(e) => setDepositWallets({ ...depositWallets, sol_address: e.target.value })}
                    placeholder="e.g. 7xKXtg2CW87d97TXJSDpbD5jBk45f6jSj5k2p8z24N9h"
                    className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-[#0e1311] px-4 font-mono text-xs text-white outline-none focus:border-[#c9754d]"
                  />
                  <p className="mt-1 text-[11px] text-[#77837b]">Network: Solana Mainnet</p>
                </div>

                {/* Bank Wire Details */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#adc9a1]">
                    Bank Wire Transfer Instructions / IBAN
                  </label>
                  <textarea
                    rows={3}
                    value={depositWallets.bank_wire_info}
                    onChange={(e) => setDepositWallets({ ...depositWallets, bank_wire_info: e.target.value })}
                    placeholder="Bank Name, SWIFT Code, Account Number, Routing Number, Beneficiary Name..."
                    className="mt-2 w-full rounded-lg border border-white/10 bg-[#0e1311] p-3 text-xs text-white outline-none focus:border-[#c9754d]"
                  />
                  <p className="mt-1 text-[11px] text-[#77837b]">Instructions shown to clients requesting Wire Transfer deposit.</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingWallets}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#c9754d] px-7 py-3 text-xs font-semibold text-white transition hover:bg-[#b66543] disabled:opacity-50 shadow-lg"
                  >
                    {savingWallets ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
                    <span>{savingWallets ? "Saving Deposit Addresses..." : "Save Deposit Wallet Addresses"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
