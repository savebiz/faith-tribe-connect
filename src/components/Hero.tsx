"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, PlayCircle } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center">
            {/* Background Video with refined overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full scale-105"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                {/* Cinematic Gradient Overlay - Blue/Teal Vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-deep-slate/90 via-deep-slate/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-deep-slate via-transparent to-deep-slate/30" />
            </div>

            {/* Hero Content - Left Aligned */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm font-bold tracking-widest uppercase text-white">Welcome Home</span>
                    </div>

                    {/* Headline - Massive & Geometric */}
                    <h1 className="text-7xl md:text-9xl font-black text-white leading-tighter tracking-tight mb-8 drop-shadow-2xl">
                        FIND YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-faith-teal to-youth-orange">
                            FRESH START.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-white/80 font-medium mb-10 max-w-xl leading-relaxed">
                        A place to belong, grow, and make a difference. Join us this week for an experience that changes everything.
                    </p>

                    {/* Call to Actions - Pill Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <Link
                            href="/visit"
                            className="group px-10 py-5 bg-white text-deep-slate rounded-full font-black text-lg tracking-wide hover:scale-105 transition-all shadow-xl shadow-white/10 flex items-center gap-3"
                        >
                            Plan Your Visit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/live"
                            className="group px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg tracking-wide hover:bg-white/20 transition-all flex items-center gap-3"
                        >
                            <PlayCircle className="w-6 h-6" />
                            Watch Online
                        </Link>
                    </div>

                    {/* Location Finder Teaser */}
                    <div className="mt-12 flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer group">
                        <MapPin className="w-5 h-5 group-hover:text-faith-teal transition-colors" />
                        <span className="font-semibold underline decoration-white/30 underline-offset-4 group-hover:decoration-faith-teal">Find a location near you</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
