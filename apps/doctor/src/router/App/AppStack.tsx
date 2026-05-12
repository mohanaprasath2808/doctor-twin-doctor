import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import Home from "../../screens/App/Home";
import MorningBrief from "../../screens/App/Home/MorningBrief";
import PracticeIntelligence from "../../screens/App/Home/PracticeIntelligence";
import ReportHub from "../../screens/App/Home/PractceIntelligence/ReportHub";
import Schedule from "../../screens/App/Home/Schedule/Schedule";
import Patients from "../../screens/App/Home/Patient/Patients";
import PatientSnapshot from "../../screens/App/Home/Patient/PatientSnapshot";
import TodayVisits from "../../screens/App/Home/TodayVisits/TodayVisits";
import VisitHub from "../../screens/App/Home/TodayVisits/VisitHub";
import ReceptionIntake from "../../screens/App/Home/TodayVisits/ReceptionIntake/ReceptionIntake";
import CheckIn from "../../screens/App/Home/TodayVisits/ReceptionIntake/CheckIn";
import Insurance from "../../screens/App/Home/TodayVisits/ReceptionIntake/Insurance";
import EditInsurance from "../../screens/App/Home/TodayVisits/ReceptionIntake/EditInsurance";
import Demographics from "../../screens/App/Home/TodayVisits/ReceptionIntake/Demographics";
import EditDemographics from "../../screens/App/Home/TodayVisits/ReceptionIntake/EditDemographics";
import PatientSummary from "../../screens/App/Home/TodayVisits/ReceptionIntake/PatientSummary";
import Forms from "../../screens/App/Home/TodayVisits/ReceptionIntake/Forms";
import EmergencyIntake from "../../screens/App/Home/TodayVisits/ReceptionIntake/EmergencyIntake";
import ReceptionIntakeCompleted from "../../screens/App/Home/TodayVisits/ReceptionIntake/ReceptionIntakeCompleted";
import RecentResults from "../../screens/App/Home/TodayVisits/RecentResults";
import PriorAuthorization from "../../screens/App/Home/TodayVisits/PriorAuthorization";
import OrderHub from "../../screens/App/Home/TodayVisits/OrderHub";
import RecentConsults from "../../screens/App/Home/TodayVisits/RecentConsults";
import Messages from "../../screens/App/Home/TodayVisits/Messages";
import PreventiveCare from "../../screens/App/Home/PreventiveCare/PreventiveCare";
import ClinicalSummary from "../../screens/App/Home/TodayVisits/ClinicalSummary";
import LabsDashboard from "../../screens/App/Home/Labs/LabsDashboard";
import LabAlertDecision from "../../screens/App/Home/Labs/LabAlertDecision";
import LabsDetail from "../../screens/App/Home/Labs/LabsDetail";
import LabLocation from "../../screens/App/Home/Labs/LabLocation";
import OrderSent from "../../screens/App/Home/Labs/OrderSent";
import MessagePatient from "../../screens/App/Home/Labs/MessagePatient";
import ScheduleVisit from "../../screens/App/Home/Labs/ScheduleVisit";
import FullPatientChart from "../../screens/App/Home/Labs/FullPatientChart";
import Vitals from "../../screens/App/Home/Labs/Vitals";
import PracticeSchedule from "../../screens/App/Home/Schedule/PracticeSchedule";
import MyCalender from "../../screens/App/Home/Schedule/MyCalender";
import ToDoList from "../../screens/App/Home/Schedule/ToDoList";
import CreateTask from "../../screens/App/Home/Schedule/CreateTask";
import DelegationCreateTask from "../../screens/App/Home/Delegation/CreateTask";
import AddEvent from "../../screens/App/Home/Schedule/AddEvent";
import EventDetails from "../../screens/App/Home/Schedule/EventDetails";
import RefillEscalation from "../../screens/App/Home/RefillEscalation/RefillEscalation";
import RefillRequestDetail from "../../screens/App/Home/RefillEscalation/RefillRequestDetail";
import PatientMessagePreview from "../../screens/App/Home/RefillEscalation/PatientMessagePreview";
import DelegateReviewToStaff from "../../screens/App/Home/RefillEscalation/DelegateReviewToStaff";
import MedSpa from "../../screens/App/Home/Schedule/PracticeSchedule/MedSpa";
import HospitalRounds from "../../screens/App/Home/Schedule/PracticeSchedule/HospitalRounds";
import FollowUps from "../../screens/App/Home/Schedule/PracticeSchedule/FollowUps";
import PreOps from "../../screens/App/Home/Schedule/PracticeSchedule/PreOps";
import Physicals from "../../screens/App/Home/Schedule/PracticeSchedule/Physicals";
import LabsReview from "../../screens/App/Home/RefillEscalation/LabsReview";
import OrderLabs from "../../screens/App/Home/RefillEscalation/OrderLabs";
import RefillScheduleVisit from "../../screens/App/Home/RefillEscalation/ScheduleVisit";
import SendRefill from "../../screens/App/Home/RefillEscalation/SendRefill";
import RefillSent from "../../screens/App/Home/RefillEscalation/RefillSent";
import RequestReviewSent from "../../screens/App/Home/RefillEscalation/RequestReviewSent";
import TaskCreated from "../../screens/App/Home/RefillEscalation/TaskCreated";
import SafetyWarning from "../../screens/App/Home/RefillEscalation/SafetyWarning";
import ShortSupplyApproval from "../../screens/App/Home/RefillEscalation/ShortSupplyApproval";
import EligibilityPayerRules from "../../screens/App/Home/PayerRules/EligibilityPayerRules";
import PatientVerification from "../../screens/App/Home/PatientVerification/PatientVerification";
import DoctorReview from "../../screens/App/Home/Delegation/DoctorReview";
import StaffConsole from "../../screens/App/Home/Delegation/StaffConsole";
import DelegationRoute from "../../screens/App/Home/Delegation/DelegationRoute";
import ReopenTask from "../../screens/App/Home/Delegation/ReopenTask";
import RejectTask from "../../screens/App/Home/Delegation/RejectTask";
import EscalationTask from "../../screens/App/Home/Delegation/EscalationTask";
import ReassignTask from "../../screens/App/Home/Delegation/ReassignTask";
import CompletionTask from "../../screens/App/Home/Delegation/CompletionTask";
import AuditTrail from "../../screens/App/Home/Delegation/AuditTrail";
import EndEncounter from "../../screens/App/Home/PreVisitSummary/EndEncounter";
import PreVisitSummary from "../../screens/App/Home/PreVisitSummary/PreVisitSummary";
import EncounterOrderLabs from "../../screens/App/Home/PreVisitSummary/EncounterOrderLabs";
import AddPrescription from "../../screens/App/Home/PreVisitSummary/AddPrescription";
import AddEncounterNote from "../../screens/App/Home/PreVisitSummary/AddEncounterNote";
import AddDiagnosis from "../../screens/App/Home/PreVisitSummary/AddDiagnosis";
import EncounterSummary from "../../screens/App/Home/PreVisitSummary/EncounterSummary";
import EncounterCompleted from "../../screens/App/Home/PreVisitSummary/EncounterCompleted";
import OrderEngine from "../../screens/App/Home/OrderEngine/OrderEngine";
import OrderSuccessfullyPlaced from "../../screens/App/Home/OrderEngine/OrderSuccessfullyPlaced";
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name={navigationStrings.MORNING_BRIEF}
        component={MorningBrief}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PRACTICE_INTELLIGENCE}
        component={PracticeIntelligence}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.TODAY_VISITS}
        component={TodayVisits}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.VISIT_HUB}
        component={VisitHub}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.CLINICAL_SUMMARY}
        component={ClinicalSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_INTAKE}
        component={ReceptionIntake}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_CHECK_IN}
        component={CheckIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_INSURANCE}
        component={Insurance}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_EDIT_INSURANCE}
        component={EditInsurance}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_DEMOGRAPHICS}
        component={Demographics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_EDIT_DEMOGRAPHICS}
        component={EditDemographics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_PATIENT_SUMMARY}
        component={PatientSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_FORMS}
        component={Forms}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_EMERGENCY_INTAKE}
        component={EmergencyIntake}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECEPTION_INTAKE_COMPLETED}
        component={ReceptionIntakeCompleted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.PREVENTIVE_CARE}
        component={PreventiveCare}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECENT_RESULTS}
        component={RecentResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.VISIT_MESSAGES}
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.RECENT_CONSULTS}
        component={RecentConsults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.PRIOR_AUTHORIZATION}
        component={PriorAuthorization}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_HUB}
        component={OrderHub}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.STAFF_CONSOLE}
        component={StaffConsole}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.DOCTOR_REVIEW}
        component={DoctorReview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.DELEGATION_ROUTE}
        component={DelegationRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REOPEN_TASK}
        component={ReopenTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REJECT_TASK}
        component={RejectTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ESCALATION_TASK}
        component={EscalationTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REASSIGN_TASK}
        component={ReassignTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.COMPLETION_TASK}
        component={CompletionTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.AUDIT_TRAIL}
        component={AuditTrail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REPORT_HUB}
        component={ReportHub}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE}
        component={Schedule}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PRACTICE_SCHEDULE}
        component={PracticeSchedule}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.MY_CALENDER}
        component={MyCalender}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.TO_DO_LIST}
        component={ToDoList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.CREATE_TASK}
        component={CreateTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.DELEGATION_CREATE_TASK}
        component={DelegationCreateTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ADD_EVENT}
        component={AddEvent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.EVENT_DETAILS}
        component={EventDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENTS}
        component={Patients}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_SNAPSHOT}
        component={PatientSnapshot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_DASHBOARD}
        component={LabsDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LAB_ALERT_DECISION}
        component={LabAlertDecision}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_DETAIL}
        component={LabsDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LAB_LOCATION}
        component={LabLocation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_SENT}
        component={OrderSent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.MESSAGE_PATIENT}
        component={MessagePatient}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_VISIT}
        component={ScheduleVisit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.FULL_PATIENT_CHART}
        component={FullPatientChart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.VITALS}
        component={Vitals}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REFILL_ESCALATION}
        component={RefillEscalation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REFILL_REQUEST_DETAILS}
        component={RefillRequestDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.DELEGATE_REVIEW_TO_STAFF}
        component={DelegateReviewToStaff}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_MESSAGE_PREVIEW}
        component={PatientMessagePreview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_REVIEW}
        component={LabsReview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_LABS}
        component={OrderLabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REFILL_SCHEDULE_VISIT}
        component={RefillScheduleVisit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SEND_REFILL}
        component={SendRefill}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REFILL_SENT}
        component={RefillSent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.REQUEST_REVIEW_SENT}
        component={RequestReviewSent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.TASK_CREATED}
        component={TaskCreated}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SAFETY_WARNING}
        component={SafetyWarning}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SHORT_SUPPLY_APPROVAL}
        component={ShortSupplyApproval}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ELIGIBILITY_PAYER_RULES}
        component={EligibilityPayerRules}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_VERIFICATION}
        component={PatientVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.MED_SPA}
        component={MedSpa}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.HOSPITAL_ROUNDS}
        component={HospitalRounds}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.FOLLOW_UPS}
        component={FollowUps}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PRE_OPS}
        component={PreOps}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PHYSICALS}
        component={Physicals}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.PRE_VISIT_SUMMARY}
        component={PreVisitSummary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.END_ENCOUNTER}
        component={EndEncounter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ENCOUNTER_ORDER_LABS}
        component={EncounterOrderLabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ADD_PRESCRIPTION}
        component={AddPrescription}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ADD_ENCOUNTER_NOTE}
        component={AddEncounterNote}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ADD_DIAGNOSIS}
        component={AddDiagnosis}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ENCOUNTER_SUMMARY}
        component={EncounterSummary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ENCOUNTER_COMPLETED}
        component={EncounterCompleted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_ENGINE}
        component={OrderEngine}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_SUCCESSFULLY_PLACED}
        component={OrderSuccessfullyPlaced}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
