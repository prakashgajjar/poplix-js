import { Check, X} from 'lucide-react';
import Image from 'next/image';

export default function NotificationItem({
  avatar,
  username,
  message,
  time,
  type,
  isPrivateProfile = false,
  isFollowingBack = false,
  onAccept,
  onReject,
}) {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-muted rounded-xl transition w-full hover:bg-gray-800">
      {/* Avatar */}
      <Image
        src={avatar}
        alt={username}
        width={44}
        height={44}
        className="rounded-full w-11 h-11 object-cover"
      />
      {/* Content */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
        <div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{username}</span> {message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>

        {/* Conditional Action Buttons */}
        {type === "follow" && (
          isPrivateProfile ? (
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={onAccept}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-green-500 text-white hover:bg-green-600 shadow flex items-center gap-2"
              >
                <Check size={16} /> Accept
              </button>
              <button
                onClick={onReject}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600 shadow flex items-center gap-2"
              >
                <X size={16} /> Reject
              </button>
            </div>
          ) : !isFollowingBack && (
            // <button
            //   onClick={onFollowBack}
            //   className="px-4 py-1.5 text-sm font-medium rounded-full bg-white/10 backdrop-blur-md text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md flex items-center gap-2 border border-blue-500 mt-2 sm:mt-0"
            // >
            //   <UserPlus size={16} className="stroke-[2]" /> Follow
            // </button>
            <h1></h1>
          )
        )}
      </div>
    </div>
  );
}