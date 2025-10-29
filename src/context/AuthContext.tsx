"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

type User = {
  id: number;
  name: string;
  role: "admin" | "customer";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🟡 Tahap 1: Ambil data user dari cookie saat pertama kali halaman dibuka
  useEffect(() => {
    const storedUser = Cookies.get("user");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Gagal parse cookie user:", err);
      }
    }
  }, []);

  // 🟢 Tahap 2: Fungsi login — simpan user di state + cookie
  const login = async (username: string, password: string) => {
    let loggedUser: User | null = null;

    if (username === "admin" && password === "admin123") {
      loggedUser = { id: 1, name: "user", role: "admin" };
    } else if (username === "user" && password === "user123") {
      loggedUser = { id: 2, name: "user", role: "customer" };
    } else {
      throw new Error("Username atau password salah!");
    }

    setUser(loggedUser);
    Cookies.set("user", JSON.stringify(loggedUser), { expires: 1 }); // expire 1 hari
    console.log("✅ Cookie user diset:", Cookies.get("user"));


    // redirect sesuai role
  if (typeof window !== "undefined") {
    if (loggedUser.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
   }
  };

  

  // 🔴 Tahap 3: Fungsi logout — hapus cookie
  const logout = () => {
    setUser(null);
    Cookies.remove("user");

    if (typeof window !== "undefined") {
    window.location.href = "/login"; // ✅ Redirect ke login page
  }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth harus di dalam AuthProvider!");
  return context;
}
