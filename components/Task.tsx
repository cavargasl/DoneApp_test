import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { Task as TaskType } from "../types";
import Badge from "./Badge";

type TaskProps = {
  task: TaskType;
  onToggle: (id: TaskType["id"]) => void;
  onEditTask: ({
    taskId,
    newTask,
  }: {
    taskId: TaskType["id"];
    newTask: TaskType;
  }) => void;
  onDeleteTask: (taskId: TaskType["id"]) => void;
};

export default function Task({
  task,
  onToggle,
  onEditTask,
  onDeleteTask,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEditTask({ taskId: task.id, newTask: { ...task, text: editedText } });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.text);
  };

  const leftSwipe = () => {
    return (
      <Pressable
        style={[styles.task, styles.deleteButton]}
        onPress={() => onDeleteTask(task.id)}
      >
        <Icon name="trash-2" size={20} color="#fff" />
      </Pressable>
    );
  };
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={styles.task}>
        <Checkbox
          value={task.completed}
          onValueChange={() => onToggle(task.id)}
          style={styles.checkbox}
        />
        <View style={{ flex: 1 }}>
          {isEditing ? (
            <TextInput
              value={editedText}
              onChangeText={(text) => setEditedText(text)}
              maxLength={40}
              onBlur={handleCancel}
              onSubmitEditing={handleSave}
              style={styles.textInput}
              autoFocus
            />
          ) : (
            <Text style={styles.taskText} onPress={handleEdit}>
              {task.text}
            </Text>
          )}
        </View>
        <Badge type={task.type} />
      </View>
    </Swipeable>
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
    marginLeft: 10,
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#e2e2e2",
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingHorizontal: 2,
  },
  checkbox: {
    borderRadius: 5,
    backgroundColor: "#e2e2e2",
    borderWidth: 0,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    alignItems: "center",
    width: 50,
    justifyContent: "center",
    marginRight: 10,
  },
});
