import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import Timeline from "../../../../components/Common/Timeline";
import BackIcon from "../../../../assets/icon/backArrow.svg";

type AuditItem = {
  id: string;
  title: string;
  time: string;
  isCompleted?: boolean;
};

const AUDIT_ITEMS: AuditItem[] = [
  { id: "created", title: "Twin created task", time: "06 : 40 PM", isCompleted: true },
  { id: "assigned", title: "Assigned to Maria", time: "06 : 50 PM" },
  { id: "verified", title: "Maria verified pharmacy", time: "07 : 10 PM" },
  { id: "prepared", title: "Maria prepared refill", time: "07 : 30 PM" },
  { id: "awaiting", title: "Awaiting doctor approval", time: "07 : 40 PM" },
  { id: "approved", title: "Dr Soliman approved", time: "07 : 50 PM" },
];

const AuditTrail = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Audit Trail</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.timelineOuter} innerStyle={styles.timelineInner} borderRadius={14}>
          <Timeline data={AUDIT_ITEMS} rowSpacing={42} />
        </NeumorphicCard>
      </View>
    </SafeAreaView>
  );
};

export default AuditTrail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingHorizontal: 16 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },

  timelineOuter: { marginTop: 30, width: "100%" },
  timelineInner: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 14 },
});

