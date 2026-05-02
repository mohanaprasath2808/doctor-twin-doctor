import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicSwitch from "../../components/Common/NeumorphicSwitch";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import MessageIcon from "../../assets/icons/message.svg";
import MailIcon from "../../assets/icons/mailBox.svg";
import BellIcon from "../../assets/icons/bell.svg";
import AppointmentsRemindersIcon from "../../assets/icons/appointmentsReminders.svg";
import LabResultsIcon from "../../assets/icons/labResults.svg";
import BillingIcon from "../../assets/icons/billing.svg";

const Communication = () => {
  const navigation = useNavigation<any>();
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [labAlerts, setLabAlerts] = useState(false);
  const [billingUpdates, setBillingUpdates] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Communication</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
            <Text style={styles.sectionTitle}>Notification Types</Text>
            <SwitchRow
              icon={<MessageIcon width={18} height={18} />}
              label="SMS Notifications"
              value={smsNotifications}
              onToggle={setSmsNotifications}
            />
            <Divider />
            <SwitchRow
              icon={<MailIcon width={18} height={18} />}
              label="Email Notifications"
              value={emailNotifications}
              onToggle={setEmailNotifications}
            />
            <Divider />
            <SwitchRow
              icon={<BellIcon width={18} height={18} />}
              label="App Notifications"
              value={appNotifications}
              onToggle={setAppNotifications}
            />
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.prefOuter} innerStyle={styles.cardInner} borderRadius={10}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <SwitchRow
              icon={<BellIcon width={18} height={18} />}
              label="Appointment Reminders"
              value={appointmentReminders}
              onToggle={setAppointmentReminders}
            />
            <Divider />
            <SwitchRow
              icon={<LabResultsIcon width={18} height={18} />}
              label="Lab Results Alerts"
              value={labAlerts}
              onToggle={setLabAlerts}
            />
            <Divider />
            <SwitchRow
              icon={<BillingIcon width={18} height={18} />}
              label="Billing Updates"
              value={billingUpdates}
              onToggle={setBillingUpdates}
            />
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton title="Save Changes" width="100%" height={48} borderRadius={24} onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SwitchRow = ({
  icon,
  label,
  value,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}) => (
  <View style={styles.row}>
    <InnerShadowIcon icon={icon} size={40} radius={20} />
    <Text style={styles.rowLabel}>{label}</Text>
    <NeumorphicSwitch value={value} onValueChange={onToggle} />
  </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 18 },
  cardOuter: { width: "100%", marginTop: 30 },
  prefOuter: { width: "100%", marginTop: 20 },
  cardInner: { paddingVertical: 12, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_PRIMARY, marginBottom: 20 },
  row: { flexDirection: "row", alignItems: "center", minHeight: 58 },
  rowLabel: { marginLeft: 12, flex: 1, fontSize: 14, fontWeight: "500", color: COLORS.TEXT_PRIMARY },
  divider: { height: 1, backgroundColor: COLORS.TEXT_PRIMARY_10, marginVertical: 4 },
  footer: { paddingHorizontal: 16, paddingBottom: Platform.OS === "ios" ? 20 : 16, paddingTop: 8 },
});

export default Communication;
