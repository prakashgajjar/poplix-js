import axios from "axios";

export const getcontacts = async () => {
  try {
    const res = await axios.get(
      "/api/messages/getcontacts",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.status == 200) {
      const contacts = res.data.user.contacts;
      return contacts;
    }
  } catch (error) {
    console.error(error);
  }
};
