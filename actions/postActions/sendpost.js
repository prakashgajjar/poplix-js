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
      toast.success("Post created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#111",
          color: "#10B981",
          fontWeight: "600",
          padding: "12px 18px",
        },
        iconTheme: {
          primary: "#10B981",
          secondary: "#111",
        },
      });
      return data.post;
    } else {
      toast.error("Failed to create post", {
        style: {
          borderRadius: "10px",
          background: "#111",
          color: "#EF4444", // red-500
          fontWeight: "600",
          padding: "12px 18px",
        },
        iconTheme: {
          primary: "#EF4444",
          secondary: "#111",
        },
      });

      return null;
    }
  } catch (error) {
    toast.error("Error to sending post", {
      style: {
        borderRadius: "10px",
        background: "#111",
        color: "#EF4444", // red-500
        fontWeight: "600",
        padding: "12px 18px",
      },
      iconTheme: {
        primary: "#EF4444",
        secondary: "#111",
      },
    });

    return null;
  }
};
