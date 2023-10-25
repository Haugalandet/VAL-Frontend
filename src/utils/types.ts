export type Poll = {
  id: number;
  title: string;
  description: string;
  choices: string[];
};

export type User = {
  username: string;
  password: string;
};
