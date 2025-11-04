// actions/getUserId.js
import axios from "axios";

const getLoginUserId = async () => {
  try {
    const response = await axios.post(
      "/api/me",
      {},
      {
        withCredentials: true, // important to send cookies
      }
    );

    if (response.status === 200) {
      return response.data.userId;
    }
    return null;
  } catch (err) {
    console.error("Error fetching user ID:", err);
    return null;
  }
};
export default getLoginUserId;
