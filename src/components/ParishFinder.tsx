"use client";

import { MapPin, Search } from "lucide-react";

export default function ParishFinder() {
    return (
        <section className="py-20 px-6 bg-white dark:bg-slate-950">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-10">
                    <span className="text-faith-teal font-bold tracking-wider uppercase text-sm">Parish Locator</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">Find a Tribe Near You</h2>
                </div>

                {/* Search Widget floating over map placeholder */}
                <div className="relative w-full h-[400px] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">

                    {/* Map Placeholder Graphic */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center" />

                    <div className="relative z-10 w-full max-w-lg px-4">
                        <div className="flex shadow-2xl rounded-2xl overflow-hidden">
                            <div className="bg-white flex-1 flex items-center px-4 py-4">
                                <Search className="w-5 h-5 text-slate-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Enter your area (e.g., Ikorodu, Lagos)..."
                                    className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                            <button className="bg-faith-teal hover:bg-teal-700 text-white font-bold px-6 py-4 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
