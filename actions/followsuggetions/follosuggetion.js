 import axios from "axios";
 
 export  const follosuggetion = async () => {
    try {
      const response = await axios.get("/api/home/followsuggetion",  {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        const data = response.data.selectedUsers;
        return data;
      }
    } catch (error) {
      console.error(error)
    }
  }