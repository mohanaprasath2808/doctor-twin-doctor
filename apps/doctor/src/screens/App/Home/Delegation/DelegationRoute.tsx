import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";
import ProfileIcon from "../../../../assets/icon/profile.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";
import AppButton from "../../../../components/Common/AppButton";

type RouteOptionId = "officeManager" | "ma" | "billing" | "schedule" | "otherProvider";

type RouteOption = {
  id: RouteOptionId;
  label: string;
  icon: React.ReactNode;
};

const ROUTE_OPTIONS: RouteOption[] = [
  { id: "officeManager", label: "Office Manager", icon: <ProfileIcon width={18} height={18} /> },
  { id: "ma", label: "MA", icon: <ProfileIcon width={18} height={18} /> },
  { id: "billing", label: "Billing", icon: <ProfileIcon width={18} height={18} /> },
  { id: "schedule", label: "Schedule", icon: <ScheduleIcon width={18} height={18} /> },
  { id: "otherProvider", label: "Other Provider", icon: <ProfileIcon width={18} height={18} /> },
];

const DelegationRoute = () => {
  const navigation = useNavigation<any>();
  const [selectedRoute, setSelectedRoute] = useState<RouteOptionId>("billing");
  const [patientMessage, setPatientMessage] = useState("I’ve been out of refills for 2 days now.");

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
          <Text style={styles.headerTitle}>Delegation</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={14}>
            <View style={styles.patientRow}>
              <Image source={DoctorTempImage} style={styles.avatar} />
              <View style={styles.patientTextWrap}>
                <Text style={styles.patientName}>Sarah Williams</Text>
                <Text style={styles.patientMeta}>Female • Age 45</Text>
              </View>
              <DeltaBadge
                icon={null}
                value="High"
                bgColor="#FFE6EA"
                darkShadowColor="#F59EAE"
                lightShadowColor="#FFFFFF"
                textColor="#E11D48"
                height={24}
              />
            </View>

            <InputField
              value={patientMessage}
              onChangeText={setPatientMessage}
              placeholder="Add message"
              containerStyle={styles.messageInput}
              multiline
              numberOfLines={2}
              borderRadius={64}
              minHeight={46}
            />
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.routeOuter} innerStyle={styles.routeInner} borderRadius={14}>
            <Text style={styles.routeTitle}>Route to:</Text>

            <FlatList
              data={ROUTE_OPTIONS}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.routeDivider} />}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedRoute;
                return (
                  <Pressable
                    style={styles.routeRow}
                    onPress={() => setSelectedRoute(item.id)}
                  >
                    {isSelected ? (
                      <SelectedIcon width={30} height={30} />
                    ) : (
                      <InnerShadowIcon
                        size={30}
                        icon={<View style={styles.emptyDot} />}
                      />
                    )}
                    <InnerShadowIcon size={40} icon={item.icon} />
                    <Text style={styles.routeLabel}>{item.label}</Text>
                  </Pressable>
                );
              }}
            />
          </NeumorphicCard>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <AppButton
              text="Back"
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.SURFACE}
              textStyle={styles.backBtnText}
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            />
            <ReusableButton
              title="Assign Task"
              containerStyle={styles.assignBtn}
              textStyle={styles.assignBtnText}
              onPress={() => { }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DelegationRoute;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  content: { flex: 1, paddingHorizontal: 16, paddingBottom: 24, paddingTop: 16, gap: 18 },

  patientOuter: { width: "100%" },
  patientInner: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 12 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, resizeMode: "cover" },
  patientTextWrap: { flex: 1 },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  patientMeta: { marginTop: 2, color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
  messageInput: { marginTop: 14 },

  routeOuter: { width: "100%" },
  routeInner: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 12 },
  routeTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500", marginBottom: 8 },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  routeDivider: { height: 1, backgroundColor: COLORS.TEXT_10 },
  routeLabel: { flex: 1, color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  emptyDot: { width: 1, height: 1 },

  footer: { paddingHorizontal: 16, paddingBottom: 20 },
  footerButtons: { flexDirection: "row", gap: 12 },
  backBtn: { flex: 1, height: 48, borderRadius: 24 },
  backBtnText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
  assignBtn: { flex: 1, height: 48, borderRadius: 24 },
  assignBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
});

