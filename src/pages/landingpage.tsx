import { useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import "../styles/landingpage.scss";
import { FindPoll } from "../components/find_poll";

export function LandingPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main id="landingpagemain">
        <article>
          <FindPoll />
        </article>
      </main>

      {/*om man er logget inn eller ikke må man ha id-en til pollen for å stemme,
      noen poller sjekker i tillegg om man er logget inn */}
      <Footer />
    </>
  );
}
