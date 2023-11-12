import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  useEffect(() => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };
    axios
      .get(ApiRoot(`polls/${id}`), config)
      .then((res) => {
        setPoll(res.data);
        if (res.data.startTime === null) {
          navigate("/poll");
        }
      })
      .catch((res) => {
        console.error(res);
      });
  }, [cookie, id, navigate]);

  useEffect(() => {
    const sse = new EventSource(ApiRoot(`polls/${id}/sse`), {
      withCredentials: true,
    });

    //@ts-ignore
    const handleStream = (data) => {
      setPoll(data);
    };

    sse.onmessage = (event) => {
      console.log(event);
      handleStream(event.data);
    };

    sse.onerror = (err) => {
      sse.close();
      console.error(err);
    };

    return () => {
      sse.close();
    };
  });

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
