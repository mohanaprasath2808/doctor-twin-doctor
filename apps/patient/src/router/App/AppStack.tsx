import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";

const Stack = createStackNavigator();

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>{title}</Text>
    <Text style={{ textAlign: "center", color: "#666" }}>
      Replace this placeholder with Patient app screens.
    </Text>
  </View>
);

// const PatientHome = () => <PlaceholderScreen title="Patient Home" />;
const PatientProfile = () => <PlaceholderScreen title="Patient Profile" />;

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
      />
      <Stack.Screen
        name={navigationStrings.PROFILE}
        component={PatientProfile}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
