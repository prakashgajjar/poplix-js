import axios from "axios";

export const addview = async (id ) => {
  try {
    const response = await axios.post("/api/home/post/addview", {id}, {
      headers: {
        "Content-Type": "aplication/json",
      },
      "withCredentials" : true
    });
    if (response.status === 200) {
      // console.log("views added !!")
    }
  } catch (error) {
    console.error(error);
  }
};
