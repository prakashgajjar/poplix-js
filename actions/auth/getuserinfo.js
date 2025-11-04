import axios from "axios";

export const getuserinfo = async () => {
  try {
    const response = await axios.get("/api/home/getuserinfo", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // console.log("userinfo : ",response.data);
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
