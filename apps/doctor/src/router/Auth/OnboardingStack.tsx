import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnableVoiceHandsFree from "../../screens/Auth/EnableVoiceHandsFree";
import HipaaPrivacyGate from "../../screens/Auth/HipaaPrivacyGate";
import LegalConsent from "../../screens/Auth/LegalConsent";
import RoleAndLocation from "../../screens/Auth/RoleAndLocation";
import StartShiftCoverage from "../../screens/Auth/StartShiftCoverage";
import navigationStrings from "../../constants/navigationStrings";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={navigationStrings.HIPAA_PRIVACY_GATE}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name={navigationStrings.HIPAA_PRIVACY_GATE} component={HipaaPrivacyGate} />
      <Stack.Screen
        name={navigationStrings.ENABLE_VOICE_HANDS_FREE}
        component={EnableVoiceHandsFree}
      />
      <Stack.Screen name={navigationStrings.LEGAL_CONSENT} component={LegalConsent} />
      <Stack.Screen name={navigationStrings.ROLE_AND_LOCATION} component={RoleAndLocation} />
      <Stack.Screen name={navigationStrings.START_SHIFT_COVERAGE} component={StartShiftCoverage} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
