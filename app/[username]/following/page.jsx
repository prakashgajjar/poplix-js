'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AllFollowUsers from '../AllFolloUsers';
import { getfollowing } from '../../../actions/profile/getfollowing';
import AllFolloUserSkeleton from '../AllFolloUserSkeleton';

const FollowersPage = () => {
  const { username } = useParams();
  const [following, setFollowing] = useState([]); // better type
  const [loading, setLoading] = useState(true);

const handleGetFollowers = useCallback(async () => {
  setLoading(true);
  try {
    const data = await getfollowing(username );
    console.log(data);
    setFollowing(data || []);
  } catch (err) {
    console.error('Error fetching followers:', err);
  } finally {
    setLoading(false);
  }
}, [username]);

useEffect(() => {
  if (username) {
    handleGetFollowers();
  }
}, [username, handleGetFollowers]);


  return (
    <div className="px-4 py-2 bg-black min-h-screen text-white">
      {loading ? (
        <AllFolloUserSkeleton />
      ) : (
        <AllFollowUsers users={following} text="following" />
      )}
    </div>
  );
};

export default FollowersPage;
