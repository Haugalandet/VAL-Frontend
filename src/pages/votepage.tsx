import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { Navigate } from "react-router";
import { RenderPoll } from "../components/render_poll";
import "../styles/home.scss";

export function VotePage(props: { poll_id: string }) {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios
      .get(ApiRoot(`poll/${props.poll_id}/vote`)) //poll instance instead
      .then((res) => {
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.poll_id]);

  if (!poll) {
    // return <Navigate to={`poll/${props.poll_id}/vote`} />;
  }

  let testPoll = {
    id: 69,
    title: "Testicle Poll",
    description: "Are testicles?",
    choices: [
      "Yes",
      "No",
      "Maybe",
      "Who are you, and how did you get into my house???",
    ],
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="input">
        <Title title="Poling Poloins" />
        <RenderPoll poll={testPoll} />
      </main>
      <Footer />
    </>
  );
}
