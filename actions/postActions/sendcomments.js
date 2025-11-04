import axios from "axios";
import toast from "react-hot-toast";
 
 export  const sendcomment = async (id , content) => {
    try {
      const response = await axios.post("/api/home/post/comment", {
        id,content
      }, {
       headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
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