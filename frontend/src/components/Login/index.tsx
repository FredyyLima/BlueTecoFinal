import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "store/contexts/AuthContext";
import { Routes } from "utils/routes";
import { Notyf } from "notyf";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useContext(AuthContext);
  let navigate = useNavigate();

  const submit = async () => {
    let response = await login({ email: "user@email.com", password: "123456" });
    if (response.user) navigate(Routes.MENU);
    else new Notyf().error(response);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                BlueTeco
              </h5>
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
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="button"
                    onClick={submit}
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 offset-5">
          <button
            className="btn btn-sm btn-link"
            type="button"
            onClick={() => navigate(Routes.USER)}
          >
            Criar usuário
          </button>
        </div>
      </div>
    </div>
  );
}
