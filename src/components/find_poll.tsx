import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/find_poll.scss";

export function FindPoll() {
  const [roomCode, setRoomCode] = useState(0);
  const navigate = useNavigate();

  // @ts-ignore
  const updatePoll = (e) => {
    // @ts-ignore
    setRoomCode(e.target.value);
  };

  const findPoll = () => {
    navigate(`/polls/${roomCode}`);
  };

  return (
    <section id="landingpagesection">
      Enter room code to vote: <br />
      <input type="text" name="name" pattern="[0-9]" onChange={updatePoll} />
      <button onClick={findPoll}>Find Poll</button>
    </section>
  );
}
