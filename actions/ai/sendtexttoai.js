 import axios from "axios";
 
 export  const sendtexttoai = async (text) => {
    try {
      const response = await axios.post("api/ai/geminiaichat",text, {
        headers: {
          "Content-Type": "application/json"
        },
        "withCredentials" :true
      })

      if (response.status === 200) {
        const data = response.data.text;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }