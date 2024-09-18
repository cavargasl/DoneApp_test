import React from "react";
import { FlatList } from "react-native";
import { Task as TaskType } from "../types";
import Task from "./Task";

type TaskListProps = {
  tasks: TaskType[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <FlatList data={tasks} renderItem={({ item }) => <Task task={item} />} />
  );
}
