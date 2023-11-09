export type Poll = {
  pollId?: number;
  title: string;
  description: string;
  needLogin: boolean;
  startTime?: Date;
  endTime?: Date;
  choices: Choice[];
  status: String;
  roomcode: String;
  hasUserVoted?: boolean;
};

export type User = {
  userId?: number;
  username: string;
  password: string;
  tokens: string;
};

export type Choice = {
  choiceId?: number;
  title: string;
  description: string;
  count?: number;
};
