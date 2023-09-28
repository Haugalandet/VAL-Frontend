import "../styles/navbar.scss";

export function Navbar() {
  return (
    <nav>
      <div>Polions</div>
      <div className="buttonsdiv">
        <button>Logg inn</button>
        <button>Registrer bruker</button>
      </div>
    </nav>
  );
}
