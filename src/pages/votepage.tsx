import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Title } from "../components/title";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { Navigate } from "react-router";
import { RenderPoll } from "../components/render_poll";

export function VotePage(props: { poll_id: string }) {
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
    return <Navigate to={`poll/${props.poll_id}/vote`} />;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Title title="Poling Poloins" />
      {/* @ts-ignore */}
      <RenderPoll poll={poll} />
      <Footer />
    </>
  );
}
