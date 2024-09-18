import { useEffect, useState } from "react";
import { Task } from "../types";
import {
  deleteTaskFromLocalStorage,
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/taskOnLocalStorage";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedTasks = await getTasksFromLocalStorage();
      setTasks(fetchedTasks);
    })();
  }, []);

  function addTask(newTask: Task) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  function deleteTask(taskId: Task["id"]) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      deleteTaskFromLocalStorage(taskId);
      return updatedTasks;
    });
  }

  function editTask({
    taskId,
    newTask,
  }: {
    taskId: Task["id"];
    newTask: Task;
  }) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...newTask } : task,
      );
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }
  function toggleTask(taskId: Task["id"]) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  return { tasks, addTask, deleteTask, toggleTask, editTask };
}
