'use client';

import { useCallback, useEffect, useState } from 'react';
import { getfollowers } from '../../../actions/profile/getfollowers';
import { useParams } from 'next/navigation';
import AllFollowUsers from '../AllFolloUsers';
import AllFolloUserSkeleton from '../AllFolloUserSkeleton';

const FollowersPage = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);


const handleGetFollowers = useCallback(async () => {
  setLoading(true);
  try {
    const data = await getfollowers(username);
    setFollowers(data || []);
  } catch (err) {
    console.error('Error fetching followers:', err);
  } finally {
    setLoading(false);
  }
}, [username]); //include username here

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
        <AllFollowUsers users={followers} text="followers" />
      )}
    </div>
  );
};

export default FollowersPage;
