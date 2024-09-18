import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTask";
import { useRef } from "react";

export default function App() {
  const { tasks, toggleTask, addTask, editTask } = useTasks();
  const inputRef = useRef<TextInput>(null);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DoneApp</Text>
      <TaskList tasks={tasks} onToggle={toggleTask} onEditTask={editTask} />
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Write a new task"
          maxLength={40}
          onSubmitEditing={(event) => {
            const newTask = event.nativeEvent.text;
            if (newTask.trim().length > 0) {
              addTask({
                id: tasks.length + 1,
                completed: false,
                text: newTask,
                type: "No list",
              });
              inputRef.current?.clear();
            }
          }}
        />
        <TouchableOpacity style={styles.listButton}>
          <Icon name="list" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#6e6e6e",
  },
  listButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
