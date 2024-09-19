import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import IconAwesome from "react-native-vector-icons/FontAwesome6";
import Badge from "./components/Badge";
import ListTypes from "./components/ListTypes";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTask";
import { TypeTask } from "./types";
import { generateRandomId } from "./utils";
import { StatusBar } from "expo-status-bar";
export default function App() {
  const { tasks, toggleTask, addTask, editTask, deleteTask, clearData } =
    useTasks();
  const inputRef = useRef<TextInput>(null);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [typeSelected, setTypeSelected] = useState<TypeTask>("No list");
  const [openedListType, setOpenedListType] = useState(false);
  function onChangeType(type: TypeTask) {
    setTypeSelected(type);
    setOpenedListType(false);
  }
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>DoneApp</Text>
        <View style={[{ flex: 1 }, openNewTask && { opacity: 0.3 }]}>
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
            />
          ) : (
            <View>
              <Text style={[styles.title, { fontSize: 22, color: "#d4d4d4" }]}>
                Empty List
              </Text>
              <Text style={[styles.title, { fontSize: 16, color: "#d4d4d4" }]}>
                create a new task
              </Text>
            </View>
          )}
        </View>
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
            onFocus={() => setOpenNewTask(true)}
            onBlur={() => {
              setOpenNewTask(false);
              setOpenedListType(false);
              setTypeSelected("No list");
            }}
            onSubmitEditing={(event) => {
              const newTask = event.nativeEvent.text;
              if (newTask.trim().length > 0) {
                addTask({
                  id: generateRandomId(),
                  completed: false,
                  text: newTask,
                  type: typeSelected,
                });
                inputRef.current?.clear();
              }
            }}
          />
          {!openNewTask ? (
            <TouchableOpacity style={styles.listButton} onPress={clearData}>
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
      </SafeAreaView>
      {openedListType && <ListTypes onChangeType={onChangeType} />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 20,
    paddingBottom: 10,
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
    gap: 5,
    height: "auto",
    paddingTop: 10,
  },
  inputContainerFocus: {
    width: "100%",
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
  inputFocused: {
    width: "100%",
    paddingRight: 125,
    shadowOpacity: 0,
    elevation: 0,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
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
    position: "absolute",
    right: 12,
    bottom: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ebebeb",
    padding: 8,
    borderRadius: 6,
    width: 120,
    justifyContent: "center",
  },
});
