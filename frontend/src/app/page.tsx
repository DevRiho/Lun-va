import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <Hero />

      {/* Featured Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium">Curated Collections</h2>
            <Link href="/collections" className="group flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary/70 transition-colors">
              View All <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <Link href="/shop?category=totes" className="group block overflow-hidden relative h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop" 
                alt="Tote Bags" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-serif mb-2">Signature Totes</h3>
                <span className="text-white/80 text-sm uppercase tracking-wider">Explore</span>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link href="/shop?category=crossbody" className="group block overflow-hidden relative h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1887&auto=format&fit=crop" 
                alt="Crossbody Bags" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-serif mb-2">Elegant Crossbody</h3>
                <span className="text-white/80 text-sm uppercase tracking-wider">Explore</span>
              </div>
            </Link>
            
            {/* Category 3 */}
            <Link href="/shop?category=clutches" className="group block overflow-hidden relative h-[500px] md:hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1771&auto=format&fit=crop" 
                alt="Evening Clutches" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-serif mb-2">Evening Clutches</h3>
                <span className="text-white/80 text-sm uppercase tracking-wider">Explore</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-[#f9f8f6]">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1614179689702-355944cd0918?q=80&w=1935&auto=format&fit=crop" 
              alt="Craftsmanship" 
              className="w-full h-auto object-cover rounded-sm"
            />
          </div>
          <div className="flex-1 max-w-lg">
            <h2 className="text-sm uppercase tracking-widest font-semibold mb-4 text-primary/70">Our Heritage</h2>
            <h3 className="text-4xl font-serif mb-6 leading-tight">Mastering the Art of Leather Craftsmanship.</h3>
            <p className="text-primary/70 leading-relaxed mb-8">
              At Lunéva, we believe that true luxury lies in the details. Every piece is meticulously handcrafted by master artisans using only the finest, ethically sourced materials. We blend timeless elegance with modern sensibility to create pieces that will be cherished for generations.
            </p>
            <Link 
              href="/about" 
              className="inline-block border-b border-primary pb-1 text-sm uppercase tracking-widest font-semibold hover:text-primary/70 hover:border-primary/70 transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
