import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { RenderPollTiny } from "../components/render_poll";
import { isPollOpen, pollExamples } from "../utils/funcs";
import { Poll } from "../utils/types";
import "../styles/dashboard.scss";
import { Footer } from "../components/footer";

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
      <NavLink to={"create"} replace={true}>
        <button>New Poll</button>
      </NavLink>
      <aside>
        {allPolls
          //.filter((p) => isPollOpen(p))
          .map((poll) => {
            return <RenderPollTiny poll={poll} />;
          })}
        {/* 
        {allPolls
          // @ts-ignore
          .filter((p) => !isPollOpen(p))
          .map((poll) => {
            return <RenderPollTiny poll={poll} />;
          })}
        */}
      </aside>
    </>
  );
}
