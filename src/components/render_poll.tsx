import { Poll } from "../utils/types";
import { Title } from "./title";
import "../styles/poll.scss";

export function RenderPoll(props: { poll: Poll }) {
  return (
    <article id={props.poll.id.toString()} className="poll">
      <Title title={props.poll.title} />
      <p>{props.poll.description}</p>
      <select>
        {props.poll.choices.map((c) => {
          return <option value={c}>{c}</option>;
        })}
      </select>
    </article>
  );
}
