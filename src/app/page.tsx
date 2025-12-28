import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ParishFinder from "@/components/ParishFinder";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <ParishFinder />

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-900 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
        <p>© {new Date().getFullYear()} Faith Tribe. All rights reserved.</p>
      </footer>
    </main>
  );
}
