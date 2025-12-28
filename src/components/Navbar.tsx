"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLive = true; // This would come from props or state in a real app

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Digital Tabernacle", href: "/media" },
        { name: "Word Champ", href: "/quiz" },
        { name: "The Squad", href: "/volunteer" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className={`font-bold tracking-tight text-xl md:text-2xl ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"}`}
                >
                    FAITH TRIBE
                </Link>

                {/* Desktop Links - Centered */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-faith-teal ${isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white/90"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Action */}
                <div className="hidden md:flex items-center gap-4">
                    {isLive && (
                        <Link
                            href="/live"
                            className="flex items-center gap-2 px-4 py-2 bg-youtube-red hover:bg-red-600 text-white text-xs font-bold rounded-full transition-all animate-pulse shadow-lg shadow-red-500/20"
                            style={{ backgroundColor: '#ef4444' }} // Tailwin red-500
                        >
                            <Radio className="w-4 h-4" />
                            LIVE
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className={`md:hidden ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"}`}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-bold text-xl text-slate-900 dark:text-white">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-6 h-6 text-slate-900 dark:text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-slate-900 dark:text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isLive && (
                                <Link
                                    href="/live"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl"
                                >
                                    <Radio className="w-4 h-4" />
                                    WATCH LIVE
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
