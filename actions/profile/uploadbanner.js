 import axios from "axios";
 
 export  const uploadBanner = async (formData) => {
    try {
      const response = await axios.post("api/home/profile/uploadbanner", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
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