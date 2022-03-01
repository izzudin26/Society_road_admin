import axios from "axios";
import { getToken } from "./auth";
import { url } from "./report";

export const getMessagesFromAdmin = async () => {
  const res = await axios.get(`${url}/message`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};

export const getMessageByOpponent = async (opponent) => {
  const res = await axios.get(`${url}/message/opponent/${opponent}`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};

export const sendMessage = async ({ to, description } = {}) => {
  await axios.post(
    `${url}/message/${to}`,
    {
      description,
    },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
};
