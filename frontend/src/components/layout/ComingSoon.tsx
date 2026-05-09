import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Link from "next/link";

export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="min-h-screen flex flex-col pt-24 bg-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-serif mb-6">{title}</h1>
        <p className="text-primary/60 max-w-md mx-auto mb-8 leading-relaxed">
          We are currently crafting this experience. Check back soon for updates to our {title.toLowerCase()} page.
        </p>
        <Link href="/" className="text-sm uppercase tracking-widest font-semibold border-b border-primary pb-1">
          Return Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
