import axios from "axios";

export const url = "http://159.223.74.74:8000";

export const login = async ({ username, password, role } = {}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (
      (role != "admin" && username == "admin") ||
      (role == "admin" && username != "admin")
    ) {
      throw "Mohon mencocokan username dan role";
    }
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
      localStorage.setItem("role", role);
    } else {
      throw req.data.message;
    }
  } catch (error) {
    throw error;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
