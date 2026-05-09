import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShoppingBag, Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data.product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col pt-24 bg-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-sm uppercase tracking-widest border-b border-primary pb-1">Return to Shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-white">
      <Navbar />
      
      <div className="container mx-auto px-6 md:px-12 py-12 flex-1">
        
        <Link href="/shop" className="inline-flex items-center text-xs uppercase tracking-widest text-primary/60 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={14} className="mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#f4f2ef] overflow-hidden">
              <img 
                src={product.images[0] || "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop"} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square bg-[#f4f2ef] overflow-hidden cursor-pointer">
                    <img src={img} alt={`${product.name} detail`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-primary/50 uppercase tracking-widest mb-4">
              {product.category?.name || "Bags"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">{product.name}</h1>
            <p className="text-xl mb-6">${Number(product.price).toFixed(2)}</p>
            
            <div className="flex items-center space-x-1 text-yellow-500 mb-8">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-primary/50 text-sm ml-2">(12 Reviews)</span>
            </div>

            <p className="text-primary/70 leading-relaxed mb-10">
              {product.description}
            </p>

            <AddToCartButton product={product} />

            <div className="border-t border-border pt-8 mt-12 space-y-6">
              <div className="flex items-center text-sm text-primary/70">
                <Truck size={20} className="mr-4" />
                <span>Free complimentary shipping on orders over $300.</span>
              </div>
              <div className="flex items-center text-sm text-primary/70">
                <ShieldCheck size={20} className="mr-4" />
                <span>2-year warranty and authentic craftsmanship guaranteed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
