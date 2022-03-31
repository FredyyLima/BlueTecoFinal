import React, { useContext } from "react";
import { MenuContext } from "store/contexts/MenuContext";
import { Menu } from "types/Menu";

export default function Item() {
  const { bag, removeFromBag } = useContext(MenuContext);

  const removeItem = (item: Menu) => {
    removeFromBag(item);
  };

  return (
    <>
      {bag && bag.length > 0 && (
        <>
          <h4>Bag</h4>
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <table className="table">
                <tbody>
                  {bag &&
                    bag.map((item) => (
                      <tr key={item.id + item.quant}>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            type="button"
                            onClick={() => removeItem(item)}
                          >
                            X
                          </button>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quant}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
