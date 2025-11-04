 import axios from "axios";
import toast from "react-hot-toast";
 
 export  const repost = async (postId ) => {
    try {
      const response = await axios.post("/api/home/post/repost",{postId}
      , {
       headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      if (response.status === 200) {
        const data = response
        return data;
      }
    } catch (error) {
      console.error(error)
      toast.success("Oops! Something went wrong. Please try again. 😔");
    }

  }