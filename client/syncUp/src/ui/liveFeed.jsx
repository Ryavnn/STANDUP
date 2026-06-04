import Navbar from '../components/navbar'
import Feedform from '../components/feedform'
import TeamFeed from '../components/teamFeed'
const liveFeed = () => {
  return (
    <>
    <Navbar />
    <div className="live-feed-cont flex gap-5 p-5 w-full">
      <Feedform />
      <TeamFeed />
    </div>
    </>
  )
}

export default liveFeed