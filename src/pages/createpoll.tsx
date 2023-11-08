import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { CreatePoll } from "../components/render_poll";
import { ApiRoot } from "../utils/consts";
import axios from "axios";
import { defaultChoice, defaultPoll } from "../utils/funcs";
import { useParams } from "react-router";

export function CreatePollPage() {
  const [poll, setPoll] = useState(defaultPoll());

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(ApiRoot(`poll/${id}/vote`))
      .then((res) => {
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!poll) {
    // return <Navigate to={`poll/${props.poll_id}/vote`} />;
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
      <main>
        <h1>Create poll</h1>
        <CreatePoll poll={testPoll} />
      </main>
      <Footer />
    </>
  );
}
