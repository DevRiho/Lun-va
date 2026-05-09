"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && (!isAuthenticated || user?.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router, mounted]);

  if (!mounted || !isAuthenticated || user?.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="text-2xl font-serif font-bold tracking-wider text-primary">
            LUNÉVA
          </Link>
          <p className="text-xs text-primary/50 uppercase tracking-widest mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center p-3 text-sm uppercase tracking-widest font-semibold hover:bg-[#f4f2ef] transition-colors rounded-sm text-primary/70 hover:text-primary">
            <LayoutDashboard size={18} className="mr-3" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center p-3 text-sm uppercase tracking-widest font-semibold hover:bg-[#f4f2ef] transition-colors rounded-sm text-primary/70 hover:text-primary">
            <Package size={18} className="mr-3" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center p-3 text-sm uppercase tracking-widest font-semibold hover:bg-[#f4f2ef] transition-colors rounded-sm text-primary/70 hover:text-primary">
            <ShoppingBag size={18} className="mr-3" /> Orders
          </Link>
          <Link href="/admin/users" className="flex items-center p-3 text-sm uppercase tracking-widest font-semibold hover:bg-[#f4f2ef] transition-colors rounded-sm text-primary/70 hover:text-primary">
            <Users size={18} className="mr-3" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center p-3 text-sm uppercase tracking-widest font-semibold hover:bg-[#f4f2ef] transition-colors rounded-sm text-primary/70 hover:text-primary">
            <Settings size={18} className="mr-3" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-primary/50">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="w-full flex items-center p-2 text-sm uppercase tracking-widest font-semibold text-destructive hover:bg-destructive/10 transition-colors rounded-sm"
          >
            <LogOut size={16} className="mr-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
