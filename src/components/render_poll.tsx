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
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const viewPoll = () => {
    navigate(`/polls/${props.poll.pollId}/view`);
  };

  const isOpen = isPollOpen(props.poll);

  return (
    <article className="tiny-poll">
      <h4>{props.poll.title}</h4>
      <small>{props.poll.description}</small>
      <br />
      {props.poll.choices.map((c) => {
        return <p key={`${c.choiceId}`}>{c.title}</p>;
      })}
      {isOpen ? (
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
  const [selectedValue, setSelectedValue] = useState(
    props.poll.choices[0].choiceId
  ); // Initialize the state with an empty string

  // @ts-ignore
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const vote = () => {
    let val = selectedValue;
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
      })
      .catch((err) => console.error(err));
  };

  return (
    <article className="poll">
      <h2>{props.poll.title}</h2>
      <p>{props.poll.description}</p>
      <select value={selectedValue} onChange={handleSelectChange}>
        {props.poll.choices.map((c) => {
          return (
            <option value={c.choiceId} key={c.title}>
              {c.title}
            </option>
          );
        })}
      </select>
      <button onClick={() => vote()}>Vote</button>
    </article>
  );
}

export function CreatePoll(props: { poll: Poll }) {
  const [createdPoll, setCreatedPoll] = useState(props.poll);
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

  const createPoll = () => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: cookie["Authorization"],
      },
    };
    console.log(createdPoll);
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
      });
  };

  return (
    <article>
      <label>
        Title
        <input
          type="text"
          name="title"
          placeholder={props.poll.title}
          onChange={updateTitle}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          name="desc"
          placeholder={props.poll.description}
          onChange={updateDesc}
        />
      </label>
      <label>
        Choices
        <MultipleChoiceEditor
          choices={props.poll.choices}
          onOptionsChange={updateChoice}
        />
      </label>
      <label>
        Need Login
        <input
          type="checkbox"
          onChange={(e) => {
            let p = createdPoll;
            p.needLogin = !!e.target.value;
            setCreatedPoll(p);
          }}
        />
      </label>
      <label>Start Date</label>
      <input
        type="date"
        onChange={(e) => {
          let p = createdPoll;

          let d = Date.parse(e.target.value);

          if (isNaN(d)) {
            p.startTime = undefined;
            return;
          }

          p.startTime = new Date(d);
          setCreatedPoll(p);
        }}
      />
      <label>End Date</label>
      <input
        type="date"
        onChange={(e) => {
          let p = createdPoll;
          p.endTime = new Date(Date.parse(e.target.value));
          setCreatedPoll(p);
        }}
      />
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
    <article className="poll">
      <h2>{props.poll.title}</h2>
      <p>{props.poll.description}</p>
      {props.poll.choices.map((c) => {
        return (
          <p>
            {c.title}: {c.count === undefined ? 0 : c.count}
          </p>
        );
      })}
    </article>
  );
}
