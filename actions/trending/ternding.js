 import axios from "axios";
 
 export  const trendingtag = async () => {
    try {
      const response = await axios.get("/api/home/trending", {
      headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      if (response.status === 200) {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }