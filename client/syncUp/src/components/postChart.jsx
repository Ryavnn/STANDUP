import {useEffect, useState} from "react"
import {BarChart,Bar, ResponsiveContainer, XAxis,YAxis,Tooltip} from "recharts"
const PostChart = () => {
  const [data,setData] = useState([])
    useEffect(()=>{
        const url = "http://localhost:5000/standups/stats/"
        const fetchStats = async ()=>{
          try{
            const response = await fetch(url)
            if (!response.ok){
                throw new Error(response.status)
            }
            const results = await response.json()
            setData(results)
          }catch(error){
            console.error("Error fetching stats:",error)
          }
        }

        fetchStats()
    } ,[])
  return (
    <>
      <div className="posts-chart w-full h-72 p-4 shadow-md rounded-md flex flex-col gap-2">
        <div className="chart-label font-heading">Posts Trend</div>
        <div className="chart-cont w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar type="monotone" dataKey="posts" fill="#E8380D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default PostChart