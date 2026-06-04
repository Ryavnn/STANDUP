import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const BlockerTrend = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = "http://localhost:5000/standups/stats/";
    const fetchStats = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const results = await response.json();
        setData(results);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);
  return (
    <>
      <div className="blockers-chart w-full h-72 p-4 shadow-md rounded-md flex flex-col gap-2">
        <div className="chart-label font-heading">Blockers Trend</div>
        <div className="chart-cont w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="blockers" fill="#E8380D" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BlockerTrend;
