import { useState, useContext } from "react";
import Input from "../../form/Input";
import formStyles from "../../form/Form.module.css";
import { Link } from "react-router-dom";

// context
import { Context } from "../../../context/UserContext";

const Login = () => {
  const [user, setUser] = useState({});

  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });

    console.log(user);
  }

  function handleSubmit(e) {
    e.preventDefault();

    login(user);
  }

  return (
    <div>
      <section className={formStyles["form-container"]}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            handleOnChange={handleChange}
          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite a sua senha"
            handleOnChange={handleChange}
          />

          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link to="/register">Clique aqui</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
