import React from "react";
import { StyleSheet, View } from "react-native";
import { TypeTask } from "../types";

type BadgeProps = { type: TypeTask };
export default function Badge({ type }: BadgeProps) {
  return <View style={[styles.badge, styles[type]]} />;
}

const styles = StyleSheet.create({
  badge: {
    width: 12,
    height: 12,
    borderRadius: 4,
    borderWidth: 3,
  },
  Personal: {
    borderColor: "#28a745",
  },
  Work: {
    borderColor: "#ffc107",
  },
  Errands: {
    borderColor: "#dc3545",
  },
  "No list": {
    borderColor: "#6c757d",
  },
});
