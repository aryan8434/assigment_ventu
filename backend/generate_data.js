const fs = require('fs');
const { faker } = require('@faker-js/faker');
const Groq = require('groq-sdk');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const NUM_CANDIDATES = 10; // Reduce to 10 for demo speed
const OUTPUT_FILE = 'dummy_data.json';
const SQL_OUTPUT_FILE = 'insert_data.sql';

const groq = new Groq({ apiKey: GROQ_API_KEY });

const skillsList = [
  'Lean Manufacturing', 'Six Sigma', 'OSHA Safety', 'Waste Management',
  'Team Leadership', 'Conflict Resolution', 'Supply Chain Optimization',
  'Sustainability Reporting', 'Equipment Maintenance', 'Data Analysis'
];

function generateCandidate(id) {
  const numSkills = faker.number.int({ min: 3, max: 6 });
  const candidateSkills = faker.helpers.arrayElements(skillsList, numSkills);
    
  return {
    id: id,
    name: faker.person.fullName(),
    experience_years: faker.number.int({ min: 2, max: 20 }),
    skills: candidateSkills,
    bio: faker.person.bio(),
    avatar: faker.image.avatar()
  };
}

async function generateEvaluation(candidate) {
  const crisis_score = faker.number.int({ min: 1, max: 10 });
  const sustainability_score = faker.number.int({ min: 1, max: 10 });
  const motivation_score = faker.number.int({ min: 40, max: 100 });

  let ai_feedback = "AI feedback unavailable.";
  
  try {
      const prompt = `
      Evaluate this candidate for a Recycling Production Line Manager role.
      Name: ${candidate.name}
      Experience: ${candidate.experience_years} years
      Skills: ${candidate.skills.join(', ')}
      Scores: Crisis Management: ${crisis_score}/10, Sustainability: ${sustainability_score}/10, Motivation: ${motivation_score}/100.
      
      Provide a 1-sentence executive summary of their suitability.
      `;

      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-8b-instant',
      });
      ai_feedback = completion.choices[0]?.message?.content || ai_feedback;
  } catch (error) {
      console.error("Groq API Error:", error.message);
  }

  // Small delay to be nice to rate limits
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    candidate_id: candidate.id,
    crisis_score,
    sustainability_score,
    motivation_score,
    ai_feedback
  };
}

async function main() {
    const candidates = [];
    const evaluations = [];
    const rankings = [];

    console.log(`Generating data for ${NUM_CANDIDATES} candidates using Groq API...`);

    // Generate Data
    for (let i = 1; i <= NUM_CANDIDATES; i++) {
        const candidate = generateCandidate(i);
        candidates.push(candidate);

        // Async evaluation with Groq
        const evaluation = await generateEvaluation(candidate);
        evaluations.push(evaluation);

        // Calculate simple weighted total score for ranking
        const totalScore = (
            (evaluation.crisis_score * 3) + 
            (evaluation.sustainability_score * 3) + 
            (evaluation.motivation_score * 0.4)
        ).toFixed(2);

        rankings.push({
            candidate_id: i,
            total_score: parseFloat(totalScore),
            candidate_name: candidate.name,
            rank: 0, 
            ...evaluation 
        });
        
        process.stdout.write('.'); 
    }

    console.log('\nSorting rankings...');

    // Sort Rankings
    rankings.sort((a, b) => b.total_score - a.total_score);
    rankings.forEach((r, index) => r.rank = index + 1);

    // Output JSON for Frontend
    const fullData = {
        candidates,
        evaluations,
        rankings
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fullData, null, 2));
    console.log(`\nGenerated ${NUM_CANDIDATES} candidates in ${OUTPUT_FILE}`);

    // Output SQL for Database
    let sqlContent = `USE recycling_manager_db;\n\n`;

    // Insert Candidates
    sqlContent += `-- Candidates\n`;
    candidates.forEach(c => {
        const skillsStr = JSON.stringify(c.skills);
        const bio = c.bio.replace(/'/g, "''"); 
        sqlContent += `INSERT INTO candidates (id, name, experience_years, skills, bio) VALUES (${c.id}, '${c.name.replace(/'/g, "''")}', ${c.experience_years}, '${skillsStr}', '${bio}');\n`;
    });

    // Insert Evaluations
    sqlContent += `\n-- Evaluations\n`;
    evaluations.forEach(e => {
        // Sanitize newlines for SQL
        const cleanFeedback = e.ai_feedback.replace(/'/g, "''").replace(/\n/g, " ");
        sqlContent += `INSERT INTO evaluations (candidate_id, crisis_score, sustainability_score, motivation_score, ai_feedback) VALUES (${e.candidate_id}, ${e.crisis_score}, ${e.sustainability_score}, ${e.motivation_score}, '${cleanFeedback}');\n`;
    });

    // Insert Rankings
    sqlContent += `\n-- Rankings\n`;
    rankings.forEach(r => {
        sqlContent += `INSERT INTO rankings (candidate_id, total_score, rank_position) VALUES (${r.candidate_id}, ${r.total_score}, ${r.rank});\n`;
    });

    fs.writeFileSync(SQL_OUTPUT_FILE, sqlContent);
    console.log(`Generated SQL insert statements in ${SQL_OUTPUT_FILE}`);
}

main();
