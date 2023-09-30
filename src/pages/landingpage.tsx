import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Publicpoll } from "../components/publicpoll";
import { Title } from "../components/title";

export function LandingPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
        <Title />
        <Publicpoll />
      <Footer />
    </>
  );
}
