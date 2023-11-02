import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { Poll } from "../utils/types";
import { RenderPollTiny } from "../components/render_poll";
import { pollExamples } from "../utils/funcs";

export function Dashboard() {
  const [allPolls, setAllPolls] = useState(pollExamples());

  useEffect(() => {
    let config = {
      headers: {},
    };
    axios
      .get(ApiRoot("polls"), config)
      .then((res) => {
        console.log(res);
        setAllPolls(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  });

  return (
    <>
      <header>
        <Navbar />
      </header>
      <h1>Dashboard</h1>
      <NavLink to={"create"}>New Poll</NavLink>
      <aside>
        {allPolls.map((poll) => {
          return <RenderPollTiny poll={poll} />;
        })}
      </aside>
    </>
  );
}
