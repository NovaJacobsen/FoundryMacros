export type Elements = {
  [P in keyof Model]: Base<Model[P]>;
};

export type Model = {
  level: number;
  custom: boolean;
  weekly: number;
  time: number;
  total: number;
  check: number;
  image: string;
  name: string;
};
