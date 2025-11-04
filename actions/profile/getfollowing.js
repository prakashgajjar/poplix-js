 import axios from "axios";
 
 export  const getfollowing = async (username) => {
    try {
      const response = await axios.post("/api/home/profile/getfollowing", username, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true
      })

      if (response.status === 200) {
        const data = response.data.following;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }