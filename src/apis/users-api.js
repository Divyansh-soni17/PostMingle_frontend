import axios from "axios";

const baseUrl = "https://postmingle-backend.onrender.com/";

export const userLogin = async (email, password) => {
  console.log(email);
  console.log(password);
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    baseUrl + "api/v1/login",
    { email, password },
    config
  );
  return data;
};

export const userSignup = async (name, email, password) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    baseUrl + "api/v1/register",
    { name, email, password },
    config
  );
  return data;
};
