"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { follosuggetion } from "../../actions/followsuggetions/follosuggetion";
import { RefreshCcw } from 'lucide-react'
import Follow from "../[username]/Follow";
import { useRouter } from "next/navigation";


const FollowSuggestions = () => {

    const [users, setUsers] = useState([]);
    const router = useRouter()

    const handleRefresh = async () => {
        const data = await follosuggetion();
        setUsers(data);
    }


    useEffect(() => {
        async function run() {
            const data = await follosuggetion();
            setUsers(data);
        }
        run();
    }, [])
    return (
        users && <div className="bg-gradient-to-br from-[#1f2937] via-[#111827] to-black p-5 rounded-2xl shadow-lg border border-gray-700 relative">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center justify-between">
                Who to follow 👥
                <button
                    onClick={handleRefresh}
                    className="p-2 rounded-full hover:bg-gray-800 transition"
                    title="Refresh suggestions"
                >
                    <RefreshCcw size={16} className="text-white" />
                </button>
            </h2>

            <div className="space-y-4">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between hover:bg-gray-800/60 p-3 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-center gap-3" onClick={()=>router.push(`/${user.username}`)}>
                            <Image
                                src={user.avatar}
                                alt={user.username}
                                width={40}
                                height={40}
                                className="rounded-full object-cover w-10 h-10"
                            />
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    {user?.fullname || "not define"}
                                </p>
                                <p className="text-xs text-gray-400">{user.username}</p>
                            </div>
                        </div>
                       <Follow id={user._id} checkFollow={false}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowSuggestions;
