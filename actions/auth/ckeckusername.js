import axios from "axios";

export const checkusername = async (username) => {
  try {
    const response = await axios.post(
      "api/user/ckeckusername",
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data.data);
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
