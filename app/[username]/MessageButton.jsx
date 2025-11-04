"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Message = ({ id }) => {
  const router = useRouter();

  const handleMessage = () => {
    // Redirect to chat page with that user
    router.push(`/message/${id}`);
  }

  return (
    <div>
      <button
        onClick={handleMessage}
        className={`
          px-4 py-1 rounded-full font-semibold text-sm backdrop-blur-md border transition-all duration-300 
          bg-transparent text-green-500 border-green-400 hover:bg-green-500 hover:text-white
        `}
      >
        Message
      </button>
    </div>
  )
}

export default Message
