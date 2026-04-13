import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
import OtpVerification from '../../screens/Auth/OtpVerification';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import ResetPassword from '../../screens/Auth/ResetPassword';
import navigationStrings from '../../constants/navigationStrings';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
      <Stack.Screen
        name={navigationStrings.OTP_VERIFICATION}
        component={OtpVerification}
      />
      <Stack.Screen
        name={navigationStrings.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={navigationStrings.RESET_PASSWORD}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
