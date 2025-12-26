import QuizPlayer from "@/components/Quiz/QuizPlayer";

export default function QuizPage() {
    return (
        <main className="min-h-screen bg-deep-slate flex flex-col items-center justify-center p-4 selection:bg-youth-orange selection:text-deep-slate">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-deep-slate via-deep-slate to-black pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            <div className="relative z-10 w-full">
                <header className="text-center mb-10 space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase italic">
                        Word <span className="text-transparent bg-clip-text bg-linear-to-r from-faith-teal to-youth-orange">Champ</span>
                    </h1>
                    <p className="text-white/60 font-medium">Test your knowledge. Top the leaderboard.</p>
                </header>

                <QuizPlayer />
            </div>
        </main>
    );
}
