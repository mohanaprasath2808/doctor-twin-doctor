import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import navigationStrings from "../../constants/navigationStrings";
import LoginScreen from "../../screens/Auth/LoginScreen";
import SignUpScreen from "../../screens/Auth/SignUpScreen";
import OtpVerification from "../../screens/Auth/OtpVerification";
import ChooseLoginMethodScreen from "../../screens/Auth/ChooseLoginMethodScreen";
import VerifyIdentity from "../../screens/Auth/VerifyIdentity";
import SetPreferencesScreen from "../../screens/Auth/SetPreferences";
import UserPinScreen from "../../screens/Auth/UserPin";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.LOGIN} component={LoginScreen} />
      <Stack.Screen name={navigationStrings.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={navigationStrings.OTP_VERIFICATION} component={OtpVerification} />
      <Stack.Screen
        name={navigationStrings.CHOOSE_LOGIN_METHOD}
        component={ChooseLoginMethodScreen}
      />
      <Stack.Screen name={navigationStrings.VERIFY_IDENTITY} component={VerifyIdentity} />
      <Stack.Screen name={navigationStrings.SET_PREFERENCES} component={SetPreferencesScreen} />
      <Stack.Screen name={navigationStrings.USER_PIN} component={UserPinScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
