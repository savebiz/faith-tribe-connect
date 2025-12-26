import { Client, Databases, Permission, Role } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

const client = new Client();

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "faith-tribe-core";
const API_KEY = process.env.APPWRITE_API_KEY;

if (!API_KEY) {
    console.error("❌ Error: APPWRITE_API_KEY is missing in .env");
    process.exit(1);
}

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

const DB_ID = "faith-tribe-db";
const COLL_QUIZZES = "quizzes";
const COLL_RESULTS = "results";

async function setup() {
    console.log("🚀 Starting Faith Tribe Database Setup...");

    // 1. Create Database
    try {
        await databases.create(DB_ID, "Faith Tribe Database");
        console.log(`✅ Database '${DB_ID}' created.`);
    } catch (err) {
        console.log(`ℹ️ Database '${DB_ID}' might already exist:`, err.message);
    }

    // 2. Create Quizzes Collection
    try {
        await databases.createCollection(DB_ID, COLL_QUIZZES, "Quizzes", [
            Permission.read(Role.any()), // Public Read (or Users)
            Permission.read(Role.users()),
        ]);
        console.log(`✅ Collection '${COLL_QUIZZES}' created.`);
    } catch (err) {
        console.log(`ℹ️ Collection '${COLL_QUIZZES}' might already exist:`, err.message);
    }

    // 3. Create Quizzes Attributes
    try {
        await databases.createStringAttribute(DB_ID, COLL_QUIZZES, "title", 255, true);
        await databases.createStringAttribute(DB_ID, COLL_QUIZZES, "questions", 10000, true);
        await databases.createBooleanAttribute(DB_ID, COLL_QUIZZES, "is_active", true);
        console.log("✅ Quizzes attributes created.");
    } catch (err) {
        console.log("ℹ️ Quizzes attributes might already exist.");
    }

    // 4. Create Results Collection
    try {
        // Permissions: Create (Users), Read (Users)
        // Note: In real app, might want users to only read their own. 
        // Role.users() allows all logged-in users to read all docs if permission is on collection.
        // Better to set document-level permissions, but for MVP collection level is okay or we set it later.
        await databases.createCollection(DB_ID, COLL_RESULTS, "Results", [
            Permission.create(Role.users()),
            Permission.read(Role.users()),
        ]);
        console.log(`✅ Collection '${COLL_RESULTS}' created.`);
    } catch (err) {
        console.log(`ℹ️ Collection '${COLL_RESULTS}' might already exist:`, err.message);
    }

    // 5. Create Results Attributes
    try {
        await databases.createStringAttribute(DB_ID, COLL_RESULTS, "user_id", 255, true);
        await databases.createStringAttribute(DB_ID, COLL_RESULTS, "user_name", 255, true);
        await databases.createStringAttribute(DB_ID, COLL_RESULTS, "quiz_id", 255, true);
        await databases.createIntegerAttribute(DB_ID, COLL_RESULTS, "score", true);
        await databases.createIntegerAttribute(DB_ID, COLL_RESULTS, "total_possible", true);
        await databases.createStringAttribute(DB_ID, COLL_RESULTS, "timestamp", 255, true);
        console.log("✅ Results attributes created.");
    } catch (err) {
        console.log("ℹ️ Results attributes might already exist.");
    }

    // 6. Seed Sample Quiz
    console.log("🌱 Seeding sample quiz...");
    // Wait a bit for attributes to be processed by Appwrite (can take a second)
    await new Promise(r => setTimeout(r, 2000));

    const sampleQuestions = [
        {
            id: "1",
            text: "Who led the Israelites across the Red Sea?",
            options: ["Joshua", "Moses", "Aaron", "David"],
            correctIndex: 1,
        },
        {
            id: "2",
            text: "What is the collective name for Sunday School in RCCG?",
            options: ["Junior Church", "Zeal", "Teens Church", "Faith Club"],
            correctIndex: 0,
        },
        {
            id: "3",
            text: "The 'G' in RCCG stands for...",
            options: ["Gospel", "God", "General", "Glory"],
            correctIndex: 1,
        },
    ];

    try {
        // Check if any quiz exists to avoid duplicates
        const existing = await databases.listDocuments(DB_ID, COLL_QUIZZES);
        if (existing.total === 0) {
            await databases.createDocument(DB_ID, COLL_QUIZZES, "unique()", {
                title: "Faith Tribe Origins",
                questions: JSON.stringify(sampleQuestions),
                is_active: true
            });
            console.log("✅ Sample quiz created.");
        } else {
            console.log("ℹ️ Quizzes already exist, skipping seed.");
        }
    } catch (err) {
        console.error("❌ Failed to seed quiz:", err.message);
    }

    console.log("\n🎉 Setup Complete!");
    console.log("--------------------------------");
    console.log(`Database ID: ${DB_ID}`);
    console.log(`Quizzes Collection ID: ${COLL_QUIZZES}`);
    console.log(`Results Collection ID: ${COLL_RESULTS}`);
    console.log("--------------------------------");
}

setup();
