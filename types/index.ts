import { typeTask } from "../const";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  type: TypeTask;
};

export type TypeTask = (typeof typeTask)[number];
