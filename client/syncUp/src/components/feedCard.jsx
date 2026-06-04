
const FeedCard = ({ standups }) => {

  return (
    <>
      {standups.map((e) => (
        <div
          className="feed-card shadow-md rounded-md p-4 w-full h-auto flex flex-col gap-2"
          key={e.id}
        >
          <div className="Feed-header  flex items-center justify-between">
            <p> {e.author}</p>
            <small style={{ color: "gray" }}>
              {new Date(e.timestamp).toLocaleString()}
            </small>
          </div>
          <div className="feed-content flex flex-col gap-2">
            <span className="yesterday p-2  rounded-md shadow-md">
              <strong className="text-blue-500">Yesterday</strong>
              <p>{e.yesterday}</p>
            </span>
            <span className="today p-2 rounded-md shadow-md">
              <strong className="text-green-500">Today</strong>
              <p>{e.today}</p>
            </span>
            {e.has_blocker && (
              <span className=" blockers p-2 bg-red-100 rounded-md shadow-md">
                <strong className="text-red-500">Blockers</strong>
                <p>{e.blockers}</p>
              </span>
            )}
            {e.file_url && (
              <a
                href={`http://localhost:5000${e.file_url}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                View Attachment
              </a>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default FeedCard