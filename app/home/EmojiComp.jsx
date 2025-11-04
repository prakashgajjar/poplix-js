"use client";
import { useState, useEffect } from "react";

export default function EmojiPicker({setContent}) {
    const [emojis, setEmojis] = useState([]);
    const [search, setSearch] = useState("");
    const [activeGroup, setActiveGroup] = useState("smileys-emotion");

    useEffect(() => {
        const fetchEmojis = async () => {
            const res = await fetch("https://emoji-api.com/emojis?access_key=9b25d7b0a1eeb399f48181b27bc4a39c6e4c04ec");
            const data = await res.json();
            setEmojis(data);
        };

        fetchEmojis();
    }, []); 

    const groups = [...new Set(emojis.map((e) => e.group))];

    const filteredEmojis = emojis.filter(
        (e) =>
            e.group === activeGroup &&
            (e.unicodeName.toLowerCase().includes(search.toLowerCase()) ||
                e.character.includes(search))
    );

    return (
         <div className="md:w-80 w-[262px] bg-black text-white border border-gray-700 rounded-xl shadow-xl">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search emojis"
                className="w-full p-2 bg-gray-900 text-sm border-b border-gray-700 outline-none rounded-t-xl"
            />

            <div className="flex gap-2 overflow-x-auto p-2 bg-gray-900 scrollbar-hide">
                {groups.map((group) => (
                    <button
                        key={group}
                        onClick={() => setActiveGroup(group)}
                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${group === activeGroup
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-300"
                            }`}
                    >
                        {group.split("-")[0]}
                    </button>
                ))}
            </div>

            <div className="p-2 max-h-64 overflow-y-auto grid grid-cols-8 gap-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {filteredEmojis.map((emoji, index) => (
                    <button
                        key={index}
                        className="text-2xl hover:scale-125 transition-transform"
                        title={emoji.unicodeName}
                        onClick={()=>setContent((prev)=>prev + emoji.character)}
                    >
                        {emoji.character}
                    </button>
                ))}
            </div>
        </div>
    );
}
