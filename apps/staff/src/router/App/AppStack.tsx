import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import ShiftStart from "../../screens/App/ShiftStart";

import BottomNavigation from "./BottomNavigation";

const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
};

export default AppStack;
