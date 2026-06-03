import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import ImagingResults from "../../screens/App/Home/ImagingResults/ImagingResults";
import ImagingAssignmentStatus from "../../screens/App/Home/ImagingResults/ImagingAssignmentStatus";
import SendToER from "../../screens/App/Home/ImagingResults/SendToER";
import ERInstructionsSent from "../../screens/App/Home/ImagingResults/ERInstructionsSent";
import RevenueDashboard from "../../screens/App/Home/Revenue/RevenueDashboard";
import PatientConcernFlagged from "../../screens/App/Home/PatientConcernFlagged/PatientConcernFlagged";
import ConcernMessagePatient from "../../screens/App/Home/PatientConcernFlagged/ConcernMessagePatient";
import PriorAuthorization from "../../screens/App/Home/PriorAuth/PriorAuthorization";
import EditPriorAuthorization from "../../screens/App/Home/PriorAuth/EditPriorAuthorization";
import AppealCreated from "../../screens/App/Home/PriorAuth/AppealCreated";
import PriorAuthorizationSubmitted from "../../screens/App/Home/PriorAuth/PriorAuthorizationSubmitted";
import PAStatusMonitor from "../../screens/App/Home/PriorAuth/PAStatusMonitor";
import PriorAuthorizationDenied from "../../screens/App/Home/PriorAuth/PriorAuthorizationDenied";
import StartVisit from "../../screens/App/Home/Scribe/StartVisit";
import AIScribe from "../../screens/App/Home/Scribe/AIScribe";
import GenerateNotes from "../../screens/App/Home/Scribe/GenerateNotes";
import GenerateSummary from "../../screens/App/Home/Scribe/GenerateSummary";
import ReviewAndEdit from "../../screens/App/Home/Scribe/ReviewAndEdit";
import MessagePatient from "../../screens/App/Home/Labs/MessagePatient";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.HOME} component={Home} />
      <Stack.Screen name={navigationStrings.IMAGING_RESULTS} component={ImagingResults} />
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
      <Stack.Screen name={navigationStrings.SEND_TO_ER} component={SendToER} />
      <Stack.Screen name={navigationStrings.ER_INSTRUCTIONS_SENT} component={ERInstructionsSent} />
      <Stack.Screen name={navigationStrings.REVENUE_DASHBOARD} component={RevenueDashboard} />
      <Stack.Screen
        name={navigationStrings.PATIENT_CONCERN_FLAGGED}
        component={PatientConcernFlagged}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_CONCERN_MESSAGE_PATIENT}
        component={ConcernMessagePatient}
      />
      <Stack.Screen name={navigationStrings.PRIOR_AUTHORIZATION} component={PriorAuthorization} />
      <Stack.Screen
        name={navigationStrings.EDIT_PRIOR_AUTHORIZATION}
        component={EditPriorAuthorization}
      />
      <Stack.Screen name={navigationStrings.PRIOR_AUTH_APPEAL_CREATED} component={AppealCreated} />
      <Stack.Screen
        name={navigationStrings.PRIOR_AUTHORIZATION_SUBMITTED}
        component={PriorAuthorizationSubmitted}
      />
      <Stack.Screen name={navigationStrings.PA_STATUS_MONITOR} component={PAStatusMonitor} />
      <Stack.Screen
        name={navigationStrings.PRIOR_AUTHORIZATION_DENIED}
        component={PriorAuthorizationDenied}
      />
      <Stack.Screen name={navigationStrings.START_VISIT} component={StartVisit} />
      <Stack.Screen name={navigationStrings.AI_SCRIBE} component={AIScribe} />
      <Stack.Screen name={navigationStrings.GENERATE_NOTES} component={GenerateNotes} />
      <Stack.Screen name={navigationStrings.GENERATE_SUMMARY} component={GenerateSummary} />
      <Stack.Screen name={navigationStrings.REVIEW_AND_EDIT} component={ReviewAndEdit} />
      <Stack.Screen name={navigationStrings.MESSAGE_PATIENT} component={MessagePatient} />
    </Stack.Navigator>
  );
};

export default HomeStack;
