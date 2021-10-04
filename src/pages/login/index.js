import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { userLogin } from "../../services/api.js";
import { Input } from "../../components/Input.js";
import { Button } from "../../components/Button.js";
import { Link } from "react-router-dom";
import validateLogin from "../login/validateLogin";
import logoMonsterGrande from "../../img/logoMonsterGrande.png";
import "./index.css";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateLogin(formValues));

    userLogin(formValues)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        const token = json.token;
        localStorage.setItem("token", token);

        if (json.role === "salão") {
          history.push("/Hall");
        } else if (json.role === "cozinha") {
          history.push("/Kitchen");
        }
      })

      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <main className="container">
      <div className="div-image">
        <img
          className="imgRegister"
          src={logoMonsterGrande}
          alt="icon-register"
        />
        <h1 className="letra-logo">Monster Burguer</h1>
      </div>
      <div className="div-main-login">
        <div className="div-login">
          <form className="form-login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Input
              inputType="text"
              inputName="email"
              inputPlaceholder="E-mail"
              inputOnChange={handleInputChange}
              inputValue={formValues.email}
            />
            {errors.email && <p>{errors.email}</p>}
            <Input
              inputType="password"
              inputName="password"
              inputPlaceholder="Senha"
              inputOnChange={handleInputChange}
              inputValue={formValues.password}
            />
            {errors.password && <p>{errors.password}</p>}
            <Button type="submit" value="Entrar"></Button>
            <div className="footer-login">
              Não tem uma conta?
              <Link className="link" to="/Register">
                {" "}
                Cadastre-se{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
