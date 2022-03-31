import React, { useContext, useEffect } from "react";
import { createOrder, createTable, getItens } from "requests/mesa";
import { MenuContext } from "store/contexts/MenuContext";
import { Notyf } from "notyf";
import Bag from "./Bag";
import Item from "./Item";
import { AuthContext } from "store/contexts/AuthContext";
import { TableContext } from "store/contexts/TableContext";
import Table from "components/Table";
import { useNavigate } from "react-router-dom";
import { Routes } from "utils/routes";

export default function Menu() {
  const { loggedUser } = useContext(AuthContext);
  const { itens, setItens, bag, emptyBag } = useContext(MenuContext);
  const { table, setTable, orders, addToOrders } = useContext(TableContext);
  let navigate = useNavigate();

  const loadItens = async () => {
    let loadedItens = await getItens();
    setItens(loadedItens);
  };

  const askOrder = async () => {
    if (bag && bag.length === 0) {
      new Notyf().error("Sacola está vazia");
      return;
    } else {
      if (!table || Object.keys(table).length === 0) {
        console.log("IFFFF");
        let newTable = await createTable(loggedUser);
        setTable({ ...newTable });
        setTable(newTable);
        addItens(newTable.id);
      } else {
        console.log("ELSEEEE");
        addItens(table.id);
      }
    }
  };

  const addItens = (tableId: string) => {
    bag.forEach(async (item) => {
      let order = await createOrder(tableId, item.id);
      console.log("order created", order);
      if (order.menuId && order.tableId) addToOrders(order);
    });
    if (orders) emptyBag();
  };

  useEffect(() => {
    loadItens();
  }, []);

  return (
    <>
      <button
        className="btn btn-sm btn-link"
        type="button"
        onClick={() => navigate(Routes.ITEM)}
      >
        Cadastrar item
      </button>
      <br />
      <button
        className="btn btn-sm btn-link"
        type="button"
        onClick={() => navigate(Routes.ITENS)}
      >
        Todos os itens
      </button>

      {itens && itens.length && (
        <div className="container">
          <div className="row">
            <h3>Menu</h3>

            {itens.map((item) => (
              <div className="col" key={item.id}>
                <Item menu={item} />
              </div>
            ))}
          </div>
          <br />
          <Bag />
          <br />
          <button className="btn btn-outline-success" onClick={askOrder}>
            <i className="add icon" /> Fazer Pedido
          </button>
          <br /> <br />
          <Table />
        </div>
      )}
    </>
  );
}
