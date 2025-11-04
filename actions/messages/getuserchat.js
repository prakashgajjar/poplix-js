import axios from "axios";

export const getuserchat = async (receiverId) => {
  try {
    const res = await axios.post(
      "/api/messages/getmessages",
      receiverId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.status == 200) {
      const data = res.data;
      // console.log("data",data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};