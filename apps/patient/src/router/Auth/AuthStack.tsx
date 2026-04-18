import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../../constants/navigationStrings";
import Login from "../../screens/Auth/Login";
import HelpSigningIn from "../../screens/Auth/HelpSigningIn";
import SignUp from "../../screens/Auth/SignUp";
import OtpVerification from "../../screens/Auth/OtpVerification";
import ForgotPassword from "../../screens/Auth/ForgotPassword";
import ResetPassword from "../../screens/Auth/ResetPassword";
import SetUserPin from "../../screens/Auth/SetUserPin";
import VerifyIdentity from "../../screens/Auth/VerifyIdentity";
import AcceptConsent from "../../screens/Auth/AcceptConsent";
import SetPreferences from "../../screens/Auth/SetPreferences";
import Sync from "../../screens/Auth/Sync";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
      <Stack.Screen name={navigationStrings.HELP_SIGNING_IN} component={HelpSigningIn} />
      <Stack.Screen name={navigationStrings.OTP_VERIFICATION} component={OtpVerification} />
      <Stack.Screen name={navigationStrings.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={navigationStrings.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={navigationStrings.SET_USER_PIN} component={SetUserPin} />
      <Stack.Screen name={navigationStrings.VERIFY_IDENTITY} component={VerifyIdentity} />
      <Stack.Screen name={navigationStrings.ACCEPT_CONSENT} component={AcceptConsent} />
      <Stack.Screen name={navigationStrings.SET_PREFERENCES} component={SetPreferences} />
      <Stack.Screen name={navigationStrings.SYNC} component={Sync} />
    </Stack.Navigator>
  );
};

export default AuthStack;
