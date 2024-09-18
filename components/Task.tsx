import { StyleSheet, Text, View } from "react-native";
import { Task as TaskType } from "../types";

type TaskProps = {
  task: TaskType;
};

export default function Task({ task }: TaskProps) {
  return (
    <View style={styles.task}>
      <Text style={styles.taskText}>{task.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
});
