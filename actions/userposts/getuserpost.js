import axios from "axios";

export const userpostdata = async (username) => {
  try {
    const response = await axios.post(
      "/api/userpost/getuserpost",
      { username }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      }
    );

    if (response.status === 200) {
      return response.data.posts;
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};
