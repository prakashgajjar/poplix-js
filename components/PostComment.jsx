import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Heart } from 'lucide-react';
import Image from 'next/image';


export default function PostComment({ comment }) {
  console.log(comment)
  return (
    <div
      // onClick={onClick}
      className="flex gap-4 items-start p-4 hover:bg-gray-800 rounded-xl transition-all cursor-pointer w-full"
    >
      {/* Avatar */}
      <Image
        src={comment?.user?.avatar}
        alt={comment?.user?.username}
        width={44}
        height={44}
        className="rounded-full w-11 h-11 object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <MessageCircle size={16} className="text-blue-500" />
          <span className="font-semibold text-white">{comment?.user?.username}</span>
          <span className="text-xs text-gray-400 ml-auto">{comment?.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "just now"}

          </span>
        </div>

        <p className="text-sm text-white mb-2">{comment?.content}</p>

        {/* Likes */}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Heart size={14} className="text-red-500 fill-red-500" />
          {comment?.likes?.length} {comment?.likes?.length === 1 ? "like" : "likes"}
        </div>
      </div>
    </div>
  );
}
