// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware sederhana:
 * - Cek cookie "user" (harus berisi JSON string seperti: {"id": 1, "name": "Raihan", "role": "admin"})
 * - Jika akses ke /admin/* dan user tidak ada atau role !== 'admin' -> redirect ke /login
 * - Jika akses ke /checkout dan user tidak ada -> redirect ke /login
 */

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ambil cookie 'user' (value string). Note: .get returns a cookie object in newer Next.js
  const cookie = req.cookies.get("user")?.value ?? null;

  let user: { id?: number; name?: string; role?: string } | null = null;
  if (cookie) {
    try {
      user = JSON.parse(cookie);
    } catch (e) {
      user = null;
    }
  }

  // Proteksi admin area
  if (pathname.startsWith("/admin")) {
    if (!user || user.role !== "admin") {
      // redirect ke /login (kirim kembali ke halaman yang diminta via a query? opsional)
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Proteksi checkout (hanya user terautentikasi boleh akses)
  if (pathname === "/checkout") {
    if (!user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Kalau lolos, lanjutkan middleware chain / render
  return NextResponse.next();
}

/**
 * config.matcher -> rute yang akan dipakai middleware ini
 * (kamu bisa tambah/ubah path sesuai kebutuhan)
 */
export const config = {
  matcher: ["/admin/:path*", "/checkout"],
};
