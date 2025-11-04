import axios from "axios";

export const checksavepost = async () => {
  try {
    const response = await axios.get("/api/home/post/checksavedpost", {
      headers: {
        "Content-Type": "aplication/json",
      },
      "withCredentials" : true
    });
    if (response.status === 200) {
        console.log(response.data.savedPosts)
      return response.data.savedPosts;
    }
  } catch (error) {
    console.error(error);
  }
};
