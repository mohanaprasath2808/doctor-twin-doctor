import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import PracticeIntelligence from "../../screens/App/Home/PracticeIntelligence";
import ReportHub from "../../screens/App/Home/ReportHub";
import Schedule from "../../screens/App/Schedule";
import PracticeSchedule from "../../screens/App/Home/PractceIntelligence/PracticeSchedule";
import MyCalender from "../../screens/App/Home/PractceIntelligence/MyCalender";
import ToDoList from "../../screens/App/Home/PractceIntelligence/ToDoList";
import CreateTask from "../../screens/App/Home/PractceIntelligence/CreateTask";
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
    </Stack.Navigator>
  );
};

export default AppStack;
