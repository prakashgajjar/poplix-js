"use client";

import {
  FaHome, FaSearch, FaBell, FaEnvelope, FaBookmark, FaUser,
  FaRocket, FaEllipsisH,

} from "react-icons/fa";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getuserinfo } from "../actions/auth/getuserinfo.js";

// import { follosuggetion } from "../../actions/followsuggetions/follosuggetion";

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [user, setUser] = useState(null);

  const navItems = [
    { icon: <FaHome />, label: "Home", route: "/home" },
    { icon: <FaSearch />, label: "Explore", route: "/explore" },
    { icon: <FaBell />, label: "Notifications", route: "/notifications" },
    { icon: <FaEnvelope />, label: "Messages", route: "/message" },
    { icon: <FaBookmark />, label: "Bookmarks", route: "/bookmarks" },
    { icon: <FaRocket />, label: "Premium", route: "/premium" },
    { icon: <FaUser />, label: "Profile", route: `/profile` },
    {
      icon: (
        <Image
          src="/logos/poplix2.png"
          alt="Popai Icon"
          width={20}
          height={20}
          className="rounded-sm"
        />
      ),
      label: "Popai",
      route: "/popai"
    },
    // { icon: <FaEllipsisH />, label: "More", route: "/more" },
  ];

  useEffect(() => {
    async function run() {
      const data = await getuserinfo();
      setUser(data);
      // console.log("data :", data)
    }
    run();
  }, [])
  const router = useRouter();
  return (
    <div className="hidden md:flex flex-col justify-between w-[300px] px-1 py-6 border-r border-gray-800 ">
      <div>
        <div className="mb-10">
          <Image
            src="/logos/poplix-black.png"
            alt="Poplix Logo"
            width={200}
            height={60}
          />
        </div>

        <nav className="space-y-4">
          {navItems.map(({ icon, label, route }, i) => (
            <div
              key={i}
              onClick={async () => {
                setSelectedIndex(i)
                if (route !== "/profile") {
                  router.replace(`${route}`)
                }
                else {
                  if (user?.user?.username) {
                    router.push(`/${user.user.username}`);
                  }
                }

              }}
              className={`flex items-center gap-4 p-2 text-lg rounded-lg cursor-pointer hover:bg-gray-800 ${selectedIndex === i ? "bg-gray-700" : ""
                }`}
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </nav>

        {/* <button className="mt-6 bg-white text-black font-semibold rounded-full py-2 w-full hover:bg-gray-300 flex items-center justify-center">
          <FaPlus className="mr-2" /> Post
        </button> */}
      </div>

      {
        user && <div className="flex items-center gap-3 mt-6 p-2 hover:bg-gray-800 rounded cursor-pointer" onClick={() => router.push(`/${user?.user?.username}`)}>
          <Image src={`${user?.user?.avatar || "/images/default-avatar.png"}`} className="w-10 h-10 rounded-full" alt="Profile" width={40} height={40} />
          <div>
            <p className="font-semibold text-white">{user?.user?.fullname}</p>
            <p className="text-sm text-gray-400">{user?.user?.username}</p>
          </div>
        </div>
      }
    </div>
  );
}
