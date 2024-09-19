import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { Task as TaskType, TypeTask } from "../types";
import { getTypeTaskOptions } from "../utils";
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

  const [modalVisible, setModalVisible] = useState(false);
  function handleSelect(option: TypeTask) {
    onEditTask({ taskId: task.id, newTask: { ...task, type: option } });
    setModalVisible(false);
  }
  function handleOutsideClick() {
    setModalVisible(false);
  }

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
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={stylesModal.modalContainer}>
              <View style={stylesModal.modalContent}>
                <FlatList
                  data={getTypeTaskOptions()}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={stylesModal.option}
                      onPress={() => handleSelect(item)}
                    >
                      <Badge type={item} />
                      <Text style={stylesModal.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            height: 30,
            width: 30,
            marginRight: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge type={task.type} />
        </Pressable>
      </View>
    </Swipeable>
  );
}

const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    padding: 12,
  },
  option: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    paddingRight: 0,
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
    width: 60,
    justifyContent: "center",
    marginRight: 10,
    padding: 0,
  },
});
