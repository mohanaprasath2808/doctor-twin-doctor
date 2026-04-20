import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import AssignTask from "../../screens/App/TaskInbox/AssignTask";
import EscalateTask from "../../screens/App/TaskInbox/EscalateTask";
import PatientTaskDetail from "../../screens/App/TaskInbox/PatientTaskDetail";
import TaskCompleted from "../../screens/App/TaskInbox/TaskCompleted";
import ShiftStart from "../../screens/App/ShiftStart";
import TaskInbox from "../../screens/App/TaskInbox/TaskInbox";
import BottomNavigation from "./BottomNavigation";
import { Scheduling } from "../../screens/App/Scheduling/scheduling";

export type PatientTaskAvatarKey = "ganesh" | "default";

export type PatientTaskDetailParams = {
  patientName: string;
  age: number;
  taskStatus: string;
  taskDetailLine: string;
  dueBadgeText: string;
  avatar: PatientTaskAvatarKey;
  insightMessage1?: string;
  insightMessage2?: string;
};

export type AssignTaskParams = {
  patientName?: string;
};

/** Must match `navigationStrings` + screen `name` props below. */
export type AppStackParamList = {
  ShiftStart: undefined;
  BottomNavigation: undefined;
  TaskInbox: undefined;
  PatientTaskDetail: PatientTaskDetailParams;
  AssignTask: AssignTaskParams | undefined;
  EscalateTask: undefined;
  TaskCompleted: undefined;
  Scheduling: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={navigationStrings.SHIFT_START}
        component={ShiftStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.BOTTOM_NAVIGATION}
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.TASK_INBOX}
        component={TaskInbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_TASK_DETAIL}
        component={PatientTaskDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ASSIGN_TASK}
        component={AssignTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ESCALATE_TASK}
        component={EscalateTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.TASK_COMPLETED}
        component={TaskCompleted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING}
        component={Scheduling}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
