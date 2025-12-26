"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-deep-slate flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-60"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    {/* Fallback image if video fails or is loading could go here */}
                </video>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-slate via-transparent to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight drop-shadow-lg">
                        Welcome Home, <span className="text-faith-teal">Faith Tribe</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-off-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
                        Connect, Grow, and Serve with a community that believes in you.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        {/* Primary CTA */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-youth-orange text-deep-slate font-bold rounded-full text-lg shadow-xl shadow-youth-orange/20 hover:shadow-youth-orange/40 transition-all flex items-center gap-2"
                        >
                            Plan Your Visit
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        {/* Secondary CTA */}
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg backdrop-blur-sm flex items-center gap-2 hover:border-faith-teal hover:text-faith-teal transition-all"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            Watch Online
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
