import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../../constants/navigationStrings";
import Appointments from "../../screens/App/Appointments/Appointments";
import AppointmentDetail from "../../screens/App/Appointments/AppointmentDetail";
import AppointmentConfirm from "../../screens/App/Appointments/AppointmentConfirm";
import AppointmentScheduled from "../../screens/App/Appointments/AppointmentScheduled";
import ScheduleStep1 from "../../screens/App/Appointments/ScheduleStep1";
import ScheduleStep2 from "../../screens/App/Appointments/ScheduleStep2";
import Labs from "../../screens/App/Labs/Labs";
import LabRequest from "../../screens/App/Labs/LabRequest";
import LabResults from "../../screens/App/Labs/LabResults";
import LabResultDetail from "../../screens/App/Labs/LabResultDetail";
import MyProfile from "../../screens/App/MyProfile";
import BottomNavigation from "./BottomNavigation";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.BOTTOM_NAVIGATION} component={BottomNavigation} />
      <Stack.Screen
        name={navigationStrings.APPOINTMENTS}
        component={Appointments}
      />
      <Stack.Screen
        name={navigationStrings.APPOINTMENT_DETAIL}
        component={AppointmentDetail}
      />
      <Stack.Screen
        name={navigationStrings.APPOINTMENT_CONFIRM}
        component={AppointmentConfirm}
      />
      <Stack.Screen
        name={navigationStrings.APPOINTMENT_SCHEDULED}
        component={AppointmentScheduled}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_STEP_1}
        component={ScheduleStep1}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_STEP_2}
        component={ScheduleStep2}
      />
      <Stack.Screen name={navigationStrings.LABS} component={Labs} />
      <Stack.Screen name={navigationStrings.LAB_REQUEST} component={LabRequest} />
      <Stack.Screen name={navigationStrings.LAB_RESULTS} component={LabResults} />
      <Stack.Screen
        name={navigationStrings.LAB_RESULT_DETAIL}
        component={LabResultDetail}
      />
      <Stack.Screen name={navigationStrings.MY_PROFILE} component={MyProfile} />
    </Stack.Navigator>
  );
};

export default AppStack;
