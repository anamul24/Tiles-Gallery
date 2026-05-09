import Link from "next/link";
import FeaturedTiles from "@/components/FeaturedTiles";

export default function Home() {
  return (<>
      <div className="min-h-[90vh] bg-[url('/images/hero.jpg')] bg-cover bg-center relative flex items-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-4xl mx-auto px-3 text-white z-10">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">Discover Your<br />Perfect Aesthetic.</h1>
          <p className="text-xl md:text-2xl max-w-lg mb-10 text-slate-200">Browse our curated collection of premium architectural tiles.</p>
          <Link href="/all-tiles" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-3xl text-lg font-medium inline-block">Browse Full Gallery</Link>
        </div>
      </div>
      <div className="bg-indigo-700 py-3 overflow-hidden">
        <div className="marquee-wrapper">
          <div className="marquee-track text-white text-sm font-medium">
            <span>NEW ARRIVALS: CERAMIC BLUE TILE •</span>
            <span>WEEKLY FEATURE: MODERN GEOMETRIC PATTERNS •</span>
            <span>WORLDWIDE SHIPPING AVAILABLE •</span>
            <span>20% OFF NATURAL STONE SLAB SERIES •</span>
            <span>JOIN THE TILES-GALLERY COMMUNITY •</span>
            <span>NEW ARRIVALS: CERAMIC BLUE TILE •</span>
            <span>WEEKLY FEATURE: MODERN GEOMETRIC PATTERNS •</span>
            <span>WORLDWIDE SHIPPING AVAILABLE •</span>
            <span>20% OFF NATURAL STONE SLAB SERIES •</span>
            <span>JOIN THE TILES-GALLERY COMMUNITY •</span>
          </div>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Featured Designs</h2>
        <p className="text-center text-slate-600 mb-12">Curated picks for modern interiors</p>
        <FeaturedTiles />
      </section>
    </>
  );
}