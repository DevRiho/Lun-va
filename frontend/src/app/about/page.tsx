import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col pt-24 bg-white">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="h-[60vh] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop" 
            alt="Lunéva Atelier" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 text-center text-white p-6">
            <span className="uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium">The Heritage</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6 md:px-12 py-24 max-w-4xl">
          <div className="space-y-12 text-lg text-primary/80 leading-relaxed font-serif">
            <p>
              Founded in 2026, Lunéva was born from a desire to redefine modern luxury. We believe that true elegance lies not in logos or trends, but in the meticulous craftsmanship, exceptional materials, and timeless design of every piece.
            </p>
            <p>
              Our bags are handcrafted by master artisans in exclusive ateliers, where centuries-old techniques meet contemporary sensibility. Each stitch is a testament to our commitment to perfection, ensuring that every Lunéva piece is not just an accessory, but an heirloom.
            </p>
            <div className="py-12 border-y border-border my-16 text-center">
              <h2 className="text-3xl font-medium text-primary">"Elegance is the only beauty that never fades."</h2>
            </div>
            <p>
              We source only the finest, ethically produced leathers and hardware, ensuring our footprint is as beautiful as our creations. Sustainability is woven into the fabric of our brand, because true luxury respects the world it inhabits.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
