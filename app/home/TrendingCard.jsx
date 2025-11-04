import React, { useEffect, useState } from "react";
import { trendingtag } from "../../actions/trending/ternding";

const TrendingCard = () => {
  const [trends, setTrends] = useState([])
  useEffect(()=>{
    async function run() {
     const data  = await trendingtag();
     setTrends(data.trending);
    }
    run();
  },[])
  return (
   trends && <div className="bg-gradient-to-br from-[#1f2937] via-[#111827] to-black p-5 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
        What’s happening
      </h2>
      <ul className="space-y-3">
        {trends?.map((item, index) => (
          <li
            key={index}
            className="bg-gray-800/60 hover:bg-gray-700 transition-all duration-200 p-3 rounded-lg cursor-pointer flex flex-col"
          >
            <span className="text-md font-semibold text-blue-400 hover:underline">
              {item?.tag}
            </span>
            <span className="text-xs text-gray-400">{`${item?.count} posts`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCard;
