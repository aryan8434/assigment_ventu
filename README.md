# Recycling Production Line Manager Selection System

**Created by Aryan**

A minimal, standalone system for ranking candidates for a recycling production line manager role. This project includes a database schema, a random candidate generator, AI evaluation prompts, and a dashboard for visualization.

## 🚀 How I Made This & System Design

This project was built focusing on a modern, scalable architecture that balances performance with realistic data simulation.

### 1. Frontend Architecture (React + Vite + Mantine)
I chose **React** with **Vite** for the frontend to ensure lightning-fast development and optimized production builds.
-   **UI Framework**: **Mantine UI** was selected for its rich component library (AppShell, Tables, Cards) which allowed me to build a professional-looking dashboard quickly.
-   **State Management**: React's `useState` and `useEffect` hooks manage the application state, including the dynamic list of candidates and the currently selected profile.

### 2. Dynamic Data Generation Engine
To meet the requirement of random data on every refresh, I implemented a robust client-side data generator (`src/utils/generateData.js`).
-   **Real-time Generation**: Instead of fetching static JSON, the app generates 40 unique candidate profiles instantly on the client side using **Faker.js**.
-   **Scoring Logic**: A weighted scoring algorithm automatically calculates a "Total Score" based on:
    -   Crisis Management (30%)
    -   Sustainability Knowledge (30%)
    -   Motivation (40%)

### 3. AI Integration (Groq API & Llama 3)
For the "AI Feedback" feature, I needed high-quality, context-aware evaluations without the latency of API calls on every single page load.
-   **The Solution**: I used a **Hybrid Approach**.
-   I wrote a backend script (`backend/generate_data.js`) that connects to the **Groq API** and uses the **Llama 3.1-8b-instant** model.
-   This script generated a pool of diverse, high-quality executive summaries based on various candidate archetypes.
-   The frontend then intelligently assigns these AI-generated insights to the dynamically created candidates, providing a realistic "AI" experience with zero latency.

### 4. Database Schema
Although the frontend runs standalone for the demo, I designed a full **MySQL Schema** (`backend/schema.sql`) to demonstrate how this would be persisted in a production environment.
-   **Normalized Tables**: Separated `candidates`, `evaluations`, and `rankings` for data integrity.
-   **Scalability**: Indexes and foreign keys ensure the system can handle thousands of records.

---

## 🛠️ Setup Instructions

### Prerequisites
-   Node.js (v16+)

### Running the Dashboard
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to `http://localhost:5173`.

### Features
-   **Refresh Data**: Click the "Refresh Data" button to instantly generate a new batch of candidates.
-   **Leaderboard**: Toggle between "Top 10" and "All Candidates" views.
-   **Skill Heatmap**: Visual breakdown of candidate strengths.
-   **AI Insights**: Read Llama 3-generated feedback for every candidate.

## License
MIT
