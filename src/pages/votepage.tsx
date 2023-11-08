import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { Navigate, useParams } from "react-router";
import { RenderPoll } from "../components/render_poll";
import "../styles/home.scss";
import { RenderPollVote } from "../components/render_poll";
import { defaultChoice, defaultPoll } from "../utils/funcs";

export function VotePage() {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState(defaultPoll());

  useEffect(() => {
    axios
      .get(ApiRoot(`polls/${id}/instances`))
      .then((res) => {
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(ApiRoot(`polls/${poll.id}/choices`))
      .then((res) => {
        let p = poll;
        p.choices = res.data;
        setPoll(p);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [poll]);

  /*
    TODO: Create error vote page
  */
  if (poll.choices.length === 0) {
    //return <Navigate to={`poll/${poll.id}`} />;
  }

  let testPoll = {
    id: 69,
    title: "Test Poll",
    description: "Are is this a test?",
    needLogin: false,
    choices: [
      defaultChoice("Yes"),
      defaultChoice("No"),
      defaultChoice("Maybe"),
      defaultChoice("Who are you, and how did you get into my house???"),
    ],
  };

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
