"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Users,
  
} from "lucide-react";
import { FaCog } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getcontacts } from "../../actions/messages/getcontacts";

export default function ContactNavbar() {
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  const handleGetContacts = async () => {
    const data = await getcontacts();
    setContacts(data);
    // console.log("contacts data : ", data);
  };

  useEffect(() => {
    handleGetContacts();
  }, []);

  return (
    <div className="flex h-screen w-screen sm:w-[300px] flex-col border-r border-gray-800 bg-zinc-950 text-white">
      {/* Header & Search */}
      <div className="pb-1 ">

        <div className="flex justify-between pr-3 items-center">
          <div className="flex">
            <button className="text-white md:hidden" onClick={() => router.replace("/home")}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-4 font-semibold text-xl text-white">Poplix</div>
          </div>
          <div className="gap-3 flex items-center">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
              <Users className="text-white w-[16px] h-[16px]" />
            </div>
            <div className="hover:rotate-45 transition-all mr-1">
              <FaCog />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto">
        <div className="px-4">
          <input
            type="text"
            placeholder="Search user"
            className="w-full px-3 py-1.5 text-sm bg-zinc-800 text-white placeholder:text-gray-400 border border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {/* User List */}
        <div className="flex-1  mt-2">
          {contacts?.map((user, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(`/message/${user._id}`);
              }}
              className="flex items-start gap-2 px-4 py-2 hover:bg-[#2b2b2b] cursor-pointer transition-colors duration-150 "
            >
              <Image
                src={user?.avatar}
                alt={user?.username}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-white">{user?.fullname}</div>
                <div className="text-xs text-gray-400">hey bro how are you</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
