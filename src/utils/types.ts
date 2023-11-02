export type Poll = {
  title: string;
  description: string;
  needLogin: boolean;
  choices: Choice[];
};

export type User = {
  username: string;
  password: string;
  tokens: string;
};

export type Choice = {
  name: string;
  description: string;
};
