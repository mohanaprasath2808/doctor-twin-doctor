import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import PracticeIntelligence from "../../screens/App/Home/PracticeIntelligence";
import ReportHub from "../../screens/App/Home/ReportHub";

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
    </Stack.Navigator>
  );
};

export default AppStack;
