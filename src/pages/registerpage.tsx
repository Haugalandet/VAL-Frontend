import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export function RegisterPage() {
    return (
        <>
        <header>
            <Navbar />
        </header>
        <NavLink to="/login">
            <button>
                Register user
            </button>
        </NavLink>
        <Footer />
        </>
    );
}