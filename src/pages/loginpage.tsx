import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import { ApiRoot } from "../utils/consts";
import axios from "axios";

export function LoginPage() {
    return (
        <>
        <header>
            <Navbar />
        </header>

        <main>
            <Title title="Poling Polions"/>

            <h3>Login</h3>
            <label>Username</label>
            <input itemType="text" id="username"></input>

            <label>Password</label>
            <input itemType="password" id="password"></input>
        </main>

        <button className="login" onClick={() => login()}>
            Login
        </button>
        <Footer />
        </>
    );
}


function login() {
    let name = document.getElementById("#username");
    let pswd = document.getElementById("#password");

    axios.post(ApiRoot("auth/login"), {
            username: name,
            password: pswd,
        }).then(_ => {console.log("Logged in")
        }).catch(err => console.log(err));
}