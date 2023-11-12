import { useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";
import { useState } from "react";
import { useCookies } from "react-cookie";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  // @ts-ignore
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // @ts-ignore
  const handlePasswordChange = (event) => {
    let pswd = event.target.value;
    setPassword(pswd);
  };

  // @ts-ignore
  const keyDown = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="input">
        <h2>Poling Polions</h2>
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
              onKeyDown={keyDown}
            ></input>
            <br />
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              onKeyDown={keyDown}
            ></input>
          </section>
        </article>
        <button className="login" onClick={login}>
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
        if (cookie["Authorization"] !== undefined) {
          removeCookie("Authorization");
        }

        setCookie("Authorization", res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  }
}
