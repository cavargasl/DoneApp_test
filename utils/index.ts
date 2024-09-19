import { typeTask } from "../const";

export function generateRandomId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getTypeTaskOptions() {
  return typeTask;
}
