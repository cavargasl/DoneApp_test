import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TypeTask } from "../types";
import Badge from "./Badge";

type ListTypeProps = {
  onChangeType: (type: TypeTask) => void;
};
export default function ListTypes({ onChangeType }: ListTypeProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => onChangeType("Personal")}
      >
        <Badge type={"Personal"} />
        <Text style={styles.text}>Personal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => onChangeType("Work")}
      >
        <Badge type={"Work"} />
        <Text style={styles.text}>Work</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => onChangeType("Errands")}
      >
        <Badge type={"Errands"} />
        <Text style={styles.text}>Errands</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => onChangeType("No list")}
      >
        <Badge type={"No list"} />
        <Text style={styles.text}>No list</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 12,
    paddingTop: 20,
    gap: 20,
  },
  buttons: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 20,
  },
});
