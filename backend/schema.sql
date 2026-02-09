-- Database Schema for Recycling Production Line Manager Selection System

DROP DATABASE IF EXISTS recycling_manager_db;
CREATE DATABASE recycling_manager_db;
USE recycling_manager_db;

-- 1. Candidates Table
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    experience_years INT NOT NULL,
    skills TEXT NOT NULL, -- Storing JSON string or comma-separated list
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Evaluations Table
CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    crisis_score INT CHECK (crisis_score BETWEEN 1 AND 10),
    sustainability_score INT CHECK (sustainability_score BETWEEN 1 AND 10),
    motivation_score INT CHECK (motivation_score BETWEEN 1 AND 100),
    ai_feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- 3. Rankings Table
-- Note: In a real/larger system, this might be a view or calculated on the fly.
-- For this assignment, we'll keep it as a table updated by triggers or application logic.
CREATE TABLE rankings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    total_score DECIMAL(5, 2) NOT NULL,
    rank_position INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Optional: Trigger to update total_score in rankings when an evaluation is inserted/updated
-- Simple weighted average: 30% Crisis, 30% Sustainability, 40% Motivation (normalized to 10)
-- Motivation is 0-100, others 0-10.
-- Formula: (Crisis * 3) + (Sustainability * 3) + (Motivation * 0.4) = Max 100 (approx)
-- Or just sum them up if scales were aligned. Let's stick to the prompt's simplicity.
