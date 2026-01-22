"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  LogOut,
  Menu,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Search,
} from "lucide-react";
import { toast } from "sonner";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.user && data.user.role === "ADMIN") {
          setUser(data.user);
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/purchases", label: "Purchases", icon: ShoppingBag },
    { href: "/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 fixed top-0 left-0 h-screen w-64 z-50 flex flex-col">
        {/* Logo */}
        <div className="h-16 px-4 flex items-center border-b">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Novotion</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                {user?.name?.[0] || "A"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <ShieldCheck className="h-2 w-2 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b">
          <div className="h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-64">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm flex-1"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {user.name?.[0]}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
