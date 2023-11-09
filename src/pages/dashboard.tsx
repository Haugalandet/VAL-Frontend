import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { RenderPollTiny } from "../components/render_poll";
import "../styles/dashboard.scss";
import { Footer } from "../components/footer";
import { useCookies } from "react-cookie";
import { FindPoll } from "../components/find_poll";

export function Dashboard() {
  const [allPolls, setAllPolls] = useState([]);
  const [cookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie["Authorization"] === undefined) {
      navigate("/login");
    }

    let config = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };
    axios
      .get(ApiRoot("polls"), config)
      .then((res) => {
        setAllPolls(res.data);
      })
      .catch((res) => {
        console.error(res);
      });
  }, [navigate, cookie]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <h1>Dashboard</h1>
        <NavLink to={"create"} replace={true}>
          <button>New Poll</button>
        </NavLink>
        <article>
          <FindPoll />
        </article>
        <aside>
          {allPolls.map((poll) => {
            console.log(poll);
            return <RenderPollTiny poll={poll} />;
          })}
        </aside>
      </main>
      <Footer />
    </>
  );
}
