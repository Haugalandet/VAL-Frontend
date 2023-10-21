import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";
import "../styles/home.scss";

export function RegisterPage() {
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
            <input type="text" id="uname" />
            <br />
            <input type="password" id="passwd1" />
            <br />
            <input type="password" id="passwd2" />
          </section>
        </article>
        <button>Register</button>
      </main>
      <Footer />
    </>
  );

  function register() {
    let username = document.getElementById("#username");
    let password = document.getElementById("#password1");
    let passwordrepeated = document.getElementById("#password2");

    axios
      .post(ApiRoot("/users"), {
        username: username,
        password: password,
        passwordrepeated: passwordrepeated,
      })
      .then((_) => {
        console.log("User registered");
      })
      .catch((err) => console.log(err));
  }
}
