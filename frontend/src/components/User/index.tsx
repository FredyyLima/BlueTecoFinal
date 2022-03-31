import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "utils/routes";
import { Notyf } from "notyf";
import { createUser } from "requests/user";
import { User as UserType } from "types/User";

export default function User() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [image, setImage] = React.useState("");
  let navigate = useNavigate();

  const submit = async () => {
    let response = await createUser({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      image,
    } as UserType);
    if (!response.error) {
      navigate(Routes.LOGIN);
      new Notyf().success("Usuário cadastrado");
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label>First Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label>Lasst Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <label>Image (link)</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Confirme</label>
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
