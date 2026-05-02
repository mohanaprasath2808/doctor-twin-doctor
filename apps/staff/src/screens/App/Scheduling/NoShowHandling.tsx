import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicSwitch from "../../../components/Common/NeumorphicSwitch";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { getInitials } from "../../../constants/constant";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const PATIENT_NAME = "Helen Foster";

const NoShowHandling = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [fee] = useState("$30");
  const [applyFee, setApplyFee] = useState(true);

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>No Show Handling</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
          <View style={styles.patientRow}>
            <InnerShadowIcon
              size={40}
              icon={<Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>}
            />
            <View style={styles.patientText}>
              <Text style={styles.patientName}>{PATIENT_NAME}</Text>
              <Text style={styles.meta}>Female • Age 45</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
          <Text style={styles.sectionTitle}>No-show fee</Text>
          <InputField
            value={fee}
            editable={false}
            isFocused
            containerStyle={styles.feeInput}
          />

          <View style={styles.divider} />

          <View style={styles.applyRow}>
            <View style={styles.applyLeft}>
              <InnerShadowIcon
                size={34}
                icon={<MaterialCommunityIcons name="clipboard-text-clock-outline" size={18} color={COLORS.PRIMARY} />}
              />
              <Text style={styles.applyText}>Apply Fee</Text>
            </View>
            <NeumorphicSwitch value={applyFee} onValueChange={setApplyFee} />
          </View>
        </NeumorphicCard>
      </View>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <View style={styles.footerHalf}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={50}
            borderRadius={25}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            text="Notify Billing"
            textStyle={styles.notifyBillingText}
            onPress={() => {}}
          />
        </View>
        <View style={styles.footerHalf}>
          <ReusableButton
            title="Notify Patient"
            height={50}
            borderRadius={25}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            onPress={() => navigation.navigate(navigationStrings.SCHEDULING_NOTIFY_PATIENT)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoShowHandling;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 32 / 2,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { marginBottom: 16 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 12 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  initials: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  patientText: { flex: 1, minWidth: 0 },
  patientName: { fontSize: 30 / 2, fontWeight: "500", color: COLORS.TEXT_DARK },
  meta: { marginTop: 2, fontSize: 24 / 2, fontWeight: "400", color: COLORS.TEXT_70 },
  sectionTitle: { fontSize: 18 / 1.1, fontWeight: "500", color: COLORS.TEXT_DARK },
  feeInput: { marginTop: 10, marginBottom: 6 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20, marginVertical: 8 },
  applyRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  applyLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  applyText: { fontSize: 30 / 2, fontWeight: "500", color: COLORS.TEXT_DARK },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    gap: 12,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerHalf: { flex: 1, minWidth: 0 },
  notifyBillingText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "600" },
});
