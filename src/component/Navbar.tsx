"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; // ✅ Tambahan untuk Cart
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");
  const { user, logout } = useAuth();
  const { items } = useCart(); // ✅ Ambil data cart dari context
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSearch?.(query);
    if (!query.trim()) return;

    router.push(`/?q=${query}`);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-yellow-500 hover:text-yellow-600 transition"
        >
          RevoShop
        </Link>

        {/* Search */}
        <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex">
          <input
            type="text"
            placeholder="Cari produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium text-black placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition"
          >
            Cari
          </button>
        </form>

        {/* Navigasi kanan */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-yellow-500 font-medium transition"
          >
            Home
          </Link>

          {/* Ikon Keranjang */}
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-yellow-500 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {/* Auth Info */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">
                Halo, {user.name} ({user.role})
              </span>
              <button
                onClick={() => {
                  logout();
                  alert("Anda berhasil logout");
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
