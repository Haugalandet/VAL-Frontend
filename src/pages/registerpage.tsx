import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";
import "../styles/home.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [_, setCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  // @ts-ignore
  const register = (_) => {
    if (password1 !== password2) {
      alert("Password are not equal");
      return;
    }

    axios
      .post(ApiRoot("users"), {
        username: username,
        password: password1,
      })
      .then((_) => {
        axios
          .post(ApiRoot("auth/login"), {
            username: username,
            password: password1,
          })
          .then((res) => {
            setCookie("Authorization", res.data);
            navigate("/dashboard");
          })
          .catch((err) => console.log(err));
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
        <h2>Poling Polions</h2>
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
