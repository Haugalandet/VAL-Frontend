import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/find_poll.scss";

export function FindPoll() {
  const [pollId, setPollId] = useState(0);
  const navigate = useNavigate();

  // @ts-ignore
  const updatePoll = (e) => {
    // @ts-ignore
    setPollId(e.target.value);
  };

  const findPoll = () => {
    navigate(`polls/${pollId}`);
  };

  return (
    <section id="landingpagesection">
      Enter poll id to vote: <br />
      <input type="text" name="name" pattern="[0-9]" onChange={updatePoll} />
      <button onClick={findPoll}>Find Poll</button>
    </section>
  );
}
