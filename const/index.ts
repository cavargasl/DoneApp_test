import { Task } from "../types";

export const defaultTasks: Task[] = [
  { id: 1, text: "Buy new macbook", completed: false, type: "Personal" },
  {
    id: 2,
    text: "Get feedback on website design",
    completed: true,
    type: "Errands",
  },
  { id: 3, text: "Buy milk", completed: false, type: "Work" },
  {
    id: 4,
    text: "Call Katherine about the trip",
    completed: false,
    type: "Personal",
  },
];
