 import axios from "axios";
 
 export  const removefollowers = async (id ) => {
    try {
      const response = await axios.post("/api/home/profile/removefromfollowers", {id}, {
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