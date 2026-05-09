"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";
import { LogOut, Package, User, MapPin, Settings } from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [isAuthenticated, router, token, activeTab]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) return null;

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-[#f9f8f6]">
      <Navbar />
      
      <div className="container mx-auto px-6 md:px-12 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">My Account</h1>
              <p className="text-primary/60 text-lg">Welcome back, {user.name.split(' ')[0]}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-6 md:mt-0 flex items-center text-sm uppercase tracking-widest font-semibold text-primary/60 hover:text-destructive transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0 space-y-2">
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center p-4 text-sm uppercase tracking-widest font-semibold transition-colors ${activeTab === "orders" ? "bg-white border-l-2 border-primary shadow-sm" : "hover:bg-white/50 text-primary/60"}`}
              >
                <Package size={18} className="mr-3" /> Orders
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center p-4 text-sm uppercase tracking-widest font-semibold transition-colors ${activeTab === "profile" ? "bg-white border-l-2 border-primary shadow-sm" : "hover:bg-white/50 text-primary/60"}`}
              >
                <User size={18} className="mr-3" /> Profile Details
              </button>
              <button 
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center p-4 text-sm uppercase tracking-widest font-semibold transition-colors ${activeTab === "addresses" ? "bg-white border-l-2 border-primary shadow-sm" : "hover:bg-white/50 text-primary/60"}`}
              >
                <MapPin size={18} className="mr-3" /> Addresses
              </button>
              {user.role === "ADMIN" && (
                <button 
                  onClick={() => router.push("/admin")}
                  className={`w-full flex items-center p-4 text-sm uppercase tracking-widest font-semibold transition-colors hover:bg-white/50 text-primary/60`}
                >
                  <Settings size={18} className="mr-3" /> Admin Dashboard
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-8 md:p-10 shadow-sm border border-border">
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-serif mb-8">Order History</h2>
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-[#f4f2ef] w-full"></div>
                      ))}
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order: any) => (
                        <div key={order.id} className="border border-border p-6 flex flex-col md:flex-row justify-between md:items-center gap-6 hover:shadow-md transition-shadow">
                          <div>
                            <p className="text-xs text-primary/50 uppercase tracking-widest mb-1">Order #{order.id.substring(0, 8)}</p>
                            <p className="text-sm font-medium mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <span className={`inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold ${
                              order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                              order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="flex -space-x-4">
                            {order.items.slice(0, 3).map((item: any, i: number) => (
                              <img 
                                key={i}
                                src={item.product.images[0]} 
                                alt="Product" 
                                className="w-16 h-16 object-cover rounded-full border-2 border-white bg-white"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-16 h-16 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-serif mb-2">${Number(order.totalAmount).toFixed(2)}</p>
                            <button className="text-xs uppercase tracking-widest font-semibold border-b border-primary pb-1">View Details</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-primary/50 text-lg font-serif mb-4">You haven't placed any orders yet.</p>
                      <button onClick={() => router.push("/shop")} className="text-sm uppercase tracking-widest border-b border-primary pb-1 font-semibold">Start Shopping</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-serif mb-8">Profile Details</h2>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-medium mb-2 text-primary/70">Full Name</label>
                      <p className="border-b border-primary/20 py-2 text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-medium mb-2 text-primary/70">Email Address</label>
                      <p className="border-b border-primary/20 py-2 text-lg">{user.email}</p>
                    </div>
                    <button className="mt-8 bg-black text-white px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-black/80 transition-colors">
                      Edit Details
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
