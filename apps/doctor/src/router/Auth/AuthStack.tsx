import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BackupCodesSessionTimeout from '../../screens/Auth/BackupCodesSessionTimeout';
import EmergencyAccess from '../../screens/Auth/EmergencyAccess';
import EnableVoiceHandsFree from '../../screens/Auth/EnableVoiceHandsFree';
import DeviceTrustVerification from '../../screens/Auth/DeviceTrustVerification';
import HipaaPrivacyGate from '../../screens/Auth/HipaaPrivacyGate';
import LegalConsent from '../../screens/Auth/LegalConsent';
import RoleAndLocation from '../../screens/Auth/RoleAndLocation';
import SecureLogin from '../../screens/Auth/SecureLogin';
import SetUserPin from '../../screens/Auth/SetUserPin';
import StartShiftCoverage from '../../screens/Auth/StartShiftCoverage';
import SsoSignIn from '../../screens/Auth/SsoSignIn';
import navigationStrings from '../../constants/navigationStrings';

const Stack = createNativeStackNavigator();

/**
 * Temporary demo flow (until API integration): each primary action advances in order,
 * then EmergencyAccess calls AuthContext setIsLogin(true) so Router mounts AppStack (Home).
 *
 * Order: SSO → HIPAA → Voice hands-free → Role & location → Start shift → Legal consent
 * → Secure login → Set PIN → Device trust → Backup codes → Emergency access → App (Home).
 */
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={navigationStrings.SSO_SIGN_IN}
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                headerBackButtonDisplayMode: 'minimal',
            }}
        >
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
