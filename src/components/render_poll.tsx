import { Poll } from "../utils/types";
import { Title } from "./title";
import "../styles/poll.scss";
import { useState } from "react";
import axios from "axios";
import { ApiRoot } from "../utils/consts";

export function RenderPoll(props: { poll: Poll }) {
  return (
    <article id={props.poll.id.toString()} className="poll">
      <Title title={props.poll.title} />
      <p>{props.poll.description}</p>
      <select id="vote">
        {props.poll.choices.map((c) => {
          return <option value={c}>{c}</option>;
        })}
      </select>
    </article>
  );
}

export function RenderPollVote(props: { poll: Poll }) {
  const [selectedValue, setSelectedValue] = useState(""); // Initialize the state with an empty string

  // @ts-ignore
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const vote = () => {
    console.log(selectedValue);
  };

  return (
    <article id={props.poll.id.toString()} className="poll">
      <Title title={props.poll.title} />
      <p>{props.poll.description}</p>
      <select value={selectedValue} onChange={handleSelectChange}>
        {props.poll.choices.map((c) => {
          return (
            <option value={c} key={c}>
              {c}
            </option>
          );
        })}
      </select>
      <button onClick={() => vote()}>Vote</button>
    </article>
  );
}
