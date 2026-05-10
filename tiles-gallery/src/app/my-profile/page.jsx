"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Edit, Calendar, Mail, User } from "lucide-react";
import { toast } from "sonner";

export default function MyProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data?.user) {
          router.push("/login");
          return;
        }
        setUser(data.user);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-600 to-teal-500 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-900 shadow-xl">
                <img 
                  src={user?.image || "https://via.placeholder.com/300"} 
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 pb-10 px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>
            <p className="text-indigo-400 flex items-center justify-center gap-2">
              <Mail size={18} /> {user?.email}
            </p>
          </div>
          <div className="px-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-indigo-400" size={24} />
                <p className="text-slate-400 font-medium">Full Name</p>
              </div>
              <p className="text-white text-2xl font-semibold">{user?.name || "N/A"}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-indigo-400" size={24} />
                <p className="text-slate-400 font-medium">Email</p>
              </div>
              <p className="text-white text-xl break-all">{user?.email}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-indigo-400" size={24} />
                <p className="text-slate-400 font-medium">Member Since</p>
              </div>
              <p className="text-white text-2xl font-semibold">May 2026</p>
            </div>
          </div>
          <div className="px-8 pb-12 flex flex-col gap-4">
            <Link
              href="/my-profile/update"
              className="flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 py-5 rounded-2xl font-semibold text-lg transition-all active:scale-95"
            >
              <Edit size={24} />
              Update Profile Information
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 bg-red-600/10 hover:bg-red-600/20 border border-red-500 text-red-500 py-5 rounded-2xl font-semibold text-lg transition-all active:scale-95">
              <LogOut size={15} />
              Logout from Account
            </button>
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm mt-8">
          Tiles Gallery © 2026 • Premium Tile Gallery
        </p>
      </div>
    </div>
  );
}