import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { Navigate } from "react-router";
import { RenderPoll } from "../components/render_poll";
import "../styles/home.scss";
import { RenderPollVote } from "../components/render_poll";
import { defaultPoll } from "../utils/funcs";

export function VotePage(props: { poll_id: string }) {
  const [poll, setPoll] = useState(defaultPoll());
  const [choices, setChoice] = useState([]);

  useEffect(() => {
    axios
      .get(ApiRoot(`polls/${props.poll_id}/instances`))
      .then((res) => {
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.poll_id]);

  useEffect(() => {
    axios
      .get(ApiRoot(`polls/${props.poll_id}/choices`))
      .then((res) => {
        setChoice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.poll_id]);

  /*
    if poll.id is the default id, or if no choices were retrieved we redirect to an error vote page
    TODO: Create error vote page
    (will be missing page atm)
  */
  if (choices.length === 0 && !test) {
    return <Navigate to={`poll/${props.poll_id}`} />;
  }

  let testPoll = {
    id: 69,
    title: "Testicle Poll",
    description: "Are testicles?",
    needLogin: false,
    choices: [
      "Yes",
      "No",
      "Maybe",
      "Who are you, and how did you get into my house???",
    ],
  };

  poll.choices = choices;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="input">
        <Title title="Poling Poloins" />
        <RenderPollVote poll={testPoll} />
      </main>
      <Footer />
    </>
  );
}
