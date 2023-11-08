import { useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Publicpoll } from "../components/publicpoll";
import { Title } from "../components/title";
import "../styles/landingpage.scss";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { useNavigate } from "react-router";

export function LandingPage() {
  const [pollId, setPollId] = useState(0);
  const navigate = useNavigate();

  // @ts-ignore
  const updatePoll = (event) => {
    // @ts-ignore
    setPollId(event.target.value);
  };

  const findPoll = () => {
    navigate(`poll/${pollId}`);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main id="landingpagemain">
        <article>
          <section id="landingpagesection">
            Enter poll id to vote: <br />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              onChange={updatePoll}
            />
            <button onClick={findPoll}>Find Poll</button>
          </section>
        </article>
      </main>

      {/*om man er logget inn eller ikke må man ha id-en til pollen for å stemme,
      noen poller sjekker i tillegg om man er logget inn */}
      <Footer />
    </>
  );
}
