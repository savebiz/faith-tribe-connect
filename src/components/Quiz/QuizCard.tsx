"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { clsx } from "clsx";

export type Question = {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
};

interface QuizCardProps {
    question: Question;
    onAnswer: (index: number) => void;
    selectedAnswer: number | null;
    showResult: boolean;
}

export default function QuizCard({
    question,
    onAnswer,
    selectedAnswer,
    showResult,
}: QuizCardProps) {
    return (
        <div className="w-full max-w-lg mx-auto p-4 perspective-1000">
            <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white dark:bg-deep-slate border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Question Header */}
                <div className="bg-faith-teal/10 p-8 text-center border-b border-white/5">
                    <h3 className="text-2xl md:text-3xl font-bold text-deep-slate dark:text-white leading-tight">
                        {question.text}
                    </h3>
                </div>

                {/* Options Grid */}
                <div className="p-6 grid gap-4">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === question.correctIndex;

                        // Determine styling based on state
                        let buttonStyle = "bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border-white/20";
                        if (showResult) {
                            if (isCorrect) buttonStyle = "bg-green-500 border-green-600 text-white";
                            else if (isSelected && !isCorrect) buttonStyle = "bg-red-500 border-red-600 text-white";
                            else buttonStyle = "opacity-50 dark:bg-white/5";
                        } else if (isSelected) {
                            buttonStyle = "bg-faith-teal border-faith-teal text-white ring-2 ring-faith-teal/50";
                        }

                        return (
                            <motion.button
                                key={index}
                                whileHover={!showResult ? { scale: 1.02 } : {}}
                                whileTap={!showResult ? { scale: 0.98 } : {}}
                                onClick={() => !showResult && onAnswer(index)}
                                disabled={showResult}
                                className={clsx(
                                    "relative w-full p-6 text-lg font-semibold text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between",
                                    buttonStyle
                                )}
                            >
                                <span>{option}</span>
                                {showResult && isCorrect && <Check className="w-6 h-6" />}
                                {showResult && isSelected && !isCorrect && <X className="w-6 h-6" />}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
