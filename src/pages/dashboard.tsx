import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export function Dashboard() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <h1>Dashboard</h1>
      <NavLink to={"create"}>New Poll</NavLink>
      <Footer />
    </>
  );
}
