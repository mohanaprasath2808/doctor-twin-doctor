import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

const Calendar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.INNER_SURFACE,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
});
