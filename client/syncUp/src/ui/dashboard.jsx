import BlockerTrend from "../components/blockerTrend"
import Navbar from "../components/navbar"
import PostChart from "../components/postChart"

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="charts w-full h-full flex flex-col p-5">
        <PostChart />
        <BlockerTrend />
      </div>
    </>
  )
}

export default Dashboard