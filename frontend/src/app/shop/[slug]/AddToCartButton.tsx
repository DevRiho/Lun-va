"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.images[0] || "",
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-black text-white py-4 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors"
    >
      <ShoppingBag size={20} />
      <span>Add to Cart</span>
    </button>
  );
}
