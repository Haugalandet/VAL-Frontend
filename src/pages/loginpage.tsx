import { Navigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";
import { useState } from "react";
import { useUser } from "../components/user_context";
import { useCookies } from "react-cookie";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["Authorization"]);
  const user = useUser();

  if (user.username !== "") {
    login();
  }

  // @ts-ignore
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // @ts-ignore
  const handlePasswordChange = (event) => {
    let pswd = event.target.value;
    setPassword(pswd);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="input">
        <Title title="Poling Polions" />
        <h3>Login</h3>
        <article>
          <section>
            <label htmlFor="username">Username: &nbsp;</label>
            <br />
            <label htmlFor="password">Password: &nbsp; </label>
          </section>
          <section>
            <input
              itemType="text"
              id="username"
              onChange={handleUsernameChange}
            ></input>
            <br />
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
            ></input>
          </section>
        </article>
        <button className="login" onClick={() => login()}>
          Login
        </button>
      </main>

      <Footer />
    </>
  );

  function login() {
    axios
      .post(ApiRoot("auth/login"), {
        username: username,
        password: password,
      })
      .then((res) => {
        setCookie("Authorization", res.data);
        user.username = username;
        user.password = password;
        <Navigate to={"/dashboard"} />;
      })
      .catch((err) => console.log(err));
  }
}
