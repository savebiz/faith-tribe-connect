"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizCard, { Question } from "./QuizCard";
import { Trophy, ArrowRight, RefreshCcw, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { QuizService, Quiz } from "@/services/quizService";

export default function QuizPlayer() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function loadQuiz() {
            try {
                const activeQuiz = await QuizService.getActiveQuiz();
                if (activeQuiz && activeQuiz.questions.length > 0) {
                    setQuiz(activeQuiz);
                } else {
                    setError("No active quiz found at the moment.");
                }
            } catch (err) {
                setError("Failed to load quiz. Please check your connection.");
            } finally {
                setLoading(false);
            }
        }
        loadQuiz();
    }, []);

    const handleAnswer = (index: number) => {
        if (!quiz) return;
        setSelectedAnswer(index);
        setShowResult(true);

        if (index === quiz.questions[currentIndex].correctIndex) {
            setScore((prev) => prev + 10);
        }
    };

    const nextQuestion = async () => {
        if (!quiz) return;

        if (currentIndex < quiz.questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            await finishQuiz();
        }
    };

    const finishQuiz = async () => {
        if (!quiz) return;
        setSubmitting(true);
        // Submit score silently or show loading? For now, we set finished state first.
        // In a real app, we might want to ensure submission succeeds before showing results,
        // or optimistically show results.
        await QuizService.submitScore(quiz.$id, score, quiz.questions.length * 10);
        setIsFinished(true);
        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                <Loader2 className="w-10 h-10 animate-spin text-faith-teal mb-4" />
                <p>Loading your challenge...</p>
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white/50 space-y-4">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <p className="text-xl font-medium">{error || "Quiz not found."}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentIndex];

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <div className="absolute inset-0 bg-youth-orange/30 rounded-full blur-3xl" />
                    <Trophy className="w-32 h-32 text-youth-orange relative z-10 drop-shadow-lg" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-white">Quiz Complete!</h2>
                    <p className="text-xl text-white/60">You scored</p>
                    <div className="text-6xl font-black text-faith-teal drop-shadow-glow">
                        {score} <span className="text-2xl text-white/40 font-bold">/ {quiz.questions.length * 10}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 rounded-full bg-faith-teal text-deep-slate font-bold flex items-center gap-2 hover:bg-faith-teal/90 transition-colors shadow-lg shadow-faith-teal/20"
                    >
                        Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full mb-8 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
                    className="h-full bg-linear-to-r from-faith-teal to-youth-orange"
                />
            </div>

            <div className="flex justify-between text-white/50 text-sm font-medium mb-4 px-2">
                <span>Question {currentIndex + 1} of {quiz.questions.length}</span>
                <span>Score: {score}</span>
            </div>

            <AnimatePresence mode="wait">
                <QuizCard
                    key={currentIndex}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    selectedAnswer={selectedAnswer}
                    showResult={showResult}
                />
            </AnimatePresence>

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex justify-center mt-8"
                    >
                        <button
                            onClick={nextQuestion}
                            disabled={submitting}
                            className="px-8 py-4 bg-white text-deep-slate font-bold rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                        >
                            {submitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : currentIndex === quiz.questions.length - 1 ? (
                                "Finish Quiz"
                            ) : (
                                "Next Question"
                            )}
                            {!submitting && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
