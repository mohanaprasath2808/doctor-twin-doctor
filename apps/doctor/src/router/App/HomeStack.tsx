import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import ImagingResults from "../../screens/App/Home/ImagingResults/ImagingResults";
import ImagingAssignmentStatus from "../../screens/App/Home/ImagingResults/ImagingAssignmentStatus";
import SendToER from "../../screens/App/Home/ImagingResults/SendToER";
import ERInstructionsSent from "../../screens/App/Home/ImagingResults/ERInstructionsSent";
import RevenueDashboard from "../../screens/App/Home/Revenue/RevenueDashboard";
import AccountReceivable from "../../screens/App/Home/Revenue/AccountReceivable";
import ClaimsNeedFixing from "../../screens/App/Home/Revenue/ClaimsNeedFixing";
import ClaimDetail from "../../screens/App/Home/Revenue/ClaimDetail";
import UnsignedClaims from "../../screens/App/Home/Revenue/UnsignedClaims";
import ClaimSignature from "../../screens/App/Home/Revenue/ClaimSignature";
import ReturnToCoder from "../../screens/App/Home/Revenue/ReturnToCoder";
import CoderReviewQueue from "../../screens/App/Home/Revenue/CoderReviewQueue";
import BatchSignClaims from "../../screens/App/Home/Revenue/BatchSignClaims";
import ActionSuccess from "../../screens/App/Home/Revenue/components/ActionSuccess";
import DeniedClaims from "../../screens/App/Home/Revenue/DeniedClaims";
import DeniedDetails from "../../screens/App/Home/Revenue/DeniedDetails";
import AIAppealBuilder from "../../screens/App/Home/Revenue/AIAppealBuilder";
import WriteOff from "../../screens/App/Home/Revenue/WriteOff";
import CodingCorrection from "../../screens/App/Home/Revenue/CodingCorrection";
import ResubmitClaim from "../../screens/App/Home/Revenue/ResubmitClaim";
import ClaimTimeline from "../../screens/App/Home/Revenue/ClaimTimeline";
import PaymentsMonthToDate from "../../screens/App/Home/Revenue/PaymentsMonthToDate";
import ClaimCorrection from "../../screens/App/Home/Revenue/ClaimCorrection";
import PaymentReconciliation from "../../screens/App/Home/Revenue/PaymentReconciliation";
import AdjustPayment from "../../screens/App/Home/Revenue/AdjustPayment";
import ChargesMonthToDate from "../../screens/App/Home/Revenue/ChargesMonthToDate";
import EncounterChargeEditor from "../../screens/App/Home/Revenue/EncounterChargeEditor";
import SendOptions from "../../screens/App/Home/Revenue/SendOptions";
import PacketPreview from "../../screens/App/Home/Revenue/PacketPreview";
import SubmitClaim from "../../screens/App/Home/Revenue/SubmitClaim";
import UploadDocuments from "../../screens/App/Home/Revenue/UploadDocuments";
import RevenuePdfPreview from "../../screens/App/Home/Revenue/RevenuePdfPreview";
import ClaimWorklist from "../../screens/App/Home/Revenue/ClaimWorklist";
import EscalateIssue from "../../screens/App/Home/Revenue/EscalateIssue";
import BillingAlerts from "../../screens/App/Home/Revenue/BillingAlerts";
import MessageToBiller from "../../screens/App/Home/Revenue/MessageToBiller";
import DenialReasonsStatistics from "../../screens/App/Home/Revenue/DenialReasonsStatistics";
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
      <Stack.Screen name={navigationStrings.ACCOUNT_RECEIVABLE} component={AccountReceivable} />
      <Stack.Screen name={navigationStrings.CLAIMS_NEED_FIXING} component={ClaimsNeedFixing} />
      <Stack.Screen name={navigationStrings.CLAIM_DETAIL} component={ClaimDetail} />
      <Stack.Screen name={navigationStrings.UNSIGNED_CLAIMS} component={UnsignedClaims} />
      <Stack.Screen name={navigationStrings.CLAIM_SIGNATURE} component={ClaimSignature} />
      <Stack.Screen name={navigationStrings.RETURN_TO_CODER} component={ReturnToCoder} />
      <Stack.Screen name={navigationStrings.CODER_REVIEW_QUEUE} component={CoderReviewQueue} />
      <Stack.Screen name={navigationStrings.BATCH_SIGN_CLAIMS} component={BatchSignClaims} />
      <Stack.Screen name={navigationStrings.ACTION_SUCCESS} component={ActionSuccess} />
      <Stack.Screen name={navigationStrings.DENIED_CLAIMS} component={DeniedClaims} />
      <Stack.Screen name={navigationStrings.DENIED_DETAILS} component={DeniedDetails} />
      <Stack.Screen name={navigationStrings.AI_APPEAL_BUILDER} component={AIAppealBuilder} />
      <Stack.Screen name={navigationStrings.WRITE_OFF} component={WriteOff} />
      <Stack.Screen name={navigationStrings.CODING_CORRECTION} component={CodingCorrection} />
      <Stack.Screen name={navigationStrings.RESUBMIT_CLAIM} component={ResubmitClaim} />
      <Stack.Screen name={navigationStrings.CLAIM_TIMELINE} component={ClaimTimeline} />
      <Stack.Screen
        name={navigationStrings.PAYMENTS_MONTH_TO_DATE}
        component={PaymentsMonthToDate}
      />
      <Stack.Screen name={navigationStrings.CLAIM_CORRECTION} component={ClaimCorrection} />
      <Stack.Screen
        name={navigationStrings.PAYMENT_RECONCILIATION}
        component={PaymentReconciliation}
      />
      <Stack.Screen name={navigationStrings.ADJUST_PAYMENT} component={AdjustPayment} />
      <Stack.Screen
        name={navigationStrings.CHARGES_MONTH_TO_DATE}
        component={ChargesMonthToDate}
      />
      <Stack.Screen
        name={navigationStrings.ENCOUNTER_CHARGE_EDITOR}
        component={EncounterChargeEditor}
      />
      <Stack.Screen name={navigationStrings.SEND_OPTIONS} component={SendOptions} />
      <Stack.Screen name={navigationStrings.PACKET_PREVIEW} component={PacketPreview} />
      <Stack.Screen name={navigationStrings.SUBMIT_CLAIM} component={SubmitClaim} />
      <Stack.Screen name={navigationStrings.UPLOAD_DOCUMENTS} component={UploadDocuments} />
      <Stack.Screen name={navigationStrings.REVENUE_PDF_PREVIEW} component={RevenuePdfPreview} />
      <Stack.Screen name={navigationStrings.CLAIM_WORKLIST} component={ClaimWorklist} />
      <Stack.Screen name={navigationStrings.ESCALATE_ISSUE} component={EscalateIssue} />
      <Stack.Screen name={navigationStrings.BILLING_ALERTS} component={BillingAlerts} />
      <Stack.Screen name={navigationStrings.MESSAGE_TO_BILLER} component={MessageToBiller} />
      <Stack.Screen
        name={navigationStrings.DENIAL_REASONS_STATISTICS}
        component={DenialReasonsStatistics}
      />
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
