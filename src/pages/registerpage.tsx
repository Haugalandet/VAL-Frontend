import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import "../styles/form.scss";

export function RegisterPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Title title="Poling Polions" />
        <article>
          <section>
            <label htmlFor="uname">Username: &nbsp;</label>
            <br />
            <label htmlFor="passwd1">Password: &nbsp;</label>
            <br />
            <label htmlFor="passwd2">Repeat password: &nbsp;</label>
          </section>
          <section>
            <input type="text" id="uname" />
            <br />
            <input type="password" id="passwd1" />
            <br />
            <input type="password" id="passwd2" />
          </section>
        </article>
        <br />
        <button>Register</button>
        <br />
      </main>
      <Footer />
    </>
  );
}
