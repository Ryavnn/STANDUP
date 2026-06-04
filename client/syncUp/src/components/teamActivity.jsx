import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary text-white text-xs rounded-md px-3 py-2 shadow-lg border border-white/10">
        <p className="font-heading text-sm mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TeamActivity = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://standup-e6ai.onrender.com/standups/stats/";
    const fetchStats = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        const results = await response.json();
        // Augment each day with an "active" count = posts that had no blocker
        const enriched = results.map((d) => ({
          ...d,
          active: d.posts - d.blockers,
        }));
        setData(enriched);
      } catch (error) {
        console.error("Error fetching team activity:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="team-activity-chart w-full h-72 p-4 shadow-md rounded-md flex flex-col gap-2">
      <div className="chart-label font-heading">Team Activity</div>
      <div className="chart-cont w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="active" name="Active Posts" stackId="a" fill="#E8380D" radius={[0, 0, 0, 0]} />
            <Bar dataKey="blockers" name="Blockers" stackId="a" fill="#1A1A1A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamActivity;
