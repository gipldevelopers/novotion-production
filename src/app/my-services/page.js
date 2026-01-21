import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Package,
    Clock,
    CheckCircle,
    ExternalLink,
    Shield,
    Calendar,
    CreditCard,
    User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyServicesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        redirect("/auth/login?callbackUrl=/my-services");
    }

    const payload = verifyJwt(token);
    if (!payload || !payload.userId) {
        redirect("/auth/login?callbackUrl=/my-services");
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: {
            purchases: {
                orderBy: { createdAt: "desc" }
            },
            payments: {
                orderBy: { createdAt: "desc" },
                take: 5
            }
        }
    });

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <UserIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name || user.email}</h1>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/services/pro-services">
                                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Explore Services
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content - Active Services */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Package className="h-5 w-5 text-blue-600" />
                                    My Purchased Services
                                </h2>
                                <span className="text-sm text-gray-500">{user.purchases.length} Items</span>
                            </div>

                            {user.purchases.length === 0 ? (
                                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                                    <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="h-8 w-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No services purchased yet</h3>
                                    <p className="text-gray-500 mb-6">Explore our range of pro services and career packages to get started.</p>
                                    <Link href="/services/pro-services">
                                        <button className="text-blue-600 font-semibold hover:underline">
                                            Browse Services →
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {user.purchases.map((purchase) => (
                                        <div key={purchase.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-lg font-bold text-gray-900">{purchase.itemName}</h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${purchase.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {purchase.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">Purchased on {new Date(purchase.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-blue-600">${purchase.itemPrice}</p>
                                                    <p className="text-xs text-gray-400 capitalize">{purchase.type.toLowerCase().replace('_', ' ')}</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock className="h-3 w-3" />
                                                        <span>Lifetime Access</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Shield className="h-3 w-3" />
                                                        <span>Verified</span>
                                                    </div>
                                                </div>
                                                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                                                    View Details <ExternalLink className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Recent Activity & Billing Info */}
                        <div className="space-y-8">
                            {/* Recent Payments */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-blue-600" />
                                    Recent Payments
                                </h3>
                                <div className="space-y-4">
                                    {user.payments.map((payment) => (
                                        <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                                                <p className="text-[10px] text-gray-400">{new Date(payment.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${payment.status === 'SUCCESS' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                    ))}
                                    {user.payments.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-4">No payment history</p>
                                    )}
                                </div>
                            </div>

                            {/* Account Security */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                                <Shield className="h-8 w-8 mb-4 opacity-80" />
                                <h3 className="text-lg font-bold mb-2">Account Secure</h3>
                                <p className="text-blue-100 text-sm mb-4">Your data is protected by industry standard encryption.</p>
                                <div className="flex items-center gap-2 text-xs bg-white/10 w-fit px-3 py-1.5 rounded-full">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>256-bit SSL Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
