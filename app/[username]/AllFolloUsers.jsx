'use client';

import {  useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Follow from './Follow';
import { removefollowers } from '../../actions/profile/removefollowers';

// import { getuserinfo } from '../../actions/auth/getuserinfo';

export default function AllFollowUsers({ users, text }) {
  const [search, setSearch] = useState('');
  const router = useRouter()
  const { username } = useParams();
  // const [userId , setUserId] = useState('')
  // console.log(users)

  const handleRemove = async (id ) =>{
    await removefollowers(id)
  }

  // useEffect(()=>{
  //   const getUser = async () => {
  //     const data = await getuserinfo()
  //     // console.log("data" , data.user._id)
  //     // setUserId(data?.user?._id)  
  //   }
  //   getUser()
  // })

  return (
    users && <div className="min-h-screen bg-black text-white px-4 py-2">
      <div className="flex items-center gap-4 mb-4">
        <ArrowLeft className="w-6 h-6" onClick={() => {
          router.push(`/${username}`)
        }} />
        <h1 className="text-xl font-semibold">{text}</h1>
      </div>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-neutral-800 rounded-xl px-4 py-2 mb-4 focus:outline-none"
      />

      <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
        {users?.length > 0 && users?.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push(`/${user?.username}`)}>
              <Image
                src={user?.avatar}
                alt={user?.username}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium">{user?.username}</span>
                {user?.fullname && (
                  <span className="text-sm text-neutral-400">{user?.fullname}</span>
                )}
              </div>
            </div>

          { <div className="flex gap-2">
              {text === 'following' ? (
                <div >
                  <Follow id={user?._id}  />
                </div>) : (
                <button
                  onClick={()=>handleRemove(user?._id)}
                  className="bg-neutral-800 text-red-500 border border-red-400 px-3 py-1 rounded-full text-sm hover:bg-red-500 hover:text-white transition-all"
                >
                   Remove
                </button>
              )}
            </div>}

          </div>
        ))}
      </div>
    </div>
  );
}
