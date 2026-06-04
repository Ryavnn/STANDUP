import FeedCard from "./feedCard"
import LiveNav from "./liveNav"

const TeamFeed = () => {
  return (
    <div className="team-feed-cont flex flex-col gap-5 p-5 shadow-md rounded-md w-[70%] h-full overflow-y-scroll">
      <LiveNav />
      <FeedCard />
    </div>
  )
}

export default TeamFeed