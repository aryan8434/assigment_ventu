const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    try {
        console.log("Attempting to connect to Groq API...");
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say hello' }],
            model: 'llama3-8b-8192',
        });
        console.log("Success:", completion.choices[0]?.message?.content);
    } catch (error) {
        console.error("Error connecting to Groq:", error);
    }
}

main();
