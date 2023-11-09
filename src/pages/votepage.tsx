import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import axios, { AxiosRequestConfig } from "axios";
import { ApiRoot } from "../utils/consts";
import { useNavigate, useParams } from "react-router";
import "../styles/home.scss";
import { RenderPollVote } from "../components/render_poll";
import { defaultPoll } from "../utils/funcs";
import { useCookies } from "react-cookie";

export function VotePage() {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState(defaultPoll());
  const [cookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };
    axios
      // @ts-ignore
      .get(ApiRoot(`polls/${id}`), config)
      .then((res) => {
        if (res.data.hasUserVoted && res.data.needLogin) {
          navigate(`/polls/${res.data.pollId}/view`);
        }

        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookie, id, navigate]);

  /*
    TODO: Create error vote page
  */
  if (poll.pollId === undefined) {
    navigate(`/poll`);
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="input">
        <h2>Poling Poloins</h2>
        <RenderPollVote poll={poll} />
      </main>
      <Footer />
    </>
  );
}
