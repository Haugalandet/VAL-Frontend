import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { CreatePoll } from "../components/render_poll";
import { ApiRoot } from "../utils/consts";
import axios, { AxiosRequestConfig } from "axios";
import { defaultPoll } from "../utils/funcs";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import "../styles/create_poll.scss";

export function CreatePollPage() {
  const [poll, setPoll] = useState(defaultPoll());
  const [cookie] = useCookies(["Authorization"]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };

    axios
      .get(ApiRoot(`poll/${id}/vote`), config)
      .then((res) => {
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cookie]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <h1>Create poll</h1>
        <div className="create-poll.container">
          <CreatePoll poll={poll} />
        </div>
      </main>
      <Footer />
    </>
  );
}
