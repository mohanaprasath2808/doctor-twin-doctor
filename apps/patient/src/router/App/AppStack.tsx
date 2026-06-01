import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../../constants/navigationStrings";
import Appointments from "../../screens/App/Appointments/Appointments";
import AppointmentDetail from "../../screens/App/Appointments/AppointmentDetail";
import AppointmentConfirm from "../../screens/App/Appointments/AppointmentConfirm";
import AppointmentScheduled from "../../screens/App/Appointments/AppointmentScheduled";
import ScheduleStep1 from "../../screens/App/Appointments/ScheduleStep1";
import ScheduleStep2 from "../../screens/App/Appointments/ScheduleStep2";
import ScheduleStep3 from "../../screens/App/Appointments/ScheduleStep3";
import Labs from "../../screens/App/Labs/Labs";
import Imaging from "../../screens/App/Imaging/Imaging";
import LabRequest from "../../screens/App/Labs/LabRequest";
import LabResults from "../../screens/App/Labs/LabResults";
import LabResultDetail from "../../screens/App/Labs/LabResultDetail";
import MyProfile from "../../screens/App/MyProfile";
import EditProfile from "../../screens/App/EditProfile";
import Communication from "../../screens/App/Communication";
import PrivacySecurity from "../../screens/App/PrivacySecurity";
import DeviceSessions from "../../screens/App/DeviceSessions";
import HelpTraining from "../../screens/App/HelpTraining";
import SupportTicket from "../../screens/App/SupportTicket";
import TicketSubmission from "../../screens/App/TicketSubmission";
import EmergencySafety from "../../screens/App/EmergencySafety";
import WellnessMedSpa from "../../screens/App/Wellness/WellnessMedSpa";
import TreatmentMenu from "../../screens/App/Wellness/TreatmentMenu";
import BookAppointment from "../../screens/App/Wellness/BookAppointment";
import WellnessSuccess from "../../screens/App/Wellness/WellnessSuccess";
import BeforeAfterGallery from "../../screens/App/Wellness/BeforeAfterGallery";
import TreatmentResult from "../../screens/App/Wellness/TreatmentResult";
import Membership from "../../screens/App/Wellness/Membership";
import CompleteSubscription from "../../screens/App/Wellness/CompleteSubscription";
import BottomNavigation from "./BottomNavigation";
import ImagingRequest from "../../screens/App/Imaging/ImagingRequest";
import ImagingResults from "../../screens/App/Imaging/ImagingResults";
import ImagingResultsDetails from "../../screens/App/Imaging/ImagingResultsDetails";
import ViewReport from "../../screens/App/Imaging/ViewReport";
import ViewDocument from "../../screens/App/Imaging/ViewDocument";
import Billing from "../../screens/App/Billing/Billing";
import StatementDetail from "../../screens/App/Billing/StatementDetail";
import PaymentSuccessful from "../../screens/App/Billing/PaymentSuccessful";
import InsuranceEligibility from "../../screens/App/Insurance/InsuranceEligibility";
import AddNewInsurance from "../../screens/App/Insurance/AddNewInsurance";
import InsuranceVerifiedDetail from "../../screens/App/Insurance/InsuranceVerifiedDetail";
import InsuranceNeedUpdateDetail from "../../screens/App/Insurance/InsuranceNeedUpdateDetail";
import MyRecords from "../../screens/App/MyRecords/MyRecords";
import ImmunizationRecord from "../../screens/App/MyRecords/ImmunizationRecord";
import FormsLibrary from "../../screens/App/MyRecords/FormsLibrary";
import PracticeDocuments from "../../screens/App/MyRecords/PracticeDocuments";
import UploadCenter from "../../screens/App/MyRecords/UploadCenter";
import RequestRecords from "../../screens/App/MyRecords/RequestRecords";
import ProblemList from "../../screens/App/MyRecords/ProblemList";
import ProblemDetail from "../../screens/App/MyRecords/ProblemDetail";
import Allergies from "../../screens/App/MyRecords/Allergies";
import AllergyDetail from "../../screens/App/MyRecords/AllergyDetail";
import Referrals from "../../screens/App/Referrals/Referrals";
import ReferralDetail from "../../screens/App/Referrals/ReferralDetail";
import RequestNewReferral from "../../screens/App/Referrals/RequestNewReferral";
import ReferralStatus from "../../screens/App/Referrals/ReferralStatus";
import ConsultReportsInbox from "../../screens/App/ConsultReports/ConsultReportsInbox";
import ConsultReportDetail from "../../screens/App/ConsultReports/ConsultReportDetail";
import ShareConsultReport from "../../screens/App/ConsultReports/ShareConsultReport";
import HealthJournal from "../../screens/App/HealthJournal/HealthJournal";
import HealthJournalEntry from "../../screens/App/HealthJournal/HealthJournalEntry";
import HealthJournalReadingSaved from "../../screens/App/HealthJournal/HealthJournalReadingSaved";
import WeeklySummary from "../../screens/App/HealthJournal/WeeklySummary";
import HealthJournalTrends from "../../screens/App/HealthJournal/HealthJournalTrends";
import Medications from "../../screens/App/Medications/Medications";
import MedicationDetail from "../../screens/App/Medications/MedicationDetail";
import PriorAuthorization from "../../screens/App/Medications/PriorAuthorization";
import CompleteQuestionnaire from "../../screens/App/Medications/CompleteQuestionnaire";
import RequestRefill from "../../screens/App/Medications/RequestRefill";
import RefillStatus from "../../screens/App/Medications/RefillStatus";
import NextSteps from "../../screens/App/Medications/NextSteps";
import UploadFile from "../../screens/App/Medications/UploadFile";
import Reminders from "../../screens/App/Reminders/Reminders";
import MedicationReminder from "../../screens/App/Reminders/MedicationReminder";
import ActiveReminderStatus from "../../screens/App/Reminders/ActiveReminderStatus";
import AppointmentReminder from "../../screens/App/Reminders/AppointmentReminder";
import CustomReminder from "../../screens/App/Reminders/CustomReminder";
import Messages from "../../screens/App/Messages/Messages";
import Notifications from "../../screens/App/Notifications/Notifications";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.BOTTOM_NAVIGATION} component={BottomNavigation} />
      <Stack.Screen name={navigationStrings.APPOINTMENTS} component={Appointments} />
      <Stack.Screen name={navigationStrings.APPOINTMENT_DETAIL} component={AppointmentDetail} />
      <Stack.Screen name={navigationStrings.APPOINTMENT_CONFIRM} component={AppointmentConfirm} />
      <Stack.Screen
        name={navigationStrings.APPOINTMENT_SCHEDULED}
        component={AppointmentScheduled}
      />
      <Stack.Screen name={navigationStrings.WELLNESS_MEDSPA} component={WellnessMedSpa} />
      <Stack.Screen name={navigationStrings.TREATMENT_MENU} component={TreatmentMenu} />
      <Stack.Screen name={navigationStrings.BOOK_APPOINTMENT} component={BookAppointment} />
      <Stack.Screen name={navigationStrings.BOOK_APPOINTED} component={WellnessSuccess} />
      <Stack.Screen name={navigationStrings.MEMBERSHIP} component={Membership} />
      <Stack.Screen
        name={navigationStrings.COMPLETE_SUBSCRIPTION}
        component={CompleteSubscription}
      />
      <Stack.Screen name={navigationStrings.SUBSCRIPTION_COMPLETED} component={WellnessSuccess} />
      <Stack.Screen name={navigationStrings.BEFORE_AFTER_GALLERY} component={BeforeAfterGallery} />
      <Stack.Screen name={navigationStrings.TREATMENT_RESULT} component={TreatmentResult} />
      <Stack.Screen name={navigationStrings.SCHEDULE_STEP_1} component={ScheduleStep1} />
      <Stack.Screen name={navigationStrings.SCHEDULE_STEP_2} component={ScheduleStep2} />
      <Stack.Screen name={navigationStrings.SCHEDULE_STEP_3} component={ScheduleStep3} />
      <Stack.Screen name={navigationStrings.LABS} component={Labs} />
      <Stack.Screen name={navigationStrings.IMAGING} component={Imaging} />
      <Stack.Screen name={navigationStrings.IMAGING_REQUEST} component={ImagingRequest} />
      <Stack.Screen name={navigationStrings.IMAGING_RESULTS} component={ImagingResults} />
      <Stack.Screen
        name={navigationStrings.IMAGING_RESULTS_DETAILS}
        component={ImagingResultsDetails}
      />
      <Stack.Screen name={navigationStrings.VIEW_REPORT} component={ViewReport} />
      <Stack.Screen name={navigationStrings.VIEW_PDF} component={ViewDocument} />
      <Stack.Screen name={navigationStrings.BILLING} component={Billing} />
      <Stack.Screen name={navigationStrings.INSURANCE_ELIGIBILITY} component={InsuranceEligibility} />
      <Stack.Screen name={navigationStrings.ADD_NEW_INSURANCE} component={AddNewInsurance} />
      <Stack.Screen
        name={navigationStrings.INSURANCE_VERIFIED_DETAIL}
        component={InsuranceVerifiedDetail}
      />
      <Stack.Screen
        name={navigationStrings.INSURANCE_NEED_UPDATE_DETAIL}
        component={InsuranceNeedUpdateDetail}
      />
      <Stack.Screen name={navigationStrings.STATEMENT_DETAIL} component={StatementDetail} />
      <Stack.Screen name={navigationStrings.PAYMENT_SUCCESSFUL} component={PaymentSuccessful} />
      <Stack.Screen name={navigationStrings.MY_RECORDS} component={MyRecords} />
      <Stack.Screen name={navigationStrings.IMMUNIZATION_RECORD} component={ImmunizationRecord} />
      <Stack.Screen name={navigationStrings.FORMS_LIBRARY} component={FormsLibrary} />
      <Stack.Screen name={navigationStrings.PRACTICE_DOCUMENTS} component={PracticeDocuments} />
      <Stack.Screen name={navigationStrings.UPLOAD_CENTER} component={UploadCenter} />
      <Stack.Screen name={navigationStrings.REQUEST_RECORDS} component={RequestRecords} />
      <Stack.Screen name={navigationStrings.PROBLEM_LIST} component={ProblemList} />
      <Stack.Screen name={navigationStrings.PROBLEM_DETAIL} component={ProblemDetail} />
      <Stack.Screen name={navigationStrings.ALLERGIES} component={Allergies} />
      <Stack.Screen name={navigationStrings.ALLERGY_DETAIL} component={AllergyDetail} />
      <Stack.Screen name={navigationStrings.REFERRALS} component={Referrals} />
      <Stack.Screen name={navigationStrings.REFERRAL_STATUS} component={ReferralStatus} />
      <Stack.Screen name={navigationStrings.REFERRAL_DETAIL} component={ReferralDetail} />
      <Stack.Screen name={navigationStrings.REQUEST_NEW_REFERRAL} component={RequestNewReferral} />
      <Stack.Screen name={navigationStrings.CONSULT_REPORTS_INBOX} component={ConsultReportsInbox} />
      <Stack.Screen name={navigationStrings.CONSULT_REPORT_DETAIL} component={ConsultReportDetail} />
      <Stack.Screen name={navigationStrings.SHARE_CONSULT_REPORT} component={ShareConsultReport} />
      <Stack.Screen name={navigationStrings.LAB_REQUEST} component={LabRequest} />
      <Stack.Screen name={navigationStrings.LAB_RESULTS} component={LabResults} />
      <Stack.Screen name={navigationStrings.LAB_RESULT_DETAIL} component={LabResultDetail} />
      <Stack.Screen name={navigationStrings.MY_PROFILE} component={MyProfile} />
      <Stack.Screen name={navigationStrings.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={navigationStrings.COMMUNICATION} component={Communication} />
      <Stack.Screen name={navigationStrings.PRIVACY_SECURITY} component={PrivacySecurity} />
      <Stack.Screen name={navigationStrings.DEVICE_SESSIONS} component={DeviceSessions} />
      <Stack.Screen name={navigationStrings.HELP_TRAINING} component={HelpTraining} />
      <Stack.Screen name={navigationStrings.SUPPORT_TICKET} component={SupportTicket} />
      <Stack.Screen name={navigationStrings.TICKET_SUBMISSION} component={TicketSubmission} />
      <Stack.Screen name={navigationStrings.EMERGENCY_SAFETY} component={EmergencySafety} />
      <Stack.Screen name={navigationStrings.HEALTH_JOURNAL} component={HealthJournal} />
      <Stack.Screen name={navigationStrings.HEALTH_JOURNAL_ENTRY} component={HealthJournalEntry} />
      <Stack.Screen
        name={navigationStrings.HEALTH_JOURNAL_READING_SAVED}
        component={HealthJournalReadingSaved}
      />
      <Stack.Screen
        name={navigationStrings.HEALTH_JOURNAL_WEEKLY_SUMMARY}
        component={WeeklySummary}
      />
      <Stack.Screen name={navigationStrings.HEALTH_JOURNAL_TRENDS} component={HealthJournalTrends} />
      <Stack.Screen name={navigationStrings.MEDICATIONS} component={Medications} />
      <Stack.Screen name={navigationStrings.MEDICATION_DETAIL} component={MedicationDetail} />
      <Stack.Screen name={navigationStrings.PRIOR_AUTHORIZATION} component={PriorAuthorization} />
      <Stack.Screen
        name={navigationStrings.PRIOR_AUTH_QUESTIONNAIRE}
        component={CompleteQuestionnaire}
      />
      <Stack.Screen name={navigationStrings.REQUEST_REFILL} component={RequestRefill} />
      <Stack.Screen name={navigationStrings.REFILL_STATUS} component={RefillStatus} />
      <Stack.Screen name={navigationStrings.REFILL_NEXT_STEPS} component={NextSteps} />
      <Stack.Screen name={navigationStrings.MEDICATION_UPLOAD_FILE} component={UploadFile} />
      <Stack.Screen name={navigationStrings.REMINDERS} component={Reminders} />
      <Stack.Screen name={navigationStrings.MEDICATION_REMINDER} component={MedicationReminder} />
      <Stack.Screen name={navigationStrings.ACTIVE_REMINDER_STATUS} component={ActiveReminderStatus} />
      <Stack.Screen name={navigationStrings.APPOINTMENT_REMINDER} component={AppointmentReminder} />
      <Stack.Screen name={navigationStrings.CUSTOM_REMINDER} component={CustomReminder} />
      <Stack.Screen name={navigationStrings.MESSAGES} component={Messages} />
      <Stack.Screen name={navigationStrings.NOTIFICATIONS} component={Notifications} />
    </Stack.Navigator>
  );
};

export default AppStack;
