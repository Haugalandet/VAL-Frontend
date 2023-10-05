import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import "../styles/form.scss";

export function LoginPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Title title="Poling Polions" />
        <h3>Login</h3>
        <article>
          <section>
            <label htmlFor="username">Username: &nbsp;</label>
            <br />
            <label htmlFor="password">Password: &nbsp; </label>
          </section>
          <section>
            <input itemType="text" id="username"></input>
            <br />
            <input type="password" id="password"></input>
          </section>
        </article>
      </main>

      <button className="login" onClick={() => login()}>
        Login
      </button>
      <Footer />
    </>
  );
}

function login() {
  let name = document.getElementById("#username");
  let pswd = document.getElementById("#password");

  axios
    .post(ApiRoot("auth/login"), {
      username: name,
      password: pswd,
    })
    .then((_) => {
      console.log("Logged in");
    })
    .catch((err) => console.log(err));
}
