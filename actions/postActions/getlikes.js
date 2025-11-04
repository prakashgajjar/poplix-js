 import axios from "axios";
 
 export  const getlikes = async () => {
    try {
      const response = await axios.get("/api/home/post/getlikes", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        const data = response.data.likedPostIds;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }