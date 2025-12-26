export const APPWRITE_CONFIG = {
    ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
    PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "faith-tribe-core",
    DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "faith-tribe-db",
    COLLECTION_QUIZZES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_QUIZZES || "quizzes",
    COLLECTION_RESULTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RESULTS || "results",
};
