/* eslint-disable no-useless-catch */
import axios from "axios";
import { getToken } from "./auth";

export const url = "http://159.223.74.74:8000";

/**
 * @returns {AxiosResponse}
 */

export const getCollectionAllReport = async () => {
  try {
    const res = await axios.get(`${url}/admin/reports`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getReport = async (id) => {
  try {
    const res = await axios.get(`${url}/admin/reports/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReport = async (id) => {
  try {
    await axios.delete(`${url}/admin/reports/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const validationReport = async (reportId, value) => {
  try {
    await axios.post(
      `${url}/admin/validation/${reportId}`,
      { value },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
