import React from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";

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
      Replace this placeholder with Patient app screens.
    </Text>
  </View>
);

const PatientHome = () => <PlaceholderScreen title="Patient Home" />;
const PatientProfile = () => <PlaceholderScreen title="Patient Profile" />;

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={PatientHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.PROFILE}
        component={PatientProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
