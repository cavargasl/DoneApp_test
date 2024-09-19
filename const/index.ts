import { Task } from "../types";

export const defaultTasks: Task[] = [
  { id: "task-1", text: "Buy new macbook", completed: false, type: "Personal" },
  {
    id: "task-2",
    text: "Get feedback on website design",
    completed: true,
    type: "Errands",
  },
  { id: "task-3", text: "Buy milk", completed: false, type: "Work" },
  {
    id: "task-4",
    text: "Call Katherine about the trip",
    completed: false,
    type: "Personal",
  },
];
