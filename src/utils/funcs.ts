import { Poll, User } from "./types";

export function defaultUser(): User {
  return {
    username: "NONE",
    password: "NONE123",
  };
}

export function defaultTest(): Boolean {
  return true;
}

export function defaultPoll(): Poll {
  return {
    id: -1,
    title: "NONE",
    description: "NONE\nNONE\nNONE",
    choices: ["A", "B", "C"],
  };
}
