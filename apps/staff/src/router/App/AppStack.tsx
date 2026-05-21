import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../../constants/navigationStrings";
import AssignTask from "../../screens/App/TaskInbox/AssignTask";
import EscalateTask from "../../screens/App/TaskInbox/EscalateTask";
import PatientTaskDetail from "../../screens/App/TaskInbox/PatientTaskDetail";
import TaskCompleted from "../../screens/App/TaskInbox/TaskCompleted";
import ShiftStart from "../../screens/App/ShiftStart";
import TaskInbox from "../../screens/App/TaskInbox/TaskInbox";
import BottomNavigation from "./BottomNavigation";
import Cancellation from "../../screens/App/Scheduling/Cancellation";
import FillSlot from "../../screens/App/Scheduling/FillSlot";
import NoShowHandling from "../../screens/App/Scheduling/NoShowHandling";
import PendingApprovals from "../../screens/App/Scheduling/PendingApprovals";
import SchedulingAssignTask from "../../screens/App/Scheduling/SchedulingAssignTask";
import UrgentOpening from "../../screens/App/Scheduling/UrgentOpening";
import NotifyPatient from "../../screens/App/Scheduling/NotifyPatient";
import Reschedule from "../../screens/App/Scheduling/Reschedule";
import { Scheduling } from "../../screens/App/Scheduling/Scheduling";
import Staff from "../../screens/App/Staff/Staff";
import CreateEditStaff from "../../screens/App/Staff/CreateEditStaff";
import Labs from "../../screens/App/Labs/Labs";
import AssignNurse from "../../screens/App/Labs/AssignNurse";
import EscalateMessage from "../../screens/App/Labs/EscalateMessage";
import LabsNotifyPatient from "../../screens/App/Labs/NotifyPatient";
import ScheduleVisit from "../../screens/App/Labs/ScheduleVisit";
import ActionCompleted from "../../screens/App/Labs/ActionCompleted";
import AuthorizationDetail from "../../screens/App/Eligibility/AuthorizationDetail";
import AuthorizationTracking from "../../screens/App/Eligibility/AuthorizationTracking";
import AppealSubmission from "../../screens/App/Eligibility/AppealSubmission";
import DenialAnalysis from "../../screens/App/Eligibility/DenialAnalysis";
import DenialResolution from "../../screens/App/Eligibility/DenialResolution";
import EligibilityPriorAuth from "../../screens/App/Eligibility/EligibilityPriorAuth";
import MissingDocuments from "../../screens/App/Eligibility/MissingDocuments";
import RequestDocuments from "../../screens/App/Eligibility/RequestDocuments";
import { SCREEN_BG as ELIGIBILITY_SCREEN_BG } from "../../screens/App/Eligibility/eligibilityPriorAuthConstants";
import EndShiftSummary from "../../screens/App/Profile/EndShiftSummary";
import GeneralSettings from "../../screens/App/Profile/GeneralSettings";
import HelpTraining from "../../screens/App/Profile/HelpTraining";
import type { StaffMember } from "../../screens/App/Staff/staffTypes";

const eligibilityScreenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: ELIGIBILITY_SCREEN_BG },
} as const;

export type PatientTaskAvatarKey = "ganesh" | "default";

export type PatientTaskDetailParams = {
  patientName: string;
  age: number;
  taskStatus: string;
  taskDetailLine: string;
  dueBadgeText: string;
  avatar: PatientTaskAvatarKey;
  insightMessage1?: string;
  insightMessage2?: string;
};

export type AssignTaskParams = {
  patientName?: string;
};

export type LabsActionCompletedParams = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export type StaffFormParams = {
  isEdit?: boolean;
  initial?: StaffMember;
};

/** Must match `navigationStrings` + screen `name` props below. */
export type AppStackParamList = {
  Login: undefined;
  ShiftStart: undefined;
  BottomNavigation: undefined;
  TaskInbox: undefined;
  PatientTaskDetail: PatientTaskDetailParams;
  AssignTask: AssignTaskParams | undefined;
  EscalateTask: undefined;
  TaskCompleted: undefined;
  Scheduling: undefined;
  SchedulingCancellation: undefined;
  SchedulingNoShow: undefined;
  SchedulingUrgentOpening: undefined;
  SchedulingPendingApprovals: undefined;
  SchedulingNotifyPatient: undefined;
  SchedulingFillSlot: undefined;
  SchedulingAssignTask: undefined;
  SchedulingReschedule: undefined;
  Labs: undefined;
  LabsAssignNurse: undefined;
  LabsEscalateMessage: undefined;
  LabsNotifyPatient: undefined;
  LabsScheduleVisit: undefined;
  LabsActionCompleted: LabsActionCompletedParams | undefined;
  EligibilityPriorAuth: undefined;
  AuthorizationDetail: undefined;
  RequestDocuments: undefined;
  DenialResolution: undefined;
  AuthorizationTracking: undefined;
  MissingDocuments: undefined;
  DenialAnalysis: undefined;
  AppealSubmission: undefined;
  Staff: undefined;
  StaffForm: StaffFormParams | undefined;
  EndShiftSummary: undefined;
  GeneralSettings: undefined;
  HelpTraining: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={navigationStrings.SHIFT_START}
        component={ShiftStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.BOTTOM_NAVIGATION}
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.TASK_INBOX}
        component={TaskInbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.PATIENT_TASK_DETAIL}
        component={PatientTaskDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ASSIGN_TASK}
        component={AssignTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ESCALATE_TASK}
        component={EscalateTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.TASK_COMPLETED}
        component={TaskCompleted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING}
        component={Scheduling}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_CANCELLATION}
        component={Cancellation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_NO_SHOW}
        component={NoShowHandling}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_URGENT_OPENING}
        component={UrgentOpening}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_PENDING_APPROVALS}
        component={PendingApprovals}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_NOTIFY_PATIENT}
        component={NotifyPatient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_FILL_SLOT}
        component={FillSlot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_ASSIGN_TASK}
        component={SchedulingAssignTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULING_RESCHEDULE}
        component={Reschedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LABS}
        component={Labs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_ASSIGN_NURSE}
        component={AssignNurse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_ESCALATE_MESSAGE}
        component={EscalateMessage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_NOTIFY_PATIENT}
        component={LabsNotifyPatient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_SCHEDULE_VISIT}
        component={ScheduleVisit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LABS_ACTION_COMPLETED}
        component={ActionCompleted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ELIGIBILITY_PRIOR_AUTH}
        component={EligibilityPriorAuth}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.AUTHORIZATION_DETAIL}
        component={AuthorizationDetail}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.REQUEST_DOCUMENTS}
        component={RequestDocuments}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.DENIAL_RESOLUTION}
        component={DenialResolution}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.AUTHORIZATION_TRACKING}
        component={AuthorizationTracking}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.MISSING_DOCUMENTS}
        component={MissingDocuments}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.DENIAL_ANALYSIS}
        component={DenialAnalysis}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.APPEAL_SUBMISSION}
        component={AppealSubmission}
        options={eligibilityScreenOptions}
      />
      <Stack.Screen
        name={navigationStrings.STAFF}
        component={Staff}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.STAFF_FORM}
        component={CreateEditStaff}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.END_SHIFT_SUMMARY}
        component={EndShiftSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.GENERAL_SETTINGS}
        component={GeneralSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.HELP_TRAINING}
        component={HelpTraining}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
