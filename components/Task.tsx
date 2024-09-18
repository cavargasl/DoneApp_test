import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
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
};

export default function Task({ task, onToggle, onEditTask }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(task.text);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEditTask({ taskId: task.id, newTask: { ...task, text: editedText } });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.text);
  };

  return (
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
            autoFocus={isEditing}
          />
        ) : (
          <Text style={styles.taskText} onPress={handleEdit}>
            {task.text}
          </Text>
        )}
      </View>
      <Badge type={task.type} />
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
});
