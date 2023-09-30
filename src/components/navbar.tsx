import "../styles/navbar.scss";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

export function Navbar() {
  return (
    <nav>
      <div>Poloins AS</div>
      <NavLink to="/" className="logo-link">
        <img src={logo} alt="VAL Logo"/>
      </NavLink>
      <div className="buttonsdiv">
        <NavLink to="/login">
          <button>Logg inn</button>
        </NavLink>
        <NavLink to="/register">
          <button>Registrer bruker</button>
        </NavLink>
      </div>
    </nav>
  );
}
