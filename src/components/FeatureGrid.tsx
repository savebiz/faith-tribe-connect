"use client";

import { motion } from "framer-motion";
import { HandHeart, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function FeatureGrid() {
    const features = [
        {
            title: "Who We Are",
            desc: "A family of 6,000+ teens across Region 63.",
            icon: Users,
            bgClass: "bg-faith-teal",
            href: "/about"
        },
        {
            title: "Need Prayer?",
            desc: "Connect with a mentor privately.",
            icon: HandHeart,
            bgClass: "bg-youth-orange",
            href: "/prayer"
        },
        {
            title: "Word Champ",
            desc: "Compete in this week's Bible Quiz.",
            icon: Trophy,
            bgClass: "bg-slate-800",
            href: "/quiz"
        }
    ];

    return (
        <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Link href={feature.href} className="block h-full">
                                <div className={`h-full p-8 rounded-2xl ${feature.bgClass} text-white shadow-xl hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between min-h-[250px]`}>
                                    <div>
                                        <feature.icon className="w-10 h-10 mb-4 opacity-80" />
                                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-white/80 font-medium">{feature.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
