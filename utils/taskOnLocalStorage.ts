import { Task } from "../types";
import { defaultTasks } from "../const";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveTasksToLocalStorage(tasks: Task[]) {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error to save tasks from local storage:", error);
  }
}

async function getTasksFromLocalStorage(): Promise<Task[]> {
  try {
    const tasksString = await AsyncStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : defaultTasks;
  } catch (error) {
    console.error("Error on get tasks to local storage:", error);
    return defaultTasks;
  }
}

async function deleteTaskFromLocalStorage(taskId: Task["id"]) {
  try {
    const tasks = await getTasksFromLocalStorage();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    await saveTasksToLocalStorage(updatedTasks);
  } catch (error) {
    console.error("Error deleting task from local storage:", error);
  }
}

export {
  deleteTaskFromLocalStorage,
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
};
