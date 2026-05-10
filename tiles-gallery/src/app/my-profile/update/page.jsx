"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UpdateProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setUser(data.user);
        setName(data.user.name || "");
        setImage(data.user.image || "");
      } else {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (result.error) {
        toast.error(result.error.message || "Update failed");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-lg mx-auto">
        <Link href="/my-profile" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <ArrowLeft size={20} /> Back to Profile
        </Link>

        <div className="bg-slate-900 rounded-3xl p-10 border border-slate-700">
          <h1 className="text-4xl font-bold text-white text-center mb-10">Update Profile</h1>

          <form onSubmit={handleUpdate} className="space-y-8">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">Profile Photo URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}