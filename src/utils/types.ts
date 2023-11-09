export type Poll = {
  id?: number;
  title: string;
  description: string;
  needLogin: boolean;
  startTime?: Date;
  endTime?: Date;
  choices: Choice[];
  status: String;
  roomcode: String;
};

export type User = {
  id?: number;
  username: string;
  password: string;
  tokens: string;
};

export type Choice = {
  title: string;
  description: string;
  count?: number;
};
