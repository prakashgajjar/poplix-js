import axios from "axios";

export const checkuservalid = async (username) => {
  try {
    const response = await axios.post(
      "/api/user/checkuservalid",
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
        "withCredentials": true
      }
    );
    // console.log(response)
    if (response.status === 200) {
      const data = response.data.auth;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
