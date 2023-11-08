import "../styles/navbar.scss";
import "../styles/home.scss";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

export function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="logo-link">
        <img src={logo} alt="VAL Logo" />
      </NavLink>
      <div className="title">Poloins AS</div>
      <div className="buttonsdiv">
        <NavLink to="/register">
          <button>Registrer bruker</button>
        </NavLink>
        <NavLink to="/login">
          <button>Logg inn</button>
        </NavLink>
      </div>
    </nav>
  );
}
