import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-24 bg-white">
      <Navbar />
      
      <div className="flex-1">
        <div className="container mx-auto px-6 md:px-12 py-12">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Curated Collections</h1>
            <p className="text-primary/60 max-w-xl mx-auto">
              Explore our distinctive collections, each designed with a unique narrative and uncompromising quality.
            </p>
          </div>

          <div className="space-y-24">
            
            {/* Collection 1 */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop" 
                  alt="The Signature Tote Collection" 
                  className="w-full h-[600px] object-cover"
                />
              </div>
              <div className="flex-1 max-w-lg">
                <span className="text-xs uppercase tracking-widest font-semibold text-primary/50 block mb-4">Collection 01</span>
                <h2 className="text-4xl font-serif mb-6">The Signature Totes</h2>
                <p className="text-primary/70 leading-relaxed mb-8">
                  Designed for the modern professional, our Signature Totes blend spacious practicality with uncompromising elegance. Crafted from full-grain calfskin leather, they are the ultimate everyday companion.
                </p>
                <Link 
                  href="/shop?category=totes" 
                  className="inline-flex items-center text-sm uppercase tracking-widest font-semibold border-b border-primary pb-1 hover:text-primary/70 transition-colors"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Collection 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1887&auto=format&fit=crop" 
                  alt="The Crossbody Collection" 
                  className="w-full h-[600px] object-cover"
                />
              </div>
              <div className="flex-1 max-w-lg md:ml-auto">
                <span className="text-xs uppercase tracking-widest font-semibold text-primary/50 block mb-4">Collection 02</span>
                <h2 className="text-4xl font-serif mb-6">Effortless Crossbody</h2>
                <p className="text-primary/70 leading-relaxed mb-8">
                  Hands-free sophistication. The Crossbody collection features sleek silhouettes and adjustable straps, perfect for seamlessly transitioning from day to night with effortless style.
                </p>
                <Link 
                  href="/shop?category=crossbody" 
                  className="inline-flex items-center text-sm uppercase tracking-widest font-semibold border-b border-primary pb-1 hover:text-primary/70 transition-colors"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
