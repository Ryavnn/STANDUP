import { IoReload } from "react-icons/io5";
const LiveNav = () => {
  return (
    <>
      <div className="live-nav-cont flex items-center justify-between w-full h-12 ">
        <div className="feed-label font-heading text-xl flex flex-col">
            Team Live Feed
            <span className="feed-count font-body text-secondary text-sm">Feed refreshes every 10 seconds</span>
        </div>
        <div className="refresh btn flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-[18px] cursor-pointer">
            <IoReload />
          Refresh
        </div>
      </div>
    </> 
  );
};

export default LiveNav;
