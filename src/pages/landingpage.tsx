import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Publicpoll } from "../components/publicpoll";
import { Title } from "../components/title";
//import "../styles/landingpage.scss";

export function LandingPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Title title="Hot polls" />
        <Publicpoll />
        <Publicpoll />
        <Publicpoll />
        <Publicpoll />
      </main>
      <Footer />
    </>
  );
}
