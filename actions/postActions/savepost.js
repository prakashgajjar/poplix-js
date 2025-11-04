import axios from "axios";

export const savepost = async (id) => {
  try {
    const response = await axios.post("/api/home/post/savepost", {id}, {
    headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
    });
    if (response.status === 200) {
        console.log(response.data.saved)
      return response.data.saved;
    }
  } catch (error) {
    console.error(error);
  }
};
