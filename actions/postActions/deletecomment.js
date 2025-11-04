import axios from "axios";

export const deletecomments = async ( id ) => {
  try {
    const response = await axios.post(
      "/api/home/post/deletecomment",
       {id} ,
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
}