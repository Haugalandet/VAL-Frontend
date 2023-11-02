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

export function CreatePoll(props: { poll: Poll }) {
  const [createdPoll, setCreatedPoll] = useState(props.poll);

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

  const updateChoice = (options: string[]) => {
    let p = createdPoll;
    p.choices = options;
    setCreatedPoll(p);
  };

  const createPoll = () => {
    axios
      .post(ApiRoot("polls"), createdPoll)
      .then((r) => {
        console.log("Created Poll");
      })
      .catch((err) => {
        console.log("Got error: ", err);
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
      <button onClick={createPoll}>Save</button>
    </article>
  );
}

interface MCEProps {
  choices: string[];
  onOptionsChange?: (newOptions: string[]) => void;
}

function MultipleChoiceEditor({
  choices,
  onOptionsChange = () => {},
}: MCEProps) {
  const [options, setOptions] = useState(choices);

  const addOption = () => {
    setOptions([...options, ""]);
    onOptionsChange([...options, ""]);
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
              value={option}
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
