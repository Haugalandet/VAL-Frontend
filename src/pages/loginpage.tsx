import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export function LoginPage() {
    return (
        <>
        <header>
            <Navbar />
        </header>
        <NavLink to="/dashboard">
            <button>
                Login
            </button>
        </NavLink>
        <Footer />
        </>
    );
}