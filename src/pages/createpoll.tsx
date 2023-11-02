import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { CreatePoll, RenderPoll } from "../components/render_poll";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import { defaultChoice } from "../utils/funcs";

export function CreatePollPage(props: { poll_id: number }) {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios
      .get(ApiRoot(`poll/${props.poll_id}/vote`))
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
      <main>
        <h1>Edit poll</h1>
        <CreatePoll poll={testPoll} />
      </main>
      <Footer />
    </>
  );
}
