# ⚡ StandupSync — Team Standup Logger

> A lightweight internal tool for async daily standups — post updates, see your team's activity live, and monitor productivity trends on a dashboard.

![StandupSync Feed](./client/syncUp/src/assets/Screenshot%202026-06-04%20145208.png)

---

## Features

- **Standup Form** — Post your daily updates (yesterday, today, blockers) with optional file attachment
- **Live Activity Feed** — Polls for new posts every 10 seconds, no page refresh needed
- **Blocker Flagging** — Team members flag blockers; cards are highlighted in red for visibility
- **Productivity Dashboard** — Bar chart, blocker trend line, stat cards, and daily breakdown table
- **Weather Integration** — Live temperature + condition via Open-Meteo (no API key required)
- **Error States** — Graceful fallback UI for all API failures

---


## ⚙️ Setup & Running

### Prerequisites
- Python 3.9+ and pip
- Node.js 18+ and npm

### 1. Backend (Flask)

```bash
cd backend

# Install dependencies
pip install flask flask-cors flask-sqlalchemy

# Run the server (creates standups.db automatically)
python app.py
```

The API will be available at `http://localhost:5000`.

### 2. Frontend (React + Vite)

```bash
cd client/syncUp

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.




---

## Third-Party APIs

### Open-Meteo (Weather)

- **URL**: `https://api.open-meteo.com/v1/forecast`
- **No API key required**
- Fixed city: **Nairobi, Kenya** (lat: -1.286, lon: 36.817)
- Displays temperature (°C) + WMO weather code → icon + label
- If the API call fails, a "Weather unavailable" fallback is shown



## 📸 Dashboard Screenshot
![StandupSync Dashboard](./client/syncUp/src/assets/FireShot%20Capture%20001%20-%20StandUPs%20-%20http___localhost_5174_dashboard%20-%20%5Blocalhost%5D.png)




## Tech Stack
Layer - Technology 

Backend - Python, Flask, SQLAlchemy, SQLite
Frontend - React 18, Vite 5, TailwindCSS v3 
Charts - Recharts
Weather - Open-Meteo API 
Date utils - date-fns 
