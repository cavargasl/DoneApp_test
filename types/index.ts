export type Task = {
  id: number;
  text: string;
  completed: boolean;
  type: TypeTask;
};

export type TypeTask = "Personal" | "Work" | "Errands" | "No list";
