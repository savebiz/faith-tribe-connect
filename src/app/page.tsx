import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ParishFinder from "@/components/ParishFinder";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <ParishFinder />

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-900 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-6">
        <div className="relative h-8 w-32 opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src="/faithTribeBlack.png"
            alt="Faith Tribe"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/faithTribeWhite.png"
            alt="Faith Tribe"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <p>© {new Date().getFullYear()} Faith Tribe. All rights reserved.</p>
      </footer>
    </main>
  );
}
