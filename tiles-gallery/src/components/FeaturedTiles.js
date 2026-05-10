"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedTiles() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => {
        setTiles(data.tiles.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl text-slate-600">Loading featured tiles...</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={28}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      navigation
      className="pb-12"
    >
      {tiles.map((tile) => (
        <SwiperSlide key={tile.id}>
          <div className="tile-card group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-slate-100">
            <div className="relative h-72 overflow-hidden">
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {!tile.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow">
                  Out of Stock
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xl px-5 py-2 rounded-2xl shadow-md">
                ${tile.price}
              </div>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3 className="font-semibold text-xl leading-tight mb-3 line-clamp-2 text-slate-800 group-hover:text-indigo-700 transition-colors">
                {tile.title}
              </h3>

              <p className="text-slate-600 text-sm line-clamp-3 mb-8 flex-1">
                {tile.description}
              </p>

              <div className="mt-auto">
                <Link
                  href={`/tile/${tile.id}`}
                  className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-medium text-base transition-all active:scale-95"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}