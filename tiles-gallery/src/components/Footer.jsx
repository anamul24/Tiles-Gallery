"use client";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1410] text-gray-300 pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">TILES GALLERY</h2>
          <p className="text-sm leading-relaxed">
            Curating the world's finest tiles for spaces that inspire.
            From classic ceramics to exotic marble.
          </p>

          <div className="flex gap-4 mt-6">
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaFacebook className="cursor-pointer hover:text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/all-tiles">All Tiles</Link></li>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>info@tiles-gallery.com</li>
            <li>01764162669</li>
            <li>161/12<br />Dhaka Cantonment, Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Join our community for weekly design inspiration.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-l-xl bg-[#2a211c] border-none outline-none w-full"
            />
            <button className="bg-white text-black px-5 rounded-r-xl font-medium">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2026 Tiles Gallery. All rights reserved.
      </div>
    </footer>
  );
}