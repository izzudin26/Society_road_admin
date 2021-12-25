import axios from "axios";

export const url = "http://159.223.74.74";

export const login = async ({ username, password } = {}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    let req = await axios.post(
      `${url}/login/admin`,
      { username, password },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (req.status == 200) {
      localStorage.setItem("token", req.data.token);
    } else {
      throw req.data.message;
    }
  } catch (error) {
    throw error;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token;
};
