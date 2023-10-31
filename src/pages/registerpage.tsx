import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";
import "../styles/home.scss";
import { useState } from "react";
import { useUser } from "../components/user_context";
import { Navigate } from "react-router-dom";

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const user = useUser();

  // @ts-ignore
  const register = (_) => {
    if (password1 !== password2) {
      alert("Password are not equal");
    }

    axios
      .post(ApiRoot("users"), {
        username: username,
        password: password1,
      })
      .then((_) => {
        console.log("User registered");
        user.username = username;
        user.password = password1;
      })
      .catch((err) => console.log(err));
  };

  // @ts-ignore
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // @ts-ignore
  const handlePassword1Change = (event) => {
    let pswd = event.target.value;
    setPassword1(pswd);
  };

  // @ts-ignore
  const handlePassword2Change = (event) => {
    let pswd = event.target.value;
    setPassword2(pswd);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="input">
        <Title title="Poling Polions" />
        <h3>Register</h3>
        <article>
          <section>
            <label htmlFor="username">Username: &nbsp;</label>
            <br />
            <label htmlFor="password1">Password: &nbsp;</label>
            <br />
            <label htmlFor="password2">Repeat password: &nbsp;</label>
          </section>
          <section>
            <input type="text" id="uname" onChange={handleUsernameChange} />
            <br />
            <input
              type="password"
              id="passwd1"
              onChange={handlePassword1Change}
            />
            <br />
            <input
              type="password"
              id="passwd2"
              onChange={handlePassword2Change}
            />
          </section>
        </article>
        <button onClick={register}>Register</button>
      </main>
      <Footer />
    </>
  );
}
