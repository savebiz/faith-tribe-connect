"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, PlayCircle } from "lucide-react";

export default function Hero() {
    className = "px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg backdrop-blur-sm flex items-center gap-2 hover:border-faith-teal hover:text-faith-teal transition-all"
        >
        <Play className="w-5 h-5 fill-current" />
                            Watch Online
                        </motion.button >
                    </div >
                </motion.div >
            </div >

        {/* Scroll Indicator */ }
        < motion.div
    initial = {{ opacity: 0 }
}
animate = {{ opacity: 1 }}
transition = {{ delay: 1, duration: 1 }}
className = "absolute bottom-8 left-1/2 -translate-x-1/2"
    >
    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
        <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
        />
    </div>
            </motion.div >
        </section >
    );
}
