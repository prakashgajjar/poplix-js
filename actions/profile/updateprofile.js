 import axios from "axios";
 
 export  const updateprofile = async (fullname  , bio) => {
    try {
      const response = await axios.post("api/home/profile/profileupdate", {fullname , bio}, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      // console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }