function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}

export function passwordResetEmail({ name, resetUrl }: { name?: string; resetUrl: string }) {
  const greeting = name ? `Hello, ${escapeHtml(name)}.` : "Hello,";
  return {
    html: `<!doctype html><html><body style="margin:0;background:#f3eee6;color:#213028;font-family:Arial,sans-serif"><div style="max-width:560px;margin:40px auto;background:#fffaf4"><div style="background:#15211c;padding:32px 40px;color:#f5f0e8"><div style="font-family:Georgia,serif;font-size:25px;letter-spacing:5px">INFINI</div><div style="margin-top:8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#afbbb0">Financial management</div></div><main style="padding:42px 40px"><p style="margin:0 0 18px;font-size:16px">${greeting}</p><h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:32px;font-weight:normal;line-height:1.2">Reset your password</h1><p style="margin:0 0 30px;color:#526158;font-size:15px;line-height:1.6">We received a request to reset your INFINI password. Use the button below to choose a new one.</p><a href="${resetUrl}" style="display:inline-block;background:#c9754d;color:#fffaf4;padding:14px 22px;text-decoration:none;font-size:14px">Reset password →</a><p style="margin:32px 0 0;color:#758179;font-size:13px;line-height:1.6">This link is single-use and expires shortly. If you did not request a password reset, you can safely ignore this email.</p></main><footer style="border-top:1px solid #e4ddd3;padding:22px 40px;color:#8c988f;font-size:11px;line-height:1.5">INFINI · Private wealth management, made clear.</footer></div></body></html>`,
    text: `${name ? `Hello, ${name}.` : "Hello,"}\n\nReset your INFINI password: ${resetUrl}\n\nThis link is single-use and expires shortly. If you did not request it, you can ignore this email.`,
  };
}
