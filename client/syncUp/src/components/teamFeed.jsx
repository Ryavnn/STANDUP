import { useState, useEffect } from "react";
import FeedCard from "./feedCard";
import LiveNav from "./liveNav";

const TeamFeed = () => {
  const [standups, setStandups] = useState([]);
  const fetchStandup = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/standups/",
      );
      const data = await response.json();
      setStandups(data);
    } catch (error) {
      console.error("Error fetching standup data:", error);
    }
  };

  useEffect(() => {
    fetchStandup();

    const interval = setInterval(() => {
      fetchStandup();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="team-feed-cont flex flex-col gap-5 p-5 shadow-md rounded-md w-[70%] h-full overflow-y-scroll">
      <LiveNav onRefresh={fetchStandup} />
      <FeedCard standups={standups} />
    </div>
  );
};

export default TeamFeed;
