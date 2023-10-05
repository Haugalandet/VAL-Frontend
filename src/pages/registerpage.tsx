import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import "../styles/register.scss";

export function RegisterPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <form action="">
          <article>
            <div className="labeldiv">
              <label htmlFor="uname">Username: &nbsp;</label>
              <br />
              <label htmlFor="passwd1">Password: &nbsp;</label>
              <br />
              <label htmlFor="passwd2">Repeat password: &nbsp;</label>
            </div>
            <div>
              <input type="text" name="uname" />
              <br />
              <input type="password" name="passwd1" />
              <br />
              <input type="password" name="passwd2" />
            </div>
          </article>
          <br />
          <button>Register</button>
          <br />
        </form>
      </main>
      <Footer />
    </>
  );
}
