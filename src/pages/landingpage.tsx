import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Publicpoll } from "../components/publicpoll";
import { Title } from "../components/title";
import "../styles/landingpage.scss";

export function LandingPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main id="landingpagemain">
        <article>
          <section id="landingpagesection">
            Enter poll id to vote: <br />
            <input type="text" inputMode="numeric" pattern="[0-9]+" />
          </section>
        </article>
      </main>

      {/*om man er logget inn eller ikke må man ha id-en til pollen for å stemme,
      noen poller sjekker i tillegg om man er logget inn */}
      <Footer />
    </>
  );
}
