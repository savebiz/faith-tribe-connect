import { databases, account } from "@/lib/appwrite";
import { APPWRITE_CONFIG } from "@/lib/config";
import { ID, Query } from "appwrite";
import { Question } from "@/components/Quiz/QuizCard";

export type Quiz = {
    $id: string;
    title: string;
    questions: Question[]; // Stored as JSON string in Appwrite, parsed in app
    is_active: boolean;
};

export const QuizService = {
    async getActiveQuiz(): Promise<Quiz | null> {
        try {
            const response = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_QUIZZES,
                [Query.equal("is_active", true), Query.limit(1)]
            );

            if (response.documents.length === 0) return null;

            const doc = response.documents[0];

            // Parse questions if they are stored as a JSON string
            let parsedQuestions: Question[] = [];
            if (typeof doc.questions === 'string') {
                parsedQuestions = JSON.parse(doc.questions);
            } else {
                parsedQuestions = doc.questions; // Assuming Appwrite might return it as object if configured
            }

            return {
                $id: doc.$id,
                title: doc.title,
                questions: parsedQuestions,
                is_active: doc.is_active,
            };
        } catch (error) {
            console.error("Failed to fetch quiz:", error);
            return null;
        }
    },

    async submitScore(quizId: string, score: number, totalPossible: number) {
        try {
            const user = await account.get();

            await databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_RESULTS,
                ID.unique(),
                {
                    user_id: user.$id,
                    user_name: user.name,
                    quiz_id: quizId,
                    score: score,
                    total_possible: totalPossible,
                    timestamp: new Date().toISOString(),
                }
            );
            return true;
        } catch (error) {
            console.error("Failed to submit score:", error);
            return false; // Could handle specific errors (e.g., duplicate submission)
        }
    },
};
