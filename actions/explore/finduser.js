import axios from "axios";

export const finduser = async (username) => {
  try {
    const response = await axios.post(
      "/api/explore/finduser",
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      // console.log("user from search : ", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
