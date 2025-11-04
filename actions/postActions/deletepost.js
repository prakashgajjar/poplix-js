import axios from "axios";

export const deletepost = async ( postId ) => {
  try {
    const response = await axios.post(
      "/api/home/post/deletepost",
       {postId} ,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log(response);
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
