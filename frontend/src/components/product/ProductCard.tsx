"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: { name: string };
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.images[0] || "",
    });
    // Normally would trigger a toast notification here
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f2ef] mb-4">
        <img 
          src={product.images[0] || "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop"} 
          alt={product.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-primary py-3 flex items-center justify-center space-x-2 text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-xs text-primary/50 uppercase tracking-widest block mb-1">
          {product.category?.name || "Bags"}
        </span>
        <h3 className="text-sm font-serif font-medium mb-1 group-hover:text-primary/70 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
