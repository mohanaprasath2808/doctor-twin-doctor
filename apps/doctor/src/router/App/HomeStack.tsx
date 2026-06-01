import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import ImagingResults from "../../screens/App/Home/ImagingResults/ImagingResults";
import ImagingAssignmentStatus from "../../screens/App/Home/ImagingResults/ImagingAssignmentStatus";
import SendToER from "../../screens/App/Home/ImagingResults/SendToER";
import ERInstructionsSent from "../../screens/App/Home/ImagingResults/ERInstructionsSent";
import RevenueDashboard from "../../screens/App/Home/Revenue/RevenueDashboard";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.HOME} component={Home} />
      <Stack.Screen
        name={navigationStrings.IMAGING_RESULTS}
        component={ImagingResults}
      />
      <Stack.Screen
        name={navigationStrings.URGENT_VISIT_SCHEDULING}
        component={ImagingAssignmentStatus}
        initialParams={{ mode: "urgentVisit" }}
      />
      <Stack.Screen
        name={navigationStrings.REQUESTED_ASSIGNED}
        component={ImagingAssignmentStatus}
        initialParams={{ mode: "requestedAssigned" }}
      />
      <Stack.Screen
        name={navigationStrings.SEND_TO_ER}
        component={SendToER}
      />
      <Stack.Screen
        name={navigationStrings.ER_INSTRUCTIONS_SENT}
        component={ERInstructionsSent}
      />
      <Stack.Screen
        name={navigationStrings.REVENUE_DASHBOARD}
        component={RevenueDashboard}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
