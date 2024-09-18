import React from "react";
import { FlatList } from "react-native";
import { Task as TaskType } from "../types";
import Task from "./Task";

type TaskListProps = {
  tasks: TaskType[];
  onToggle: (taskId: TaskType["id"]) => void;
  onEditTask: ({
    taskId,
    newTask,
  }: {
    taskId: TaskType["id"];
    newTask: TaskType;
  }) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onEditTask,
}: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <Task task={item} onToggle={onToggle} onEditTask={onEditTask} />
      )}
    />
  );
}
