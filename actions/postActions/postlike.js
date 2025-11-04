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
        if(data){
          toast.success("Liking this post because I can’t like your face directly ✨");
        }else{
          toast.success("You liked it… and then you didn’t… was it all a lie?”");
        }
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }