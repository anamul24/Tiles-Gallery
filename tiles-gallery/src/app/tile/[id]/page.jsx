"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TileDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [tile, setTile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/tiles.json")
            .then((res) => res.json())
            .then((data) => {
                const foundTile = data.tiles.find(
                    (item) => item.id === id
                );
                setTile(foundTile);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tile:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-2xl">Loading tile details...</div>;
    }

    if (!tile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Tile Not Found</h2>
                <Link href="/all-tiles" className="text-indigo-600 hover:underline">
                    ← Back to Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8"
            >
                <ArrowLeft size={20} /> Back to Gallery
            </button>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={tile.image}
                        alt={tile.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-8">
                    <div>
                        <h1 className="text-5xl font-bold text-slate-900 mb-3">{tile.title}</h1>
                        <p className="text-2xl text-indigo-600 font-semibold">
                            ${tile.price}
                        </p>
                    </div>

                    <div className="prose text-slate-600">
                        <p className="text-lg leading-relaxed">{tile.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500">DIMENSIONS</p>
                            <p className="font-medium">{tile.dimensions}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">MATERIAL</p>
                            <p className="font-medium">{tile.material}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">CATEGORY</p>
                            <p className="font-medium capitalize">{tile.category}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">STOCK</p>
                            <p className={`font-medium ${tile.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {tile.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-3">TAGS</p>
                        <div className="flex flex-wrap gap-2">
                            {tile.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm"
                                >{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-3xl font-medium text-lg transition">
                            Add to Wishlist
                        </button>
                        <button className="flex-1 border-2 border-slate-900 hover:bg-slate-900 hover:text-white py-4 rounded-3xl font-medium text-lg transition">
                            Inquire Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}