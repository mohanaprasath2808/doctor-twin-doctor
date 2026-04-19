import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/theme";

const ScheduleStep2 = () => {
  return (
    <View style={styles.container}>
      <Text>ScheduleStep2</Text>
    </View>
  );
};

export default ScheduleStep2;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
});
