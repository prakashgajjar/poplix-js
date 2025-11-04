 import axios from "axios";
 
 export  const checkfollowuser = async (id) => {
    try {
      const response = await axios.post("api/home/profile/checkfollow", id, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.status === 200) {
        const data = response.data.follow;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }