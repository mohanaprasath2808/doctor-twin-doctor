import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnableVoiceHandsFree from '../../screens/Auth/EnableVoiceHandsFree';
import HipaaPrivacyGate from '../../screens/Auth/HipaaPrivacyGate';
import SsoSignIn from '../../screens/Auth/SsoSignIn';
import navigationStrings from '../../constants/navigationStrings';

const Stack = createNativeStackNavigator();

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

        </Stack.Navigator>
    );
};

export default AuthStack;
