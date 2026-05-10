"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllTiles() {
    const [tiles, setTiles] = useState([]);
    const [filteredTiles, setFilteredTiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/tiles.json")
            .then(res => res.json())
            .then(data => {
                setTiles(data.tiles);
                setFilteredTiles(data.tiles);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        const filtered = tiles.filter(tile =>
            tile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tile.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTiles(filtered);
    }, [searchTerm, tiles]);

    if (loading) return <div className="text-center py-20 text-xl">Loading tiles...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-5xl font-bold text-center mb-4">The Full Gallery</h1>
            <p className="text-center text-slate-600 mb-12">Explore our complete collection</p>
            <div className="max-w-2xl mx-auto mb-12">
                <input
                    type="text"
                    placeholder="Search by title, style, or material..."
                    className="w-full px-6 py-4 rounded-3xl border border-slate-300 focus:outline-none focus:border-indigo-500 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTiles.map((tile) => (
                    <div key={tile.id} className="tile-card bg-white rounded-3xl overflow-hidden shadow-lg">
                        <div className="relative h-64">
                            <img
                                src={tile.image}
                                alt={tile.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="font-semibold text-xl mb-2">{tile.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{tile.description}</p>

                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-indigo-600">${tile.price}</span>
                                <Link
                                    href={`/tile/${tile.id}`}
                                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-indigo-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTiles.length === 0 && (
                <p className="text-center text-xl text-slate-500 py-20">No tiles found matching your search.</p>
            )}
        </div>
    );
}