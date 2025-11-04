import axios from "axios";

export const getcontacts = async () => {
  try {
    const res = await axios.get("/api/messages/getcontacts", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      // Backend now returns full contact info including last message
      const contacts = res.data.contacts || [];
      return contacts;
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return [];
  }
};
