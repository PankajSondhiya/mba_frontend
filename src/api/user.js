import { toast } from "react-toastify";
import { AxiosInstance } from "../util/axiosInstance";

export const fetchAllUsers = async function () {
  try {
    const { data } = await AxiosInstance.get("/mba/api/v1/users");
    return data;
  } catch (ex) {
    toast.error("Error in fetching users");
  }
};

export const updateUserDetails = async (user) => {
  try {
    const { data } = await AxiosInstance.put(
      `/mba/api/v1/users/details/${user._id}`,
      user
    );
    return data;
  } catch (ex) {
    toast.error(ex.message);
    console.log(ex);
  }
};
