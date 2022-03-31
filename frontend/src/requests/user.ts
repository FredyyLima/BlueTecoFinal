import { User } from "../types/User";
import { axiosInstance as axios } from "./global";

export const createUser = async (user: User): Promise<any> => {
  let res: any = await axios
    .post("user/create", user)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};
