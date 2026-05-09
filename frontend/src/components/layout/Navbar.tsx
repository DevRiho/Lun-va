"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { CartSidebar } from "../cart/CartSidebar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const cartItems = useCartStore((state) => state.items);
  const { isAuthenticated, user } = useAuthStore();
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-2 shadow-sm text-primary" : `bg-transparent py-3 ${isHomePage ? 'text-white' : 'text-primary'}`
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden hover:opacity-70 transition-opacity"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className={`flex items-center transition-all duration-300 ${(!isScrolled && isHomePage) ? "brightness-0 invert" : ""}`}>
          <Image src="/logo-transparent.png" alt="Lunéva Logo" width={135} height={42} className="object-contain" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
          <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
          <Link href="/collections" className="hover:opacity-70 transition-opacity">Collections</Link>
          <Link href="/about" className="hover:opacity-70 transition-opacity">Heritage</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="hidden md:block hover:opacity-70 transition-opacity">
            <Search size={20} />
          </button>
          
          <Link href={isAuthenticated ? "/profile" : "/login"} className="hidden md:block hover:opacity-70 transition-opacity">
            <User size={20} />
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative hover:opacity-70 transition-opacity group"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Image src="/logo-transparent.png" alt="Lunéva Logo" width={120} height={40} className="object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-8 text-2xl font-serif">
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
              <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Heritage</Link>
              <Link href={isAuthenticated ? "/profile" : "/login"} onClick={() => setIsMobileMenuOpen(false)}>
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
