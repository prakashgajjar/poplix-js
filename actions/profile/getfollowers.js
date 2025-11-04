 import axios from "axios";
 
 export  const getfollowers = async (username) => {
    try {
      const response = await axios.post("/api/home/profile/getfollowers", username, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true
      })

      if (response.status === 200) {
        const data = response.data.followers;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }