import React, { useContext } from "react";
import { MenuContext } from "store/contexts/MenuContext";
import { TableContext } from "store/contexts/TableContext";
import { Pedido } from "types/Pedido";

export default function Table() {
  const { itens } = useContext(MenuContext);
  const { orders, removeFromOrders } = useContext(TableContext);

  const deleteOrder = (item: Pedido) => {
    removeFromOrders(item);
  };

  const getItemById = (id: number) => {
    return itens.find((item) => item.id === id);
  };

  return (
    <>
      {orders && (
        <div>
          <h4>Pedidos</h4>
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <table className="table">
                <tbody>
                  {orders &&
                    orders.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            type="button"
                            onClick={() => deleteOrder(item)}
                          >
                            X
                          </button>
                        </td>
                        <td>{getItemById(Number(item.menuId))?.name}</td>
                        <td>{item.tableId}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
