import { useEffect, useState } from "react";



const Card = ({ label, value, sub }) => (
  <div
    className="stat-card flex-1 min-w-[140px] rounded-xl p-5 shadow-md flex flex-col gap-1"

  >
    <span className="text-[11px] uppercase tracking-widest text-gray-400 font-body">
      {label}
    </span>
    <span
      className="text-4xl font-heading tracking-wide"

    >
      {value ?? "—"}
    </span>
    {sub && (
      <span className="text-[11px] text-gray-400 font-body">{sub}</span>
    )}
  </div>
);

const StatsCards = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const load = async () => {
      const STATS_URL = "http://localhost:5000/standups/stats/";
      const FEED_URL = "http://localhost:5000/standups/";
      try {
        const [statsRes, feedRes] = await Promise.all([
          fetch(STATS_URL),
          fetch(FEED_URL),
        ]);
        const stats = await statsRes.json();
        const feed = await feedRes.json();

        const today = new Date().toISOString().slice(0, 10);
        const todayStats = stats.find((d) => d.date === today) ?? { posts: 0, blockers: 0 };

        const totalPosts = stats.reduce((s, d) => s + d.posts, 0);
        const totalBlockers = stats.reduce((s, d) => s + d.blockers, 0);


        const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const uniqueAuthors = new Set(
          feed
            .filter((p) => new Date(p.timestamp).getTime() >= cutoff)
            .map((p) => p.author)
        ).size;

        setCards({ totalPosts, totalBlockers, uniqueAuthors, todayPosts: todayStats.posts });
      } catch (err) {
        console.error("StatsCards fetch error:", err);
      }
    };
    load();
  }, []);

  return (
    <div className="stats-cards w-full flex flex-wrap gap-4">
      <Card
        label="Posts This Week"
        value={cards?.totalPosts}
        sub="Last 7 days"
      />
      <Card
        label="Blockers Raised"
        value={cards?.totalBlockers}
        sub="Last 7 days"
      />
      <Card
        label="Active Members"
        value={cards?.uniqueAuthors}
        sub="Unique authors (7d)"
      />
      <Card
        label="Today's Posts"
        value={cards?.todayPosts}
        sub={new Date().toLocaleDateString("en-GB", { weekday: "long", month: "short", day: "numeric" })}
      />
    </div>
  );
};

export default StatsCards;
