import { NextResponse } from "next/server";
import { adminHeaders, requireAdmin } from "@/lib/operations";
import { supabaseUrl } from "@/lib/auth";

const defaultSettings = {
  btc_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  eth_address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  usdt_trc20_address: "TYDzsYUE2SuYef3ZuSXvmwpt5zkxD59w66",
  sol_address: "7xKXtg2CW87d97TXJSDpbD5jBk45f6jSj5k2p8z24N9h",
  bank_wire_info: "Bank Name: INFINI Trust Bank Ltd | Account: 9876543210 | SWIFT/BIC: INFNUS33 | Beneficiary: INFINI Financial Management",
};

export async function GET() {
  try {
    const headers = adminHeaders();
    const response = await fetch(
      `${supabaseUrl()}/rest/v1/profiles?role=eq.admin&select=id,onboarding&limit=1`,
      { headers, cache: "no-store" }
    );

    if (response.ok) {
      const profiles = await response.json();
      if (Array.isArray(profiles) && profiles.length > 0) {
        const onboarding = (profiles[0].onboarding as Record<string, unknown>) || {};
        const savedCrypto = (onboarding.crypto_addresses as Record<string, string>) || {};
        return NextResponse.json({
          settings: {
            btc_address: savedCrypto.btc_address || defaultSettings.btc_address,
            eth_address: savedCrypto.eth_address || defaultSettings.eth_address,
            usdt_trc20_address: savedCrypto.usdt_trc20_address || defaultSettings.usdt_trc20_address,
            sol_address: savedCrypto.sol_address || defaultSettings.sol_address,
            bank_wire_info: savedCrypto.bank_wire_info || defaultSettings.bank_wire_info,
          },
        });
      }
    }
    return NextResponse.json({ settings: defaultSettings });
  } catch {
    return NextResponse.json({ settings: defaultSettings });
  }
}

export async function POST(request: Request) {
  try {
    const adminUser = await requireAdmin();
    const body = await request.json();
    const { btc_address, eth_address, usdt_trc20_address, sol_address, bank_wire_info } = body;

    const headers = adminHeaders();

    // Fetch admin profile
    const profileRes = await fetch(
      `${supabaseUrl()}/rest/v1/profiles?id=eq.${adminUser.id}&select=*&limit=1`,
      { headers, cache: "no-store" }
    );

    if (!profileRes.ok) {
      return NextResponse.json({ error: "Admin profile not found." }, { status: 404 });
    }

    const profiles = await profileRes.json();
    const adminProfile = profiles[0];

    const currentOnboarding = (adminProfile.onboarding as Record<string, unknown>) || {};
    const updatedCrypto = {
      btc_address: String(btc_address || "").trim(),
      eth_address: String(eth_address || "").trim(),
      usdt_trc20_address: String(usdt_trc20_address || "").trim(),
      sol_address: String(sol_address || "").trim(),
      bank_wire_info: String(bank_wire_info || "").trim(),
    };

    const updatedOnboarding = {
      ...currentOnboarding,
      crypto_addresses: updatedCrypto,
    };

    const patchRes = await fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${adminUser.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        onboarding: updatedOnboarding,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!patchRes.ok) {
      return NextResponse.json({ error: "Failed to save deposit addresses." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Deposit addresses updated successfully!",
      settings: updatedCrypto,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update settings." },
      { status: 500 }
    );
  }
}
