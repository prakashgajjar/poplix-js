 import axios from "axios";
import toast from "react-hot-toast";
 
 export  const likepost = async (id) => {
    try {
      const response = await axios.post("api/home/post/likeposts", {
        id
      }, {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      // console.log(response.data.liked);
      if (response.status === 200) {
        const data = response.data.liked;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }