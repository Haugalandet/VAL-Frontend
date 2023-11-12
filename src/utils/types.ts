export type Poll = {
  pollId?: number;
  title: string;
  description: string;
  needLogin: boolean;
  startTime?: Date;
  endTime?: Date;
  choices: Choice[];
  status: String;
  roomcode?: String;
  hasUserVoted?: boolean;
};

export type Choice = {
  choiceId?: number;
  title: string;
  description: string;
  voteCount?: number;
};
