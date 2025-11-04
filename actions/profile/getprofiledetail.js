 import axios from "axios";
 
 export  const getprofiledatail = async (username) => {
    try {
      const response = await axios.post("api/home/profile/getprofiledetail", username, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true
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