import { Poll } from "../utils/types";
import { Title } from "./title";

export function RenderPoll(poll: Poll) {
  return (
    <article id={poll.id.toString()}>
      <Title title={poll.title} />
      <p>{poll.description}</p>
      {poll.choices.map((c) => {
        return <p>{c}</p>;
      })}
    </article>
  );
}
