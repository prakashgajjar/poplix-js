import axios from "axios";

export const sendmessage = async (formData) => {
  try {
    await axios.post("/api/messages/sendmessage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
};
