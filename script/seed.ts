import "dotenv/config";
import { storage } from "../server/storage";
import { POST_TYPES } from "@shared/schema";

function log(message: string) {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [seed] ${message}`);
}

async function seedDatabase() {
    log("Seeding database...");
    const existingBeliefs = await storage.getBeliefs();
    if (existingBeliefs.length === 0) {
        // Seed Beliefs
        const beliefs = [
            "Most startups fail because they copy.",
            "AI products fail because they lack systems thinking.",
            "Simplicity is seniority.",
            "Engineers should understand business."
        ];
        for (const [index, content] of beliefs.entries()) {
            await storage.createBelief({ content, order: index });
        }
        log("Seeded Beliefs");

        // Seed Now Updates
        const nows = [
            "Building Kue v2 architecture.",
            "Studying multi-agent AI systems.",
            "Thinking about notification intelligence at scale."
        ];
        for (const content of nows) {
            await storage.createNowUpdate({ content });
        }
        log("Seeded Now Updates");

        // Seed Posts (Thinking)
        await storage.createPost({
            slug: "software-should-think",
            title: "Software should think before it speaks",
            content: `The era of dumb input/output is over. 

We are moving into an era where software needs to have agency. It needs to understand context before it acts. 

When you build systems today, you are not just building pipelines. You are building decision engines.`,
            type: POST_TYPES.THINKING
        });

        await storage.createPost({
            slug: "ai-is-architecture",
            title: "AI is not magic. It's architecture.",
            content: `Too many people treat LLMs as a magic box. You put a prompt in, you get gold out.

Real engineering is about the piping around the model. How do you handle failure? How do you manage context? How do you ensure determinism in a probabilistic system?

That is where the value lies.`,
            type: POST_TYPES.THINKING
        });
        log("Seeded Thinking Posts");

        // Seed Posts (Kue)
        await storage.createPost({
            slug: "why-kue-exists",
            title: "Why Kue Exists",
            content: `Kue exists because notifications are broken.

We are bombarded with noise. Our attention is fragmented.

Kue is an attempt to restore order. To build a layer of intelligence between you and the noise.`,
            type: POST_TYPES.KUE
        });
        log("Seeded Kue Posts");
    } else {
        log("Database already seeded");
    }
}

// Run seed
(async () => {
    try {
        await seedDatabase();
        log("Seeding completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
})();
