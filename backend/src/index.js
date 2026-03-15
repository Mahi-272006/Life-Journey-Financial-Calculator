import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "life_journey_db",
});

pool.getConnection()
  .then(() => console.log("✅ MySQL Connected"))
  .catch((err) => console.error("❌ DB Error:", err.message));

app.post("/api/sessions", async (req, res) => {
  try {
    const {
      goalType,
      currentAge,
      targetAge,
      monthlyCapacity,
      expectedReturn,
      inflation,
      lifestyle,
      topUpEnabled,
      topUpPercent,
      futureGoalCost,
      requiredSip,
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO sessions 
      (goal_type,current_age,target_age,monthly_capacity,
      expected_return,inflation,lifestyle,topup_enabled,
      topup_percent,future_goal_cost,required_sip)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        goalType,
        currentAge,
        targetAge,
        monthlyCapacity,
        expectedReturn,
        inflation,
        lifestyle,
        topUpEnabled,
        topUpPercent,
        futureGoalCost,
        requiredSip,
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
