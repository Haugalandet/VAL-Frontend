import { Poll, User } from "./types";

export function defaultUser(): User {
  return {
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
    title: "NONE",
    needLogin: false,
    description: "NONE\nNONE\nNONE",
    choices: ["A", "B", "C"],
  };
}
