"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-serif font-medium">Your Cart ({items.length})</h2>
              <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-primary/50 text-lg font-serif">Your cart is empty.</p>
                  <button 
                    onClick={onClose}
                    className="text-sm uppercase tracking-widest border-b border-primary pb-1 font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-24 h-32 bg-[#f4f2ef] flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif font-medium text-sm leading-snug pr-4">{item.name}</h3>
                          <button onClick={() => removeItem(item.productId)} className="text-primary/40 hover:text-destructive transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center border border-border w-fit rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 text-primary/60 hover:bg-black/5 transition-colors"
                        >-</button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1 text-primary/60 hover:bg-black/5 transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-6 bg-[#f9f8f6]">
                <div className="flex justify-between items-center mb-6 text-lg font-medium">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-primary/50 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                <Link 
                  href="/checkout" 
                  onClick={onClose}
                  className="w-full bg-black text-white py-4 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors"
                >
                  <span>Checkout</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
