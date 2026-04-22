import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import CalendarIcon from "../../../assets/icon/calendarIcon.svg";
import DownArrowIcon from "../../../assets/icon/downArrow.svg";
import HideIcon from "../../../assets/icon/hideIcon.svg";
import MailIcon from "../../../assets/icon/mailIcon.svg";
import PasswordIcon from "../../../assets/icon/passwordIcon.svg";
import PhoneIcon from "../../../assets/icon/phoneIcon.svg";
import ProfileIcon from "../../../assets/icon/profileIcon.svg";
import UnhideIcon from "../../../assets/icon/unHide.svg";
import AlertIcon from "../../../assets/icon/redWarningIcon.svg";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicSwitch from "../../../components/Common/NeumorphicSwitch";
import StaffRoleBottomSheetModal, {
  ROLE_OPTIONS,
} from "../../../components/BottomSheets/StaffRoleBottomSheetModal";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import DatePickerField from "../../../components/neomorphism/DatePickerField";
import KeyboardAvoidingWrapper from "../../../components/neomorphism/KeyboardAvoidingWrapper";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import Loader from "../../../components/neomorphism/Loader";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { parseDateOfBirth } from "../../../constants/constant";
import navigationStrings from "../../../constants/navigationStrings";
import type { AppStackParamList } from "../../../router/App/types";
import { COLORS } from "../../../constants/theme";
import type { StaffRole } from "./staffTypes";

type Nav = NativeStackNavigationProp<AppStackParamList, typeof navigationStrings.STAFF_FORM>;
type R = RouteProp<AppStackParamList, typeof navigationStrings.STAFF_FORM>;

const EDIT_FOOTER_ACTION_HEIGHT = 52;

const CreateEditStaff = () => {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<R>();
  const isEdit = params?.isEdit === true;
  const initial = params?.initial;

  const roleSheetRef = useRef<BottomSheetModal>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [password, setPassword] = useState(isEdit ? "********" : "");
  const [secure, setSecure] = useState(true);
  const [dob, setDob] = useState<Date | null>(() => {
    if (!initial?.dob) return null;
    return parseDateOfBirth(initial.dob) ?? null;
  });
  const [role, setRole] = useState<StaffRole | null>(initial?.role ?? null);
  const [deactivated, setDeactivated] = useState(false);

  const roleDisplay = useMemo(
    () => (role ? (ROLE_OPTIONS.find((o) => o.role === role)?.label ?? "") : ""),
    [role],
  );

  const openRoleSheet = () => roleSheetRef.current?.present();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>{isEdit ? "Edit Staff" : "Create New Staff"}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingWrapper
          keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
          contentContainerStyle={styles.scrollContent}
        >
          {isEdit ? (
            <NeumorphicCard
              outerStyle={styles.deactivateCardOuter}
              innerStyle={styles.deactivateCardInner}
              borderRadius={12}
            >
              <View style={styles.deactivateRow}>
                <NeumorphicInnerShadowCard
                  fullWidth={false}
                  height={40}
                  borderRadius={21}
                  backgroundColor="#FDECEC"
                  darkShadowDx={4}
                  darkShadowDy={4}
                  darkShadowBlur={14}
                  darkShadowColor="#F2CACA"
                  lightShadowDx={-4}
                  lightShadowDy={-4}
                  lightShadowBlur={9}
                  lightShadowColor="rgba(255, 255, 255, 0.6)"
                  containerStyle={styles.warnIconNeomorph}
                  contentStyle={styles.warnIconNeomorphContent}
                >
                  <AlertIcon width={18} height={18} />
                </NeumorphicInnerShadowCard>
                <Text style={styles.deactivateLabel}>Deactivate staff</Text>
                <NeumorphicSwitch value={deactivated} onValueChange={setDeactivated} />
              </View>
            </NeumorphicCard>
          ) : null}

          <Text style={[styles.label, !isEdit && styles.labelFirst]}>Name</Text>
          <InputField
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            leftIcon={<ProfileIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />

          <Text style={styles.label}>Phone number</Text>
          <InputField
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            leftIcon={<PhoneIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />

          <Text style={styles.label}>Email address</Text>
          <InputField
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<MailIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />

          <Text style={styles.label}>Password</Text>
          <InputField
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            leftIcon={<PasswordIcon width={18} height={18} />}
            rightIcon={
              secure ? <HideIcon width={18} height={18} /> : <UnhideIcon width={18} height={18} />
            }
            onRightIconPress={() => setSecure((s) => !s)}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <DatePickerField
            placeholder="Select date"
            value={dob}
            onChange={setDob}
            leftIcon={<CalendarIcon width={18} height={18} />}
            rightIcon={<DownArrowIcon width={10} height={10} />}
            containerStyle={styles.inputTight}
            style={!dob ? styles.placeholderText : undefined}
          />

          <Text style={styles.label}>Role</Text>
          <Pressable onPress={openRoleSheet}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select role"
                value={roleDisplay}
                editable={false}
                leftIcon={<ProfileIcon width={18} height={18} />}
                rightIcon={<DownArrowIcon width={10} height={10} />}
                containerStyle={styles.inputTight}
                style={!role ? styles.placeholderText : undefined}
              />
            </View>
          </Pressable>
        </KeyboardAvoidingWrapper>

        <View style={styles.footer}>
          {isEdit ? (
            <View style={styles.editFooterRow}>
              <AppButton
                text="Delete Staff"
                borderWidth={1}
                borderColor="#E53E3E"
                bgColor="#FFF5F5"
                textStyle={styles.deleteText}
                height={EDIT_FOOTER_ACTION_HEIGHT}
                borderRadius={EDIT_FOOTER_ACTION_HEIGHT / 2}
                style={styles.footerHalfBtn}
                onPress={() => {}}
              />
              <ReusableButton
                title="Save"
                onPress={() => {}}
                height={EDIT_FOOTER_ACTION_HEIGHT}
                borderRadius={EDIT_FOOTER_ACTION_HEIGHT / 2}
                containerStyle={styles.footerHalfBtn}
                gradientColors={["#A7F3D0", "#166534"]}
                backgroundColor={COLORS.PRIMARY}
              />
            </View>
          ) : (
            <ReusableButton
              title="Save"
              onPress={() => {}}
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
            />
          )}
        </View>
      </View>

      <StaffRoleBottomSheetModal
        ref={roleSheetRef}
        selectedRole={role}
        onSelectDone={(r) => {
          setRole(r);
        }}
      />
    </SafeAreaView>
  );
};

export default CreateEditStaff;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  screen: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  deactivateCardOuter: { width: "100%", marginBottom: 8 },
  deactivateCardInner: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  deactivateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  warnIconNeomorph: {
    width: 42,
    height: 42,
  },
  warnIconNeomorphContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  deactivateLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  label: {
    marginTop: 14,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  labelFirst: {
    marginTop: 4,
  },
  inputTight: {
    marginTop: 0,
  },
  placeholderText: {
    color: COLORS.TEXT_40,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  editFooterRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  footerHalfBtn: {
    flex: 1,
    minWidth: 0,
  },
  deleteText: {
    color: "#E53E3E",
    fontSize: 16,
    fontWeight: "600",
  },
});
