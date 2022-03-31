import { Menu } from "../types/Menu";
import { axiosInstance as axios } from "./global";

export const createMenu = async (Menu: Menu): Promise<any> => {
  let res: any = await axios
    .post("menu", Menu)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};

export const updateMenu = async (item: Menu): Promise<any> => {
  let res: any = await axios
    .patch(`menu/updateItem/${item.id}`, item)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};

export const deleteMenu = async (item: Menu): Promise<Menu> => {
  let res: Menu = await axios
    .delete(`menu/delete-item/${item.id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};
