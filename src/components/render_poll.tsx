import { Choice, Poll } from "../utils/types";
import { Title } from "./title";
import "../styles/poll.scss";
import { useState } from "react";
import axios from "axios";
import { ApiRoot } from "../utils/consts";
import { useCookies } from "react-cookie";
import { defaultChoice, isPollOpen } from "../utils/funcs";
import { Navigate } from "react-router";

export function RenderPoll(props: { poll: Poll }) {
  return (
    <article className="poll">
      <Title title={props.poll.title} />
      <p>{props.poll.description}</p>
      <select id="vote">
        {props.poll.choices.map((c) => {
          return <option value={c.title}>{c.title}</option>;
        })}
      </select>
    </article>
  );
}

export function RenderPollTiny(props: { poll: Poll }) {
  const openPoll = () => {
    axios
      .post(ApiRoot(`polls/${props.poll.id}/start`))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePoll = () => {
    axios
      .post(ApiRoot(`polls/${props.poll.id}/end`))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isOpen = isPollOpen(props.poll);

  return (
    <article className="tiny-poll">
      <h4>{props.poll.title}</h4>
      <small>{props.poll.description}</small>
      <br />
      {props.poll.choices.map((c) => {
        return <p>{c.title}</p>;
      })}
      {isOpen ? (
        <>
          <button onClick={closePoll} className="close">
            Close
          </button>
          <button className="edit">Edit</button>
        </>
      ) : (
        <button onClick={openPoll} className="open">
          Open
        </button>
      )}
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
    <article className="poll">
      <Title title={props.poll.title} />
      <p>{props.poll.description}</p>
      <select value={selectedValue} onChange={handleSelectChange}>
        {props.poll.choices.map((c) => {
          return (
            <option value={c.title} key={c.title}>
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
  const [cookie] = useCookies([]);

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
    let config = {
      headers: {
        //@ts-ignore
        Authorization: cookie["Authorization"],
      },
    };

    axios
      .post(ApiRoot("polls"), createdPoll, config)
      .then((r) => {
        console.log("Created Poll");
      })
      .catch((err) => {
        console.log("Got error: ", err);
      })
      .finally(() => {
        console.log(createdPoll);
      });
  };

  return (
    <article>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={props.poll.title}
          onChange={updateTitle}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          name="desc"
          value={props.poll.description}
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
          }}
        />
      </label>
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
    updatedOptions[index] = value;
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
              value={option.title}
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
