import React, { useContext } from "react";
import { MenuContext } from "store/contexts/MenuContext";
import { Menu } from "types/Menu";

export default function Item(props: { menu: Menu }) {
  const { addToBag } = useContext(MenuContext);
  const [quant, setQuant] = React.useState(0);

  const addItem = (item: Menu) => {
    item.quant = quant;
    addToBag(item);
  };

  return (
    <div className="card" style={styles.container}>
      <img
        className="card-img-top"
        style={styles.image}
        src={props.menu.description}
        alt="Card image cap"
      />
      <div className="card-body" style={styles.body}>
        <h5 className="card-title">{props.menu.name}</h5>
        <p className="card-text">R${props.menu.price}</p>

        <div style={styles.quantButtons}>
          <div className="input-group-prepend">
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={() => {
                if (quant > 0) setQuant(quant - 1);
              }}
            >
              -
            </button>
          </div>
          {quant}
          <div className="input-group-append">
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={() => setQuant(quant + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <button
            className="btn btn-sm btn-outline-success"
            type="button"
            onClick={() => addItem(props.menu)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: 200,
  },
  body: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column" as const,
  },
  image: {
    alignSelf: "center",
    width: 50,
    marginTop: 10,
  },
  quantButtons: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row" as const,
  },
};
