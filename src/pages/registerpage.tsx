import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";
import "../styles/home.scss";
import { useState } from "react";
import { stringify } from "querystring";

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  // @ts-ignore
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // @ts-ignore
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  };

  // @ts-ignore
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
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
        <button onClick={() => register()}>Register</button>
      </main>
      <Footer />
    </>
  );

  function register() {
    // TODO: Add default axios instance too be used everywhere
    const axiosInstance = axios.create({
      baseURL: ApiRoot("users"),
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance
      .post(
        ApiRoot("users"),
        JSON.stringify({
          username: username,
          password: password1,
          passwordrepeated: password2,
        })
      )
      .then((_) => {
        console.log("User registered");
      })
      .catch((err) => console.log(err));
  }
}
