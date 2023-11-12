import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import axios, { AxiosRequestConfig } from "axios";
import { ApiRoot } from "../utils/consts";
import { useNavigate, useParams } from "react-router";
import "../styles/home.scss";
import "../styles/poll.scss";
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
        console.log(res.data);
        if (
          res.data.hasUserVoted ||
          res.data.needLogin ||
          res.data.startTime === null
        ) {
          navigate(`/polls/${id}/view`);
        }

        setPoll(res.data);
      })
      .catch((err) => {
        navigate(`/poll`);
        console.error(err);
      });
  }, [cookie, id, navigate]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="input">
        <h2>Poling Poloins</h2>
        {/*@ts-ignore*/}
        <RenderPollVote poll={poll} />
      </main>
      <Footer />
    </>
  );
}
