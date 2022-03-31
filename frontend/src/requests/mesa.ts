import { Menu } from "types/Menu";
import { Pedido } from "types/Pedido";
import { Table } from "types/Table";
import { User } from "../types/User";
import { axiosInstance as axios } from "./global";

export const getItens = async (): Promise<Menu[]> => {
  let res: Menu[] = await axios
    .get("menu/buscarTodos")
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};

export const createTable = async (user: User): Promise<Table> => {
  let res: Table = await axios
    .post("table", user)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};

export const createOrder = async (
  tableId: string,
  menuId: number
): Promise<Pedido> => {
  let res: Pedido = await axios
    .post("pedido", { tableId, menuId })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};

export const deleteOrder = async (order: Pedido): Promise<Pedido> => {
  let res: Pedido = await axios
    .delete(`pedido/${order.id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return res;
};
