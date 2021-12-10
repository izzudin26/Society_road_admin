import axios from "axios";

export const url = "http://159.223.74.74";

/**
 * @returns {AxiosResponse}
 */

export const getCollectionAllReport = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios(`${url}/admin/report`);
    return res;
  } catch (error) {
    throw error;
  }
};
