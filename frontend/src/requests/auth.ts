import { LoginInputDto, LoginResponseDto } from "../types/User";
import { axiosInstance as axios } from "./global";

export const post = async (login: LoginInputDto): Promise<LoginResponseDto> => {
  let res: LoginResponseDto = await axios
    .post("auth", login)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      return response.data;
    })
    .catch((error) => error.response.data);

  return res;
};
