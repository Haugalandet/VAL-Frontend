import { Choice, Poll, User } from "./types";

export function defaultUser(): User {
  return {
    id: undefined,
    username: "NONE",
    password: "NONE123",
    tokens: "",
  };
}

export function defaultTest(): Boolean {
  return true;
}

export function defaultPoll(): Poll {
  return {
    id: undefined,
    title: "NONE",
    needLogin: false,
    description: "NONE\nNONE\nNONE",
    startTime: undefined,
    endTime: undefined,
    choices: [defaultChoice(), defaultChoice("B"), defaultChoice("C")],
  };
}

export function defaultChoice(s: string = "A"): Choice {
  return {
    title: s,
    description: "",
  };
}

export function isPollOpen(poll: Poll): boolean {
  return Math.random() >= 0.5;
}

export function pollExamples(): Poll[] {
  return [
    {
      id: undefined,
      title: "What is a Monad?",
      needLogin: false,
      description: "A monad is a monoid in the category of endofunctors",
      startTime: undefined,
      endTime: undefined,
      choices: [
        defaultChoice("Burrito."),
        defaultChoice("Yes."),
        defaultChoice("Nobody knows."),
      ],
    },
    {
      id: undefined,
      title: "How do I leave vim?",
      needLogin: false,
      description: "I am stuck",
      startTime: undefined,
      endTime: undefined,
      choices: [
        defaultChoice("Turn off the power too your room"),
        defaultChoice("Close the terminal"),
        defaultChoice("Task Manager"),
        defaultChoice("Turn off your computer"),
      ],
    },
    {
      id: undefined,
      title: "Favorite Programming Paradigm",
      needLogin: false,
      description: "What's your favorite programming paradigm?",
      startTime: undefined,
      endTime: undefined,
      choices: [
        defaultChoice("ChatGPT"),
        defaultChoice("Functional"),
        defaultChoice("Object-Oriented"),
        defaultChoice("Procedural"),
        defaultChoice("Reactive"),
      ],
    },
    {
      id: undefined,
      title: "Best Text Editor",
      needLogin: false,
      description: "What's the best text editor for coding?",
      startTime: undefined,
      endTime: undefined,
      choices: [
        defaultChoice("Word"),
        defaultChoice("Visual Studio Code"),
        defaultChoice("Emacs"),
        defaultChoice("Vim"),
        defaultChoice("Sublime Text"),
      ],
    },
    {
      id: undefined,
      title: "Favorite Programming Language",
      needLogin: false,
      description: "Who answers Java/JavaScript?",
      startTime: undefined,
      endTime: undefined,
      choices: [
        defaultChoice("Lua"),
        defaultChoice("Go"),
        defaultChoice("Rust"),
        defaultChoice("Haskell"),
      ],
    },
    {
      id: undefined,
      title: "Favorite Data Structure",
      needLogin: false,
      description: "What's your favorite data structure?",
      startTime: undefined,
      endTime: undefined,
      choices: [
        defaultChoice("Table"),
        defaultChoice("Array"),
        defaultChoice("Linked List"),
        defaultChoice("Binary Tree"),
        defaultChoice("Hash Table"),
      ],
    },
  ];
}
