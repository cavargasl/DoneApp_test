import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import IconAwesome from "react-native-vector-icons/FontAwesome6";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTask";
import { useRef, useState } from "react";
import Badge from "./components/Badge";
import { TypeTask } from "./types";
import ListTypes from "./components/ListTypes";

export default function App() {
  const { tasks, toggleTask, addTask, editTask } = useTasks();
  const inputRef = useRef<TextInput>(null);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [typeSelected, setTypeSelected] = useState<TypeTask>("No list");
  const [openedListType, setOpenedListType] = useState(false);
  function onChangeType(type: TypeTask) {
    setTypeSelected(type);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DoneApp</Text>
      <TaskList tasks={tasks} onToggle={toggleTask} onEditTask={editTask} />
      <View
        style={[
          styles.inputContainer,
          openNewTask && styles.inputContainerFocus,
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[styles.input, openNewTask && styles.inputFocused]}
          placeholder="Write a new task"
          maxLength={40}
          onPress={() => setOpenNewTask(true)}
          onBlur={() => {
            setOpenNewTask(false);
            setOpenedListType(false);
            setTypeSelected("No list");
          }}
          onSubmitEditing={(event) => {
            const newTask = event.nativeEvent.text;
            if (newTask.trim().length > 0) {
              addTask({
                id: tasks.length + 1,
                completed: false,
                text: newTask,
                type: typeSelected,
              });
              inputRef.current?.clear();
            }
          }}
        />
        {!openNewTask ? (
          <TouchableOpacity style={styles.listButton}>
            <Icon name="list" size={24} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonType}
            onPress={() => setOpenedListType((e) => !e)}
          >
            <Badge type={typeSelected} />
            <Text style={{ flex: 1 }}>{typeSelected}</Text>
            <IconAwesome
              name={openedListType ? "arrow-down" : "arrow-up"}
              size={12}
              color="#2b2b2b"
            />
          </TouchableOpacity>
        )}
      </View>
      {openedListType && <ListTypes onChangeType={onChangeType} />}
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
    marginHorizontal: "auto",
    alignItems: "center",
    width: "80%",
  },
  inputContainerFocus: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "auto",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#6e6e6e",
    backgroundColor: "#fff",
    height: "auto",
    padding: 12,
    borderRadius: 50,
    shadowColor: "#707070",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  inputFocused: { shadowOpacity: 0, elevation: 0, paddingHorizontal: 0 },
  listButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#707070",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonType: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#e2e2e2",
    padding: 8,
    borderRadius: 6,
    width: 110,
    justifyContent: "center",
  },
});
