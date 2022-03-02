import axios from "axios";
import { getToken } from "./auth";
import { url } from "./report";

export const sendFeedback = async ({ to, feedback } = {}) => {
  const res = await axios.post(
    `${url}/feedback/${to}`,
    { message: feedback },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return res.data;
};
