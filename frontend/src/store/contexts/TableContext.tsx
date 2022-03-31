import React, { useState, useEffect, createContext } from "react";
import { deleteOrder } from "requests/mesa";
import { Pedido } from "types/Pedido";
import { Table } from "types/Table";
import { getStoragedObject } from "utils/store";

interface TableContextData {
  table: Table;
  setTable: Function;
  orders: Pedido[];
  addToOrders: Function;
  removeFromOrders: Function;
}

export const TableContext = createContext<TableContextData>(
  {} as TableContextData
);

const TableProvider = (props: { children: React.ReactNode }) => {
  const [table, setTableRaw] = useState<Table>({} as Table);
  const [orders, setOrders] = useState<Pedido[]>([]);

  const setTable = async (table: Table) => {
    setTableRaw(table);
    localStorage.setItem("table", JSON.stringify(table));
  };

  const addToOrders = async (order: Pedido) => {
    orders.push(order);
    setOrders([...orders]);
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  const removeFromOrders = async (orderToRemove: Pedido) => {
    let deletedOrder = await deleteOrder(orderToRemove);
    if (deletedOrder) {
      let filteredOrders = orders.filter(
        (order) => order.id !== orderToRemove.id
      );
      setOrders(filteredOrders);
      localStorage.setItem("bag", JSON.stringify(filteredOrders));
    }
  };

  useEffect(() => {
    const loadStoragedData = () => {
      const storagedTable = getStoragedObject("table");
      const storagedOrders = getStoragedObject("orders");

      if (storagedTable) setTable(JSON.parse(storagedTable));
      if (storagedOrders) setOrders(JSON.parse(storagedOrders));
    };
    loadStoragedData();
  }, []);

  return (
    <TableContext.Provider
      value={{ table, setTable, orders, addToOrders, removeFromOrders }}
    >
      {props.children}
    </TableContext.Provider>
  );
};

export default TableProvider;
