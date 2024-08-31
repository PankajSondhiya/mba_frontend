import { toast } from "react-toastify";
import { AxiosInstance } from "../util/axiosInstance";
import { useFirebase } from "../configs/firebase.config";

export const signIn = async function (email, password, firebaseLogin) {
  const response = await AxiosInstance.post("/mba/api/v1/auth/signin", {
    email: email,
    password: password,
  });
  await firebaseLogin(email, password);
  const data = response.data;
  if (!data.userId && data.message) {
    throw new Error("APPROVAL PENDING");
  }
  localStorage.setItem("name", data.name);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("email", data.email);
  localStorage.setItem("userTypes", data.userTypes);
  localStorage.setItem("userStatus", data.userStatus);
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("_id", data._id);

  return response.data;
};

export const signUp = async (user) => {
  try {
    const { data } = AxiosInstance.post("/mba/api/v1/auth/signup", user);
    return data;
  } catch (ex) {
    toast.error(ex.message);
    console.log(ex);
  }
};

export const updatePassword = async (userId, user) => {
  const URL = `/mba/api/v1/users/${userId}`;
  try {
    const { data } = await AxiosInstance.put(URL, user);
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const signOut = () => {
  localStorage.clear();
};
