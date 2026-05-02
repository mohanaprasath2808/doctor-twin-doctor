import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../../constants/navigationStrings";
import Appointments from "../../screens/App/Appointments/Appointments";
import AppointmentDetail from "../../screens/App/Appointments/AppointmentDetail";
import AppointmentConfirm from "../../screens/App/Appointments/AppointmentConfirm";
import AppointmentScheduled from "../../screens/App/Appointments/AppointmentScheduled";
import ScheduleStep1 from "../../screens/App/Appointments/ScheduleStep1";
import ScheduleStep2 from "../../screens/App/Appointments/ScheduleStep2";
import Labs from "../../screens/App/Labs/Labs";
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

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationStrings.BOTTOM_NAVIGATION} component={BottomNavigation} />
      <Stack.Screen
        name={navigationStrings.APPOINTMENTS}
        component={Appointments}
      />
      <Stack.Screen
        name={navigationStrings.APPOINTMENT_DETAIL}
        component={AppointmentDetail}
      />
      <Stack.Screen
        name={navigationStrings.APPOINTMENT_CONFIRM}
        component={AppointmentConfirm}
      />
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
      <Stack.Screen
        name={navigationStrings.SUBSCRIPTION_COMPLETED}
        component={WellnessSuccess}
      />
      <Stack.Screen
        name={navigationStrings.BEFORE_AFTER_GALLERY}
        component={BeforeAfterGallery}
      />
      <Stack.Screen name={navigationStrings.TREATMENT_RESULT} component={TreatmentResult} />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_STEP_1}
        component={ScheduleStep1}
      />
      <Stack.Screen
        name={navigationStrings.SCHEDULE_STEP_2}
        component={ScheduleStep2}
      />
      <Stack.Screen name={navigationStrings.LABS} component={Labs} />
      <Stack.Screen name={navigationStrings.LAB_REQUEST} component={LabRequest} />
      <Stack.Screen name={navigationStrings.LAB_RESULTS} component={LabResults} />
      <Stack.Screen
        name={navigationStrings.LAB_RESULT_DETAIL}
        component={LabResultDetail}
      />
      <Stack.Screen name={navigationStrings.MY_PROFILE} component={MyProfile} />
      <Stack.Screen name={navigationStrings.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={navigationStrings.COMMUNICATION} component={Communication} />
      <Stack.Screen name={navigationStrings.PRIVACY_SECURITY} component={PrivacySecurity} />
      <Stack.Screen name={navigationStrings.DEVICE_SESSIONS} component={DeviceSessions} />
      <Stack.Screen name={navigationStrings.HELP_TRAINING} component={HelpTraining} />
      <Stack.Screen name={navigationStrings.SUPPORT_TICKET} component={SupportTicket} />
      <Stack.Screen name={navigationStrings.TICKET_SUBMISSION} component={TicketSubmission} />
      <Stack.Screen name={navigationStrings.EMERGENCY_SAFETY} component={EmergencySafety} />
    </Stack.Navigator>
  );
};

export default AppStack;
