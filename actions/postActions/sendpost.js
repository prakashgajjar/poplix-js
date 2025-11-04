import axios from "axios";
import toast from "react-hot-toast";
export const sendpost = async (formData) => {
  const content = formData.get("content");
  const file = formData.get("post");

  if (!file && !content) {
    toast.error("Please add content or media before posting.");
    return null;
  }
  try {
    const response = await axios.post("/api/home/post/sendpost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      const data = response.data;
      toast.success("Post created successfully");
      return data.post;
    } else {
      toast.error("Failed to create post");
      return null;
    }
  } catch (error) {
    toast.error("Error sending post");
    return null;
  }
};
