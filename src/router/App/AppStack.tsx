import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import PracticeIntelligence from "../../screens/App/Home/PracticeIntelligence";
import ReportHub from "../../screens/App/Home/PractceIntelligence/ReportHub";
import Schedule from "../../screens/App/Home/Schedule/Schedule";
import Patients from "../../screens/App/Home/Patient/Patients";
import PatientSnapshot from "../../screens/App/Home/Patient/PatientSnapshot";
import LabsDashboard from "../../screens/App/LabsDashboard";
import LabAlertDecision from "../../screens/App/LabAlertDecision";
import PracticeSchedule from "../../screens/App/Home/Schedule/PracticeSchedule";
import MyCalender from "../../screens/App/Home/Schedule/MyCalender";
import ToDoList from "../../screens/App/Home/Schedule/ToDoList";
import CreateTask from "../../screens/App/Home/Schedule/CreateTask";
import AddEvent from "../../screens/App/Home/Schedule/AddEvent";
import EventDetails from "../../screens/App/Home/Schedule/EventDetails";
import RefillEscalation from "../../screens/App/Home/RefillEscalation/RefillEscalation";
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name={navigationStrings.PRACTICE_INTELLIGENCE}
        component={PracticeIntelligence}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REPORT_HUB}
        component={ReportHub}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE}
        component={Schedule}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PRACTICE_SCHEDULE}
        component={PracticeSchedule}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.MY_CALENDER}
        component={MyCalender}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.TO_DO_LIST}
        component={ToDoList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.CREATE_TASK}
        component={CreateTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ADD_EVENT}
        component={AddEvent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.EVENT_DETAILS}
        component={EventDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENTS}
        component={Patients}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_SNAPSHOT}
        component={PatientSnapshot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_DASHBOARD}
        component={LabsDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LAB_ALERT_DECISION}
        component={LabAlertDecision}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REFILL_ESCALATION}
        component={RefillEscalation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
