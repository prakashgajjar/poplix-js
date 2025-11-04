"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, Users, Search } from "lucide-react";
import { FaCog } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getcontacts } from "../../actions/messages/getcontacts";

export default function ContactNavbar() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleGetContacts = async () => {
    try {
      const data = await getcontacts();
      // Ensure consistent structure (some APIs might wrap in { contacts: [] })
      setContacts(data?.contacts || data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    handleGetContacts();
  }, []);

  // Filter contacts based on search input
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (user) =>
        user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        user?.username?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, contacts]);

  return (
    <div className="flex h-screen w-screen sm:w-[300px] flex-col border-r border-gray-800 bg-zinc-950 text-white">
      {/* Header */}
      <div className="pb-1 border-b border-gray-800">
        <div className="flex justify-between pr-3 items-center">
          <div className="flex items-center">
            <button
              className="text-white md:hidden"
              onClick={() => router.replace("/home")}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-4 font-semibold text-xl text-white">Poplix</div>
          </div>
          <div className="gap-3 flex items-center">
            <div
              title="Groups"
              className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer transition-all"
            >
              <Users className="text-white w-[16px] h-[16px]" />
            </div>
            <div
              title="Settings"
              className="hover:rotate-45 transition-all mr-1 cursor-pointer"
            >
              <FaCog className="text-gray-300 hover:text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-3 pb-2 relative">
        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-sm bg-zinc-800 text-white placeholder:text-gray-400 border border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
        />
      </div>

      {/* Contacts List */}
      <div className="overflow-y-auto flex-1 mt-1">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((user, index) => (
            <div
              key={index}
              onClick={() => router.push(`/message/${user._id}`)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#2b2b2b] cursor-pointer transition-colors duration-150"
            >
              <Image
                src={user?.avatar || "/default-avatar.png"}
                alt={user?.username || "user"}
                width={40}
                height={40}
                className="rounded-full object-cover border border-gray-700"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-white">
                  {user?.fullname || "Unknown"}
                </div>

                {/* Last Message */}
                <div className="text-xs text-gray-400 truncate">
                  {user?.lastMessage
                    ? user.lastMessage.length > 40
                      ? user.lastMessage.slice(0, 40) + "..."
                      : user.lastMessage
                    : "No messages yet"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm">
            <Users className="w-8 h-8 text-gray-500 mb-2" />
            <p>No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
