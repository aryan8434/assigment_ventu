# AI Prompts for Recycling Production Line Manager Selection

This document contains the prompts used to evaluate candidates for the Recycling Production Line Manager role. These prompts are designed to be used with an LLM (Large Language Model) to generate scores and feedback based on candidate profiles.

## 1. Crisis Management Evaluation Prompt

**Goal:** Evaluate the candidate's ability to handle high-pressure situations, equipment failures, and safety incidents in a recycling facility.

**Prompt:**

```markdown
You are an expert HR evaluator for a Recycling Production Line Manager role.
A candidate has the following profile:
- **Name:** {Candidate Name}
- **Experience:** {Years of Experience} years
- **Skills:** {List of Skills}
- **Bio:** {Candidate Bio/Description}

**Scenario:**
"During a busy shift, the main sorting conveyor belt jams, causing a pile-up of recyclable materials. Simultaneously, a worker reports a potential safety hazard involving a minor chemical spill near the loading dock. How would you prioritize and handle this situation?"

**Task:**
Based on the candidate's profile and the scenario, evaluate their potential response.
Provide a JSON response with:
1.  `score`: A score from 1-10 (10 being excellent).
2.  `reasoning`: A brief explanation of the score (max 50 words).

**Output Format:**
{
  "score": <number>,
  "reasoning": "<string>"
}
```

## 2. Sustainability Knowledge Evaluation Prompt

**Goal:** Assess the candidate's understanding of recycling processes, environmental regulations, and sustainable practices.

**Prompt:**

```markdown
You are a Sustainability Officer evaluating a candidate for a Production Manager position.
Candidate Profile:
- **Name:** {Candidate Name}
- **Experience:** {Years of Experience} years
- **Skills:** {List of Skills}

**Question:**
"Describe your approach to minimizing contamination in the recycling stream and ensuring compliance with local environmental regulations. How do you stay updated on the latest sustainability trends?"

**Task:**
Analyze the candidate's profile (specifically their skills and experience) to determine their likely level of expertise.
Provide a JSON response with:
1.  `score`: A score from 1-10.
2.  `allow`: Boolean (true if score > 5, else false).
3.  `feedback`: Constructive feedback on their sustainability knowledge.

**Output Format:**
{
  "score": <number>,
  "allow": <boolean>,
  "feedback": "<string>"
}
```

## 3. Team Motivation Evaluation Prompt

**Goal:** Gauge the candidate's leadership style and ability to motivate a diverse team in a demanding work environment.

**Prompt:**

```markdown
You are a Senior Leadership Consultant.
Candidate: {Candidate Name}
Bio: {Candidate Bio}

**Scenario:**
"Productivity has dropped by 15% over the last month due to low morale and fatigue among the staff. You notice distinct cliques forming and communication breaking down between shifts. What specific actions would you take to restore morale and improve productivity?"

**Task:**
Predict the effectiveness of the candidate's leadership style based on their bio and experience.
Provide a JSON response with:
1.  `score`: A score from 10-100.
2.  `strengths`: List of top 2 leadership strengths.
3.  `weaknesses`: List of top 2 potential weaknesses.

**Output Format:**
{
  "score": <number>,
  "strengths": ["<strength1>", "<strength2>"],
  "weaknesses": ["<weakness1>", "<weakness2>"]
}
```
