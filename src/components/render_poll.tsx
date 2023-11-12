import { Choice, Poll } from "../utils/types";
import "../styles/poll.scss";
import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { ApiRoot } from "../utils/consts";
import { useCookies } from "react-cookie";
import { defaultChoice, isPollOpen } from "../utils/funcs";
import { useNavigate } from "react-router";

export function RenderPoll(props: { poll: Poll }) {
  return (
    <article className="poll">
      <h2>{props.poll.title}</h2>
      <p>{props.poll.description}</p>
      <select id="vote">
        {props.poll.choices.map((c) => {
          return <option value={c.title}>{c.title}</option>;
        })}
      </select>
    </article>
  );
}

export function RenderPollTiny(props: { poll: Poll; key: string }) {
  const navigate = useNavigate();
  const [open, setIsOpen] = useState(isPollOpen(props.poll));
  const [cookie] = useCookies(["Authorization"]);
  const config: AxiosRequestConfig<{}> = {
    headers: {
      Authorization: cookie["Authorization"],
    },
  };

  const openPoll = () => {
    axios
      .post(ApiRoot(`polls/${props.poll.pollId}/start`), {}, config)
      .then((res) => {
        setIsOpen(true);
        navigate(`/polls/${props.poll.pollId}/view`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closePoll = () => {
    axios
      .post(ApiRoot(`polls/${props.poll.pollId}/end`), {}, config)
      .then((res) => {
        setIsOpen(false);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const viewPoll = () => {
    navigate(`/polls/${props.poll.pollId}/view`);
  };

  return (
    <article className="tiny-poll">
      <h4>{props.poll.title}</h4>
      <small>{props.poll.description}</small>
      <br />
      {props.poll.choices.map((c) => {
        return <p key={`${c.choiceId}`}>{c.title}</p>;
      })}
      {open ? (
        <>
          <label>
            Roomcode
            <p>{props.poll.roomcode}</p>
          </label>
          <button onClick={closePoll} className="close">
            Close
          </button>
          <button onClick={viewPoll} className="view">
            View
          </button>
        </>
      ) : (
        <>
          <button onClick={openPoll} className="open">
            Open
          </button>
          <button className="edit">Edit</button>
        </>
      )}
    </article>
  );
}

export function RenderPollVote(props: { poll: Poll }) {
  const [cookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  //@ts-ignore
  const vote = (e) => {
    let val = e.target.value;
    if (val === undefined) {
      val = props.poll.choices[0].choiceId;
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };

    axios
      .post(
        ApiRoot(`polls/${props.poll.pollId}/votes`),
        {
          choiceId: val,
          voteCount: 1,
        },
        config
      )
      .then((res) => {
        console.log(res);
        navigate("view");
      })
      .catch((err) => console.error(err));
  };

  return (
    <article className="poll">
      <h2>{props.poll.title}</h2>
      <p>{props.poll.description}</p>
      <section>
        {props.poll.choices.map((c) => {
          return (
            <p className="choice" key={c.choiceId} onClick={vote}>
              {c.title}
            </p>
          );
        })}
      </section>
    </article>
  );
}

export function CreatePoll(props: { poll: Poll }) {
  const [createdPoll, setCreatedPoll] = useState<Poll>(props.poll);
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [startHour, setStartHour] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();
  const [endHour, setEndHour] = useState<Date | undefined>();

  const [cookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  // @ts-ignore
  const updateTitle = (event) => {
    let p = createdPoll;
    p.title = event.target.value;
    setCreatedPoll(p);
  };

  // @ts-ignore
  const updateDesc = (event) => {
    let p = createdPoll;
    p.description = event.target.value;
    setCreatedPoll(p);
  };

  const updateChoice = (options: Choice[]) => {
    let p = createdPoll;
    p.choices = options;
    setCreatedPoll(p);
  };

  //@ts-ignore
  const needLogin = (e) => {
    let p = createdPoll;
    p.needLogin = e.target.value;
    setCreatedPoll(p);
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTime: React.Dispatch<React.SetStateAction<Date | undefined>>
  ) => {
    const [hours, minutes] = e.target.value.split(":");
    const d = new Date();
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    setTime(d);
  };

  const createPoll = () => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };

    // TypeScript sucks balls
    // Only starthour has been set, so we start today, at this hour
    if (typeof startTime === "undefined" && typeof startHour !== "undefined") {
      let d = new Date();
      d.setHours(startHour.getHours());
      d.setMinutes(startHour.getMinutes());
      d.setSeconds(startHour.getSeconds());
      createdPoll.startTime = d;
    } else if (typeof startTime !== "undefined") {
      createdPoll.startTime = startTime;
    } else if (
      typeof startTime !== "undefined" &&
      typeof startHour !== "undefined"
    ) {
      // Combine both
      let d: Date = startTime;
      d.setHours(startHour.getHours());
      d.setMinutes(startHour.getMinutes());
      d.setSeconds(startHour.getSeconds());
      createdPoll.startTime = d;
    }

    // End of times
    if (typeof endTime === "undefined" && typeof endHour !== "undefined") {
      let d = new Date();
      d.setHours(endHour.getHours());
      d.setMinutes(endHour.getMinutes());
      d.setSeconds(endHour.getSeconds());
      createdPoll.endTime = d;
    } else if (typeof endTime !== "undefined") {
      createdPoll.endTime = endTime;
    } else if (
      typeof endTime !== "undefined" &&
      typeof endHour !== "undefined"
    ) {
      // Combine both
      let d: Date = endTime;
      d.setHours(endHour.getHours());
      d.setMinutes(endHour.getMinutes());
      d.setSeconds(endHour.getSeconds());
      createdPoll.endTime = d;
    }

    axios
      .post(ApiRoot("polls"), createdPoll, config)
      .then((r) => {
        if (
          createdPoll.startTime === undefined ||
          isNaN(createdPoll.startTime.valueOf())
        ) {
          //@ts-ignore
          navigate("/dashboard");
        } else {
          //@ts-ignore
          navigate(`/polls/${r.data.pollId}/view`);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => console.log(createdPoll));
  };

  return (
    <article className="create-poll">
      <label>Title</label>
      <input
        type="text"
        name="title"
        placeholder={props.poll.title}
        onChange={updateTitle}
      />
      <label>Description</label>
      <input
        type="text"
        name="desc"
        placeholder={props.poll.description}
        onChange={updateDesc}
      />
      <label>Choices</label>
      <MultipleChoiceEditor
        choices={props.poll.choices}
        onOptionsChange={updateChoice}
      />
      <label>Need Login</label>
      <input type="checkbox" onChange={needLogin} />
      <label>Start Date</label>
      <input
        type="date"
        onChange={(e) => {
          let d = new Date(Date.parse(e.target.value));
          setStartTime(d);
        }}
      />
      <label>Start Time</label>
      <input
        type="time"
        onChange={(e) => {
          const [hours, minutes] = e.target.value.split(":");
          const d = new Date();
          d.setHours(parseInt(hours));
          d.setMinutes(parseInt(minutes));
          setStartHour(d);
        }}
      />
      <label>End Date</label>
      <input type="date" onChange={(e) => handleTimeChange(e, setStartHour)} />
      <label>End Time</label>
      <input type="time" onChange={(e) => handleTimeChange(e, setEndHour)} />
      <button onClick={createPoll}>Save</button>
    </article>
  );
}

interface MCEProps {
  choices: Choice[];
  onOptionsChange?: (newOptions: Choice[]) => void;
}

function MultipleChoiceEditor({
  choices,
  onOptionsChange = () => {},
}: MCEProps) {
  const [options, setOptions] = useState(choices);

  const addOption = () => {
    setOptions([...options, defaultChoice()]);
    onOptionsChange([...options, defaultChoice()]);
  };

  // @ts-ignore
  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  // @ts-ignore
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = defaultChoice(value);
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              placeholder={option.title}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button onClick={() => removeOption(index)}>Remove</button>
          </div>
        );
      })}
      <button onClick={addOption}>Add</button>
    </div>
  );
}

export function RenderPollView(props: { poll: Poll }) {
  return (
    <article className="view-poll">
      <h2>{props.poll.title}</h2>
      <p>{props.poll.description}</p>
      {props.poll.choices.map((c) => {
        return (
          <p>
            {c.title}: {c.voteCount === undefined ? 0 : c.voteCount}
          </p>
        );
      })}
    </article>
  );
}
