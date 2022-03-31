import React, { useContext } from "react";
import { MenuContext } from "store/contexts/MenuContext";
import { Menu } from "types/Menu";
import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";
import { Routes } from "utils/routes";

export default function ItensTable() {
  const { itens, setItens, updateItem, removeItem } = useContext(MenuContext);
  let navigate = useNavigate();

  const updItem = async (item: Menu) => {
    await updateItem(item);
    new Notyf().success("Item atualizado");
  };

  const deleteItem = async (item: Menu) => {
    await removeItem(item);
    new Notyf().success("Item removido");
  };

  const onChange = (itemId: number, propKey: string, propValue: string) => {
    console.log(itens);
    let updatedItens = itens.map((item: any) => {
      if (item.id === itemId) {
        item[propKey] = propValue;
      }
      return item;
    });
    setItens(updatedItens);
  };

  return (
    <>
      {itens && (
        <div>
          <h4>Itens do Menu</h4>
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Descrição/Link de imagem</th>
                    <th>Quant.</th>
                  </tr>
                </thead>
                <tbody>
                  {itens &&
                    itens.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              onChange(item.id, "name", e.target.value);
                            }}
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              onChange(item.id, "description", e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => {
                              onChange(item.id, "price", e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.quant}
                            onChange={(e) => {
                              onChange(item.id, "quant", e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-warning"
                            type="button"
                            onClick={() => updItem(item)}
                          >
                            <i className="bi bi-pencil-fill" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            type="button"
                            onClick={() => deleteItem(item)}
                          >
                            <i className="bi bi-trash3-fill" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-2 offset-5">
              <button
                className="btn btn-sm btn-link"
                type="button"
                onClick={() => navigate(Routes.MENU)}
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
