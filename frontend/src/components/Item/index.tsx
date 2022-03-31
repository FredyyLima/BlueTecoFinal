import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "utils/routes";
import { Notyf } from "notyf";
import { createMenu } from "requests/menu";
import { Menu } from "types/Menu";

export default function Item() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quant, setQuant] = React.useState("");
  let navigate = useNavigate();

  const submit = async () => {
    let response = await createMenu({
      name,
      price: Number(price),
      description,
      quant: Number(quant),
    } as unknown as Menu);
    if (!response.error) {
      navigate(Routes.LOGIN);
      new Notyf().success("Item cadastrado");
    } else {
      if (response.message && response.message.length) {
        let text = "";
        response.message.forEach((msg: string) => {
          text += msg + " ";
        });
        new Notyf().error({
          message: text,
          dismissible: true,
          ripple: false,
          duration: 10000,
        });
      } else {
        new Notyf().error(response.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Nome</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label>Preço</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Descrição/Link de imagem</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setQuant(e.target.value)}
                  />
                  <label>Quantidade</label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="button"
                    onClick={submit}
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
