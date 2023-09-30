import "../styles/navbar.scss";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <div>Poloins AS</div>
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
