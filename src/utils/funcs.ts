import { Choice, Poll, User } from "./types";

export function defaultUser(): User {
  return {
    userId: undefined,
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
    pollId: undefined,
    title: "NONE",
    needLogin: false,
    description: "NONE\nNONE\nNONE",
    startTime: undefined,
    endTime: undefined,
    choices: [defaultChoice(), defaultChoice("B"), defaultChoice("C")],
    status: "ACTIVE",
    roomcode: "0000",
  };
}

export function defaultChoice(s: string = "A"): Choice {
  return {
    title: s,
    description: "",
  };
}

export function isPollOpen(poll: Poll): boolean {
  return poll.status === "ACTIVE";
}

export function pollExamples(): Poll[] {
  return [
    {
      pollId: Math.round(Math.random() * 100),
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
      status: "ACTIVE",
      roomcode: "123",
    },
    {
      pollId: Math.round(Math.random() * 100),
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
      status: "ACTIVE",
      roomcode: "1234",
    },
    {
      pollId: Math.round(Math.random() * 100),
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
      status: "ACTIVE",
      roomcode: "12345",
    },
    {
      pollId: Math.round(Math.random() * 100),
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
      status: "ACTIVE",
      roomcode: "123456",
    },
    {
      pollId: Math.round(Math.random() * 100),
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
      status: "ACTIVE",
      roomcode: "1234567",
    },
    {
      pollId: Math.round(Math.random() * 100),
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
      status: "ACTIVE",
      roomcode: "12345678",
    },
  ];
}
