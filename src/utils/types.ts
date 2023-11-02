export type Poll = {
  title: string;
  description: string;
  needLogin: boolean;
  choices: string[];
};

export type User = {
  username: string;
  password: string;
  tokens: string;
};
