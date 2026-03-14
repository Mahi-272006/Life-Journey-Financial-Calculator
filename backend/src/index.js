import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'life_journey_db',
});

// Test the connection immediately on startup
pool.getConnection()
  .then(() => console.log("✅ MySQL Connected Successfully"))
  .catch(err => console.error("❌ MySQL Connection Failed:", err.message));

app.post('/api/sessions', async (req, res) => {
  try {
    // Log exactly what the frontend sent
    console.log("📥 Incoming Data:", req.body);

    const { goalType, targetAmount, requiredSip } = req.body;

    // Use the exact column names from your SQL table
    const [result] = await pool.execute(
      'INSERT INTO sessions (goal_type, target_amount, required_sip) VALUES (?, ?, ?)',
      [goalType, targetAmount, requiredSip]
    );
    
    console.log("✅ Data saved to DB, ID:", result.insertId);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    // This will print the EXACT reason for the 500 error in your terminal
    console.error("❌ DATABASE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});