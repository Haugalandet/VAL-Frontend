import "../styles/navbar.scss";
import "../styles/home.scss";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { useCookies } from "react-cookie";

export function Navbar() {
  const [cookie, _, removeCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return cookie["Authorization"] !== undefined;
  };

  const logout = () => {
    removeCookie("Authorization");
    navigate("/");
  };

  return (
    <nav>
      <NavLink to={!isLoggedIn() ? "/" : "/dashboard"} className="logo-link">
        <img src={logo} alt="VAL Logo" />
      </NavLink>
      <div className="title">Poloins AS</div>
      <div className="buttonsdiv">
        {isLoggedIn() ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <NavLink to="/register">
              <button>Register</button>
            </NavLink>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
