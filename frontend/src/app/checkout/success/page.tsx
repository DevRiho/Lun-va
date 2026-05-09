"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear cart on successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-[#f9f8f6]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-12 shadow-sm border border-border max-w-lg">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          
          <h1 className="text-3xl font-serif mb-4">Payment Successful!</h1>
          <p className="text-primary/60 mb-8 leading-relaxed">
            Thank you for your purchase. We've received your order and will begin processing it right away. A confirmation email has been sent to you.
          </p>
          
          <div className="flex flex-col space-y-4">
            <Link 
              href="/profile" 
              className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              View Order Status
            </Link>
            <Link 
              href="/shop" 
              className="w-full bg-transparent text-primary py-4 uppercase tracking-widest text-sm font-semibold border border-primary hover:bg-black/5 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
