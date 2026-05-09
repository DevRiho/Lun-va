"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/login`, {
        email,
        password,
      });

      if (res.data.status === "success") {
        setAuth(res.data.data.user, res.data.token);
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-[#f9f8f6]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-border">
          <h1 className="text-3xl font-serif text-center mb-8">Sign In</h1>
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 mb-6 text-sm border border-destructive/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2 text-primary/70">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-primary/20 py-2 outline-none focus:border-primary transition-colors bg-transparent"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-widest font-medium text-primary/70">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary/50 hover:text-primary transition-colors">Forgot?</Link>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-primary/20 py-2 outline-none focus:border-primary transition-colors bg-transparent"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-primary/60">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
