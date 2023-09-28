import "../styles/navbar.scss";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

export function Navbar() {
  return (
    <nav>
      <img src={logo} alt="VAL Logo"/>
      <div className="buttonsdiv">
        <NavLink to="/dashboard">
          <button>Logg inn</button>
        </NavLink>
        <NavLink to="/dashboard">
          <button>Registrer bruker</button>
        </NavLink>
      </div>
    </nav>
  );
}
