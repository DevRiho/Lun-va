import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Image src="/logo-transparent.png" alt="Lunéva Logo" width={180} height={60} className="object-contain mb-6 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              Crafting elegance for the modern woman. Discover our collection of premium, handcrafted luxury bags designed to elevate your everyday style.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="hover:text-white transition-colors">Care Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-b border-primary-foreground/30 py-2 outline-none text-sm w-full placeholder:text-primary-foreground/40 focus:border-white transition-colors"
              />
              <button type="submit" className="text-sm uppercase tracking-wider font-semibold ml-4 hover:opacity-70 transition-opacity">
                Subscribe
              </button>
            </form>
            
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 hover:text-white transition-colors">IG</a>
              <a href="#" className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 hover:text-white transition-colors">FB</a>
              <a href="#" className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 hover:text-white transition-colors">X</a>
              <a href="#" className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 hover:text-white transition-colors">YT</a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Lunéva. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
