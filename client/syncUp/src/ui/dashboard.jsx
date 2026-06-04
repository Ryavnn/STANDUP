import BlockerTrend from "../components/blockerTrend"
import Navbar from "../components/navbar"
import PostChart from "../components/postChart"
import StatsCards from "../components/statsCards"
import TeamActivity from "../components/teamActivity"

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-body w-full flex flex-col gap-6 p-5">
        <StatsCards />

        <div className="charts-row w-full flex gap-5">
          <div className="flex-1 min-w-0">
            <PostChart />
          </div>
          <div className="flex-1 min-w-0">
            <BlockerTrend />
          </div>
        </div>

        <TeamActivity />
      </div>
    </>
  )
}

export default Dashboard