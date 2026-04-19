import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import ForgotPassword from "../../screens/Auth/ForgotPassword";
import Login from "../../screens/Auth/Login";
import ResetPassword from "../../screens/Auth/ResetPassword";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={navigationStrings.LOGIN}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={navigationStrings.RESET_PASSWORD} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
