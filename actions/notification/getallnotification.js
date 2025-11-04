import axios from "axios";

export const getallnotifications = async () => {
  try {
    const response = await axios.get("/api/notification/getallnotification", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      const notification = response?.data?.user?.notifications;
      return notification;
    }
  } catch (error) {
    console.error(error);
  }
};
