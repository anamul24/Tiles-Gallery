"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <nav className="border-b sticky top-0 z-50 shadow-sm inset-0 bg-white/90">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">T</div>
          <span className="text-3xl font-bold tracking-tight text-slate-900">TILES GALLERY</span>
        </Link>
        <div className="hidden md:flex items-center gap-10 text-lg font-medium text-slate-700">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/all-tiles" className="hover:text-indigo-600 transition-colors">All Tiles</Link>
          {session && (
            <Link href="/my-profile" className="hover:text-indigo-600 transition-colors">My Profile</Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-3xl">
                <img 
                  src={session.user.image || "https://via.placeholder.com/40"} 
                  alt={session.user.name} 
                  className="w-9 h-9 rounded-full object-cover" 
                />
                <span className="font-medium text-sm hidden md:block">{session.user.name}</span>
              </div>
              <button 
                onClick={handleSignOut} 
                disabled={isPending}
                className="p-3 hover:bg-red-50 rounded-2xl text-red-600 transition"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-3xl font-medium transition"
            >
              Login
            </Link>
          )}

          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}