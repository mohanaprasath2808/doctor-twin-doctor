import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import Appointments from "../../screens/App/Appointments/Appointments";
import ScheduleStep1 from "../../screens/App/Appointments/ScheduleStep1";
import ScheduleStep2 from "../../screens/App/Appointments/ScheduleStep2";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
      />
      <Stack.Screen
        name={navigationStrings.APPOINTMENTS}
        component={Appointments}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_STEP_1}
        component={ScheduleStep1}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_STEP_2}
        component={ScheduleStep2}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
