"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" /> {/* Contrast Overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                >
                    {/* Placeholder URL as requested */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-partying-happily-4640-large.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center text-white flex flex-col items-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
                >
                    Welcome Home, Faith Tribe.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-2xl font-medium text-slate-200 mb-10 max-w-2xl"
                >
                    Raising a Generation Rooted in Faith and Excellence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/join"
                        className="px-8 py-4 bg-white text-black font-bold text-lg rounded-2xl hover:bg-slate-100 transition-colors"
                    >
                        Find Your Tribe
                    </Link>
                    <Link
                        href="/media"
                        className="px-8 py-4 bg-transparent border border-white text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Watch Online
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
