"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Lock } from "lucide-react";
import axios from "axios";

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const { isAuthenticated, token } = useAuthStore();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("clkz90xdf0000y1u8s35f..."); // Mocking Address ID for now

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=checkout");
    }
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [isAuthenticated, items, router]);

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    try {
      const payload = {
        items: items.map(item => ({ productId: item.productId, quantity: item.quantity })),
        shippingAddressId: address, // In real app, user selects address
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/orders/checkout-session`, 
        payload, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === "success") {
        window.location.href = res.data.sessionUrl; // Redirect to Stripe
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error initiating checkout");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || items.length === 0) return null;

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-[#f9f8f6]">
      <Navbar />
      
      <div className="container mx-auto px-6 md:px-12 py-12 flex-1">
        <h1 className="text-4xl font-serif mb-12 text-center">Secure Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Order Summary */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-serif mb-6">Order Summary</h2>
            <div className="bg-white p-6 shadow-sm border border-border space-y-6">
              {items.map(item => (
                <div key={item.productId} className="flex gap-4">
                  <div className="w-20 h-24 bg-[#f4f2ef] flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-serif font-medium text-sm">{item.name}</h3>
                    <p className="text-primary/50 text-xs mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm mt-2">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-border pt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary/70">Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-medium pt-4 border-t border-border">
                  <span>Total Due</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Section */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-serif mb-6">Payment</h2>
            <div className="bg-white p-8 shadow-sm border border-border">
              
              <div className="mb-8">
                <p className="text-sm text-primary/70 mb-4 flex items-center">
                  <Lock size={16} className="mr-2" />
                  You will be redirected to Stripe's secure payment portal to complete your purchase.
                </p>
              </div>

              <button 
                onClick={handleStripeCheckout}
                disabled={isLoading}
                className="w-full bg-black text-white py-4 flex items-center justify-center uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Processing..." : `Pay $${getTotal().toFixed(2)} with Stripe`}
              </button>
              
              <div className="mt-6 flex items-center justify-center space-x-4 opacity-50">
                <span className="text-xs font-bold uppercase tracking-widest">Powered by Stripe</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </main>
  );
}
