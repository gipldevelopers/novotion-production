'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ChevronRight,
    CreditCard,
    MessageSquare,
    ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                if (data.user && data.user.role === 'ADMIN') {
                    setUser(data.user);
                } else {
                    router.push('/auth/login');
                }
            } catch (err) {
                router.push('/auth/login');
            }
        };
        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            toast.success("Logged out from Admin");
            router.push('/auth/login');
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/users', label: 'Users', icon: Users },
        { href: '/admin/purchases', label: 'Purchases', icon: ShoppingBag },
        { href: '/admin/payments', label: 'Payments', icon: CreditCard },
        { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar - Light Minimal Theme */}
            <aside
                className={`${isSidebarOpen ? 'w-[260px]' : 'w-[80px]'
                    } bg-white border-r border-gray-100 transition-all duration-300 fixed h-full z-50 flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]`}
            >
                {/* Sidebar Header - Logo & Badge */}
                <div className="h-20 flex items-center px-6 border-b border-gray-50 bg-white">
                    <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
                        <div className="shrink-0">
                            <Image
                                src="/logo/novotion_01.svg"
                                alt="Novotion"
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        {isSidebarOpen && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-semibold text-gray-900 tracking-tight">Novotion</span>
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">Admin Panel</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-blue-600' : 'group-hover:text-blue-500'}`} />
                                {isSidebarOpen && <span className="font-medium text-[13px]">{item.label}</span>}
                                {isActive && isSidebarOpen && <div className="ml-auto w-1 h-1 rounded-full bg-blue-600" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer - User & Profile */}
                <div className="p-4 border-t border-gray-50">
                    {isSidebarOpen && (
                        <div className="mb-4 px-2 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">Administrator</p>
                                <p className="text-[10px] text-gray-400 truncate">Control Center</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200`}
                    >
                        <LogOut className="h-[18px] w-[18px] shrink-0" />
                        {isSidebarOpen && <span className="font-medium text-[13px]">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[260px]' : 'ml-[80px]'}`}>
                {/* Top Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                        <div className="h-5 w-[1px] bg-gray-100 mx-2 hidden sm:block"></div>
                        <h2 className="text-sm font-medium text-gray-500 truncate hidden sm:block capitalize">
                            {pathname.split('/').pop() || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-gray-400 group focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                            <Search className="h-3.5 w-3.5" />
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs text-gray-900 w-40" />
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-blue-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="h-8 w-[1px] bg-gray-100 mx-1"></div>
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden xl:block">
                                    <p className="text-xs font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Logged as Admin</p>
                                </div>
                                <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-100">
                                    {user?.name?.[0] || 'A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
