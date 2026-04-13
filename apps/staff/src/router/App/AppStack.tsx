import React from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
      {title}
    </Text>
    <Text style={{ textAlign: "center", color: "#666" }}>
      Replace this placeholder with Staff app screens.
    </Text>
  </View>
);

const StaffHome = () => <PlaceholderScreen title="Staff Home" />;
const StaffTasks = () => <PlaceholderScreen title="Staff Tasks" />;

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="STAFF_HOME"
        component={StaffHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="STAFF_TASKS"
        component={StaffTasks}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
