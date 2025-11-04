'use client';

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { getallnotifications } from "../../actions/notification/getallnotification";
import NotificationItem from "./NotificationItem";
import GlassSidebar from "../../components/GlassSidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import NotificationSkeleton from "../../components/NotificationSkeleton";
import SwipeToGoBack from "../../components/SwipeToGoBack";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function run() {
      try {
        const data = await getallnotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    }
    run();
  }, []);

  return (
    <SwipeToGoBack to="/home">
      <div className="relative h-screen w-full overflow-y-auto bg-background">
        {/* Header */}
        <div className=" top-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 py-3 border-b">
          <button onClick={() => router.push("/home")} className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-white">Notifications</h1>
          <div className="w-5" /> {/* spacer */}
        </div>

        {/* Notifications List */}
        <div className="max-w-3xl mx-auto p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif, idx) => (
              <div>
                <NotificationItem
                  key={notif._id || idx}
                  type={notif?.type}
                  avatar={notif?.meta?.avatar}
                  username={notif?.meta?.username}
                  message={notif?.message}
                  time={formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                  isPrivateProfile={notif.type === "follow" && false}
                  isFollowingBack={false}
                  onFollowBack={() => console.log("Followed back", notif.sender)}
                  onAccept={() => console.log("Accepted request", notif.sender)}
                  onReject={() => console.log("Rejected request", notif.sender)}
                />

                <hr className='opacity-30' />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 gap-3 flex flex-col">
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </div>
          )}
        </div>

        {/* Glass Sidebar */}
        <div className="fixed bottom-4 right-4 sm:right-6">
          <GlassSidebar />
        </div>
      </div>
    </SwipeToGoBack>
  );
}
