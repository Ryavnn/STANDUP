import Navbar from '../components/navbar'
import Feedform from '../components/feedform'
import TeamFeed from '../components/teamFeed'

const liveFeed = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="live-feed-cont flex gap-5 p-5 w-full flex-1 overflow-hidden">
        <Feedform />
        <TeamFeed />
      </div>
    </div>
  )
}

export default liveFeed