import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthBootstrap from '../../screens/Auth/AuthBootstrap';
import BackupCodesSessionTimeout from '../../screens/Auth/BackupCodesSessionTimeout';
import EmergencyAccess from '../../screens/Auth/EmergencyAccess';
import EnableVoiceHandsFree from '../../screens/Auth/EnableVoiceHandsFree';
import DeviceTrustVerification from '../../screens/Auth/DeviceTrustVerification';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import HipaaPrivacyGate from '../../screens/Auth/HipaaPrivacyGate';
import LegalConsent from '../../screens/Auth/LegalConsent';
import Login from '../../screens/Auth/Login';
import OtpVerification from '../../screens/Auth/OtpVerification';
import ResetPassword from '../../screens/Auth/ResetPassword';
import RoleAndLocation from '../../screens/Auth/RoleAndLocation';
import SecureLogin from '../../screens/Auth/SecureLogin';
import SetUserPin from '../../screens/Auth/SetUserPin';
import SignUp from '../../screens/Auth/SignUp';
import StartShiftCoverage from '../../screens/Auth/StartShiftCoverage';
import SsoSignIn from '../../screens/Auth/SsoSignIn';
import navigationStrings from '../../constants/navigationStrings';

const Stack = createNativeStackNavigator();

/**
 * Temporary demo flow (until API integration): each primary action advances in order,
 * then EmergencyAccess calls useAuthStore setIsLogin(true) so Router mounts AppStack (Home).
 *
 * Order: Bootstrap → SSO → … → Secure login → … → Emergency access → App (Home).
 * Returning users: Bootstrap → Secure login (Face ID) → App.
 */
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={navigationStrings.LOGIN}
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
            <Stack.Screen name={navigationStrings.AUTH_BOOTSTRAP} component={AuthBootstrap} />
            <Stack.Screen name={navigationStrings.SSO_SIGN_IN} component={SsoSignIn} />
            <Stack.Screen
                name={navigationStrings.HIPAA_PRIVACY_GATE}
                component={HipaaPrivacyGate}
            />
            <Stack.Screen
                name={navigationStrings.ENABLE_VOICE_HANDS_FREE}
                component={EnableVoiceHandsFree}
            />
            <Stack.Screen
                name={navigationStrings.ROLE_AND_LOCATION}
                component={RoleAndLocation}
            />
            <Stack.Screen
                name={navigationStrings.START_SHIFT_COVERAGE}
                component={StartShiftCoverage}
            />
            <Stack.Screen
                name={navigationStrings.LEGAL_CONSENT}
                component={LegalConsent}
            />
            <Stack.Screen
                name={navigationStrings.SECURE_LOGIN}
                component={SecureLogin}
            />
            <Stack.Screen
                name={navigationStrings.SET_USER_PIN}
                component={SetUserPin}
            />
            <Stack.Screen
                name={navigationStrings.DEVICE_TRUST_VERIFICATION}
                component={DeviceTrustVerification}
            />
            <Stack.Screen
                name={navigationStrings.BACKUP_CODES_SESSION_TIMEOUT}
                component={BackupCodesSessionTimeout}
            />
            <Stack.Screen
                name={navigationStrings.EMERGENCY_ACCESS}
                component={EmergencyAccess}
            />

        </Stack.Navigator>
    );
};

export default AuthStack;
