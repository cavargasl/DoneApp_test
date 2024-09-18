import React from "react";
import { FlatList, View } from "react-native";
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
  onDeleteTask: (taskId: TaskType["id"]) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <Task
          task={item}
          onToggle={onToggle}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      )}
      removeClippedSubviews={false}
      ListFooterComponent={<View style={{ height: 20 }}></View>}
    />
  );
}
