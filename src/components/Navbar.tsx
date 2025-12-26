"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Watch Live", href: "/live", isLive: true },
        { name: "Media", href: "/media" },
        { name: "Locations", href: "/locations" },
        { name: "Give", href: "/give" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-xs py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className={`font-black tracking-tighter text-2xl ${isScrolled ? "text-deep-slate" : "text-white"}`}>
                    FAITHTRIBE
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-2 transition-colors ${isScrolled ? "text-deep-slate hover:text-faith-teal" : "text-white/80 hover:text-white"
                                }`}
                        >
                            {link.name}
                            {link.isLive && (
                                <span className="bg-red-600 text-[10px] text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                                    Live
                                </span>
                            )}
                        </Link>
                    ))}

                    {/* Avatar / Login */}
                    <Link href="/login" className={`p-2 rounded-full transition-colors ${isScrolled ? "bg-slate-100 text-deep-slate hover:bg-slate-200" : "bg-white/10 text-white hover:bg-white/20"
                        }`}>
                        <User className="w-5 h-5" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className={`md:hidden ${isScrolled ? "text-deep-slate" : "text-white"}`}
                >
                    <Menu className="w-7 h-7" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-black text-2xl text-deep-slate">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-deep-slate">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 text-2xl font-black text-deep-slate">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-faith-teal transition-colors"
                                >
                                    {link.name} {link.isLive && <span className="text-red-500 text-sm align-middle ml-2">● LIVE</span>}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-faith-teal transition-colors"
                            >
                                Log In
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
