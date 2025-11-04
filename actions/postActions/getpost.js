 import axios from "axios";
 
 export  const getPosts = async (page) => {
    try {
      const response = await axios.post("/api/home/post/getposts", {page}, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        const data = response.data.data;
        return data;
      }
    } catch (error) {
      console.error(error)
      return null
    }

  }