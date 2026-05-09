import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-white">
      <Navbar />
      
      <div className="container mx-auto px-6 md:px-12 py-12 flex-1">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Shop All</h1>
          <p className="text-primary/60 max-w-xl mx-auto">
            Discover our complete collection of meticulously crafted luxury bags. 
            Designed to elevate your everyday elegance.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center border-b border-border pb-4 mb-12">
          <div className="flex space-x-6 text-sm uppercase tracking-widest font-semibold text-primary/70">
            <button className="text-primary border-b border-primary pb-1">All Bags</button>
            <button className="hover:text-primary transition-colors">Totes</button>
            <button className="hover:text-primary transition-colors">Crossbody</button>
            <button className="hover:text-primary transition-colors">Clutches</button>
          </div>
          
          <div>
            <select className="bg-transparent text-sm uppercase tracking-widest font-semibold outline-none cursor-pointer">
              <option>Sort By: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-primary/50">
            <p className="text-xl font-serif">No products found.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
