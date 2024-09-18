export type Task = {
  id: string;
  text: string;
  completed: boolean;
  type: TypeTask;
};

export type TypeTask = "Personal" | "Work" | "Errands" | "No list";
