import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { Navigate } from "react-router";
import { RenderPollVote } from "../components/render_poll";
import { useTest } from "../components/test_context";
import { defaultPoll } from "../utils/funcs";

export function VotePage(props: { poll_id: string }) {
  const [poll, setPoll] = useState(defaultPoll());
  const test = useTest();

  useEffect(() => {
    axios
      .get(ApiRoot(`poll/${props.poll_id}/vote`)) //poll instamce instead
      .then((res) => {
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.poll_id]);

  if (poll.id === -1 && !test) {
    return <Navigate to={`polls/${props.poll_id}/vote`} />;
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
      <main>
        <Title title="Poling Poloins" />
        <RenderPollVote poll={test ? testPoll : poll} />
      </main>
      <Footer />
    </>
  );
}
