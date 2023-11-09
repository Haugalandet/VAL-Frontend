import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { ApiRoot } from "../utils/consts";
import { RenderPollView } from "../components/render_poll";
import { defaultPoll } from "../utils/funcs";
import { Footer } from "../components/footer";
import { useCookies } from "react-cookie";

export function ViewPoll() {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState(defaultPoll());
  const [cookie] = useCookies(["Authorization"]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };
    axios
      .get(ApiRoot(`polls/${id}`), config)
      .then((res) => {
        console.log(res);
        setPoll(res.data);
      })
      .catch((res) => {
        console.error(res);
      });
  }, [cookie, id]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <h1>View poll</h1>
      <RenderPollView poll={poll} />
      <Footer />
    </>
  );
}
