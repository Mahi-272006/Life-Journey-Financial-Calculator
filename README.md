# Life Journey Financial Calculator

An interactive financial planning tool that transforms traditional financial calculators into a **simple life-journey experience**.

Instead of using multiple calculators (SIP, Retirement, Goal Planning, etc.), this project provides **one guided flow** that automatically combines all calculations.

Users answer a few simple questions and the calculator automatically handles:

- SIP Growth  
- Step-Up SIP  
- Goal Planning  
- Retirement Planning  
- Inflation Impact  
- Investment Growth Visualization  

The goal of this project is to make financial planning **simple, intuitive, and educational**.

---

# Project Idea

Traditional investment calculators are often complicated and disconnected.

This project introduces a **Life Journey approach** where financial planning happens through a guided experience rather than separate tools.

The user answers a few questions and the calculator builds a **complete financial projection**.

---

# User Flow

## Step 1 — Choose Your Goal

The user selects a financial goal.

- Buy a House  
- Education  
- Travel  
- Retirement  
- Build Wealth  

This step determines the financial context of the journey.

---

## Step 2 — Basic Information

The user enters only a few inputs:

- Current Age  
- Monthly Investment Capacity  
- Goal Age / Retirement Age  
- Expected Return  

This keeps the interface minimal and accessible.

---

## Step 3 — Lifestyle Choice

The user selects their lifestyle preference.

- 🟢 Simple  
- 🟡 Comfortable  
- 🔴 Luxury  

This automatically adjusts the **inflation assumption**, which affects future goal cost and retirement requirements.

### Example Mapping

| Lifestyle | Inflation |
|-----------|-----------|
| Simple | 5% |
| Comfortable | 6% |
| Luxury | 8% |

---

## Step 4 — Income Growth

Users can enable a **Step-Up SIP option**.

If enabled:

- SIP increases annually  
- User selects yearly increase percentage  

This simulates **income growth over time**.

---

## Step 5 — Financial Visualization

Instead of showing only numbers, the tool displays a **growth timeline**.

Example:

```
Age 25 → ₹1L invested  
Age 30 → ₹6L invested  
Age 40 → ₹30L value  
Age 60 → ₹1.2Cr corpus
```

This visually demonstrates:

- Compounding  
- Investment growth  
- Inflation impact  

---

# Financial Formulas Used

The calculations follow **industry-standard financial formulas**.

---

## SIP Future Value Formula

Used to calculate investment growth.

```
FV = P × [((1 + r)^n − 1) / r] × (1 + r)
```

Where:

- **P** = Monthly Investment  
- **r** = Monthly Return Rate  
- **n** = Total Months  

---

## Goal Inflation Adjustment

Future goal cost is calculated using inflation.

```
Future Value = Present Cost × (1 + Inflation)^Years
```

---

## Required SIP for Goal

To reach a financial goal, required SIP is calculated as:

```
Required SIP = FV × r / [((1 + r)^n − 1) × (1 + r)]
```

Where:

- **FV** = Inflated Goal Value  
- **r** = Monthly Return  
- **n** = Total Months  

---

## Step-Up SIP Logic

If the user enables step-up SIP:

```
New SIP = Previous SIP × (1 + Top-Up Rate)
```

Each year's SIP contribution increases based on income growth.

---

# Tech Stack

### Frontend

- Next.js  
- React  
- Tailwind CSS  
- Recharts (for visualization)

### Backend

- Node.js  
- Express.js  

### Database

- MySQL  

### Package Manager

- NPM  

---

# Project Architecture

```
frontend/
 └── src/
     ├── app/
     │   └── page.jsx
     ├── components/
     │   ├── WizardSteps.jsx
     │   └── ResultsView.jsx
     └── hooks/
         └── use-calculator.js

backend/
 └── src/
     └── index.js
```

---

# Database Setup

Before running the project, create the database.

## Create Database

```sql
CREATE DATABASE life_journey_db;
```

## Use Database

```sql
USE life_journey_db;
```

## Create Sessions Table

```sql
CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  goal_type VARCHAR(50),
  current_age INT,
  target_age INT,
  monthly_capacity DECIMAL(12,2),
  expected_return DECIMAL(5,2),
  inflation DECIMAL(5,2),
  lifestyle VARCHAR(50),
  topup_enabled BOOLEAN,
  topup_percent DECIMAL(5,2),
  future_goal_cost DECIMAL(15,2),
  required_sip DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```
backend/.env
```

Example format:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=life_journey_db
PORT=5001
```

⚠️ **Important:** `.env` files should not be committed to GitHub.

---

# Installation

## Clone the repository

```bash
git clone <repository-url>
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Install Backend Dependencies

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5001
```

---

# Compliance & Disclaimer

This tool has been designed **for informational purposes only**.

Actual results may vary depending on various factors involved in capital markets.

This calculator **does not recommend any specific investment scheme** and is intended solely for **financial education purposes**.

---

# Hackathon Context

This project was developed as part of the **FinCal Innovation Hackathon**.

The objective of the hackathon is to encourage the development of **interactive financial calculators that simplify investment concepts for investors**.

---

# Key Highlights

- Guided financial journey experience  
- Combines multiple financial calculators into one flow  
- Interactive financial visualization  
- Step-Up SIP simulation  
- Inflation-adjusted goal planning  
- Full stack implementation (Next.js + Node.js + MySQL)

---

# Future Improvements

- Multiple goal planning  
- Tax impact modeling  
- Financial independence age prediction  
- Portfolio allocation suggestions
