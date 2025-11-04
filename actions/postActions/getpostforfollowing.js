import axios from "axios";

export const getpostfollowing = async (page ) => {
  try {
    const response = await axios.post("/api/home/post/followingpost",{page}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      const data = response.data.posts;
      return data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
