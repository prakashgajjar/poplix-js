 import axios from "axios";
 
 export  const uploadprofilepic = async (formData) => {
    try {
      const response = await axios.post("api/home/profile/uploadprofilepic", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
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