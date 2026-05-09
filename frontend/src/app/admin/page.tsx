"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

export default function AdminDashboard() {
  const { token } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-[#f4f2ef] w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[#f4f2ef]"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-medium">Overview</h1>
        <div className="text-sm text-primary/50">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-primary/70">Total Revenue</h3>
            <DollarSign size={20} className="text-green-600" />
          </div>
          <p className="text-3xl font-serif">${data?.totalRevenue?.toFixed(2) || "0.00"}</p>
        </div>
        
        <div className="bg-white p-6 shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-primary/70">Total Orders</h3>
            <ShoppingBag size={20} className="text-blue-600" />
          </div>
          <p className="text-3xl font-serif">{data?.totalOrders || 0}</p>
        </div>
        
        <div className="bg-white p-6 shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-primary/70">Products</h3>
            <Package size={20} className="text-orange-600" />
          </div>
          <p className="text-3xl font-serif">{data?.totalProducts || 0}</p>
        </div>
        
        <div className="bg-white p-6 shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-primary/70">Customers</h3>
            <Users size={20} className="text-purple-600" />
          </div>
          <p className="text-3xl font-serif">{data?.totalUsers || 0}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-sm border border-border">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-serif font-medium">Recent Orders</h2>
          <button className="text-xs uppercase tracking-widest font-semibold border-b border-primary pb-1">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f8f6] text-xs uppercase tracking-widest text-primary/60">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentOrders?.length > 0 ? (
                data.recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-[#f4f2ef]/50 transition-colors">
                    <td className="p-4 text-sm font-medium">#{order.id.substring(0, 8)}</td>
                    <td className="p-4 text-sm">{order.user?.name || "Guest"}</td>
                    <td className="p-4 text-sm text-primary/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium text-right">${Number(order.totalAmount).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-primary/50 text-sm">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
