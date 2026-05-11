"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <nav className="border-b sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">T</div>
          <span className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">TILES GALLERY</span>
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
              <Link
                href="/my-profile"
                className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-3xl hover:bg-slate-200 transition"
              >
                <img
                  src={session.user.image || "https://via.placeholder.com/40"}
                  alt={session.user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="font-medium text-sm hidden md:block">{session.user.name}</span>
            </Link>
            </div>
            
        ) : (
        <Link
          href="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-3xl font-medium transition"
        >Login
        </Link>
          )}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </div>
      {
    mobileOpen && (
      <div className="md:hidden border-t bg-white px-6 py-5 space-y-5">

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="block text-lg font-medium text-slate-700 hover:text-indigo-600"
        >Home
        </Link>
        <Link
          href="/all-tiles"
          onClick={() => setMobileOpen(false)}
          className="block text-lg font-medium text-slate-700 hover:text-indigo-600"
        >All Tiles
        </Link>
        {session && (
          <Link
            href="/my-profile"
            onClick={() => setMobileOpen(false)}
            className="block text-lg font-medium text-slate-700 hover:text-indigo-600"
          >My Profile
          </Link>
        )}
        {session ? (
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-3 rounded-2xl font-medium"
          >Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="block text-center bg-indigo-600 text-white py-3 rounded-2xl font-medium"
          >Login
          </Link>
        )}
      </div>
    )
  }
    </nav >
  );
}