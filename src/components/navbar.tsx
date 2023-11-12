import "../styles/navbar.scss";
import "../styles/home.scss";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import { useCookies } from "react-cookie";

export function Navbar() {
  const [cookie] = useCookies(["Authorization"]);

  const isLoggedIn = () => {
    return cookie["Authorization"] !== undefined;
  };

  return (
    <nav>
      <NavLink to={!isLoggedIn() ? "/" : "/dashboard"} className="logo-link">
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
