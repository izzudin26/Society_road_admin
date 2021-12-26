import axios from "axios";
import { getToken } from "./auth";

export const url = "http://159.223.74.74";

/**
 * @returns {AxiosResponse}
 */

export const getCollectionAllReport = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios(`${url}/admin/reports`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
