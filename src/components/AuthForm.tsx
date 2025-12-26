"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

interface AuthFormProps {
    mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (mode === "signup") {
                await account.create(ID.unique(), email, password, name);
                // Auto login after signup
                await account.createEmailPasswordSession(email, password);
            } else {
                await account.createEmailPasswordSession(email, password);
            }

            router.push("/dashboard"); // Redirect to dashboard after success
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden"
        >
            {/* Decorative Gradient Blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-faith-teal/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-youth-orange/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    {mode === "login" ? "Welcome Back" : "Join the Tribe"}
                </h2>
                <p className="text-white/60 text-center mb-8">
                    {mode === "login"
                        ? "Sign in to access your dashboard"
                        : "Start your journey today"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && (
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-white/80 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-deep-slate/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-faith-teal/50 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-deep-slate/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-faith-teal/50 transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-white/80 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-deep-slate/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-faith-teal/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        className="w-full py-3.5 bg-gradient-to-r from-faith-teal to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-faith-teal/20 flex items-center justify-center gap-2 hover:shadow-faith-teal/40 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {mode === "login" ? "Sign In" : "Create Account"}
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-6 text-center text-white/60 text-sm">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <Link
                        href={mode === "login" ? "/signup" : "/login"}
                        className="text-faith-teal font-medium hover:underline"
                    >
                        {mode === "login" ? "Sign up" : "Log in"}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
