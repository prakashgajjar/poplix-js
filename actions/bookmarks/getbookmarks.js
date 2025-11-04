import axios from "axios";

export const getbookmarks = async () => {
  try {
    const response = await axios.get("/api/bookmarks/getbookmarks", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      // console.log("user from search : ", response.data);
      return response.data.posts;
    }
  } catch (error) {
    console.error(error);
  }
};
