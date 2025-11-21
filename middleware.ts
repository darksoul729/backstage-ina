import { NextRequest, NextResponse } from "next/server";

// Tentukan path mana saja yang mau diproteksi
export const config = {
  matcher: ["/admin/:path*"], 
};

export function middleware(req: NextRequest) {
  // 1. Cek apakah user punya cookie bernama 'admin_session'
  // (Cookie ini nanti kita buat saat user berhasil Login)
  const hasSession = req.cookies.has("admin_session");

  // 2. Jika TIDAK punya cookie session, PAKSA lempar ke halaman /login
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Jika punya cookie, silakan lanjut masuk ke Admin
  return NextResponse.next();
}