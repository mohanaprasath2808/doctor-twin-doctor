import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useToast } from "react-native-toast-notifications";

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
import StaffRoleBottomSheetModal from "../../../components/BottomSheets/StaffRoleBottomSheetModal";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import DatePickerField from "../../../components/neomorphism/DatePickerField";
import KeyboardAvoidingWrapper from "../../../components/neomorphism/KeyboardAvoidingWrapper";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { formatDateToIso, parseDateOfBirthValue } from "../../../constants/constant";
import navigationStrings from "../../../constants/navigationStrings";
import type { AppStackParamList } from "../../../router/App/types";
import { COLORS } from "../../../constants/theme";
import {
  getRoleDisplayName,
  normalizeStaffRole,
  type StaffFormInitial,
  type StaffRole,
} from "./staffTypes";
import {
  validateStaffForm,
  type StaffFormFieldErrors,
} from "../../utills/validations";
import { AppContext } from "../../../context/AppContext";
import type { CreateStaffPayload, UpdateStaffPayload } from "../../../context/AppContext";
import StaffProfileUpload from "./StaffProfileUpload";

type Nav = NativeStackNavigationProp<AppStackParamList, typeof navigationStrings.STAFF_FORM>;
type R = RouteProp<AppStackParamList, typeof navigationStrings.STAFF_FORM>;

const EDIT_FOOTER_ACTION_HEIGHT = 52;

const readInitialForm = (initial?: StaffFormInitial) => ({
  firstName: initial?.first_name ?? "",
  lastName: initial?.last_name ?? "",
  phone: initial?.phone ?? "",
  email: initial?.email ?? "",
  dob: parseDateOfBirthValue(initial?.date_of_birth),
  role: normalizeStaffRole(initial?.role),
  deactivated: initial?.is_active === false,
});

const FieldError = ({ message }: { message?: string }) =>
  message ? <Text style={styles.errorText}>{message}</Text> : null;

const CreateEditStaff = () => {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<R>();
  const toast = useToast();
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("CreateEditStaff must be used within AppContextProvider");
  }
  const { createStaff, updateStaff, deleteStaff, submittingStaff } = appContext;

  const isEdit = params?.isEdit === true;
  const initial = params?.initial;
  const staffUserId = initial?.user_id ?? initial?.id;

  const roleSheetRef = useRef<BottomSheetModal>(null);
  const initialForm = useMemo(() => readInitialForm(initial), [initial]);

  const [firstName, setFirstName] = useState(initialForm.firstName);
  const [lastName, setLastName] = useState(initialForm.lastName);
  const [phone, setPhone] = useState(initialForm.phone);
  const [email, setEmail] = useState(initialForm.email);
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [dob, setDob] = useState<Date | null>(initialForm.dob);
  const [role, setRole] = useState<StaffRole | null>(initialForm.role);
  const [deactivated, setDeactivated] = useState(initialForm.deactivated);
  const [errors, setErrors] = useState<StaffFormFieldErrors>({});
  const [profileImageUri, setProfileImageUri] = useState<string | null>(
    () =>
      initial?.profile_image ??
      initial?.profile_image_url ??
      initial?.avatar_url ??
      null,
  );

  const roleDisplay = useMemo(() => getRoleDisplayName(role), [role]);

  const clearError = useCallback((field: keyof StaffFormFieldErrors) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const openRoleSheet = () => roleSheetRef.current?.present();

  const handleSave = useCallback(async () => {
    if (submittingStaff) {
      return;
    }

    const validationErrors = validateStaffForm(
      {
        firstName,
        lastName,
        phone,
        email,
        password,
        dob,
        role,
      },
      isEdit,
    );

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstMessage = Object.values(validationErrors)[0];
      toast.show(firstMessage ?? "Please fix the errors below", { type: "danger" });
      return;
    }

    if (!role || !dob) {
      return;
    }

    if (isEdit) {
      if (!staffUserId) {
        toast.show("Staff id is missing", { type: "danger" });
        return;
      }

      const updatePayload: UpdateStaffPayload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        role,
        date_of_birth: formatDateToIso(dob),
        is_active: !deactivated,
      };

      const result = await updateStaff(String(staffUserId), updatePayload);
      if (result.ok) {
        navigation.goBack();
      }
      return;
    }

    const createPayload: CreateStaffPayload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      role,
      date_of_birth: formatDateToIso(dob),
      password,
      is_active: !deactivated,
    };

    const result = await createStaff(createPayload);
    if (result.ok) {
      navigation.goBack();
    }
  }, [
    submittingStaff,
    firstName,
    lastName,
    phone,
    email,
    password,
    dob,
    role,
    deactivated,
    isEdit,
    staffUserId,
    createStaff,
    updateStaff,
    navigation,
    toast,
  ]);

  const handleDelete = useCallback(() => {
    if (!staffUserId) {
      toast.show("Staff id is missing", { type: "danger" });
      return;
    }

    Alert.alert(
      "Delete Staff",
      "Are you sure you want to delete this staff member?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (submittingStaff) {
              return;
            }
            const result = await deleteStaff(String(staffUserId));
            if (result.ok) {
              navigation.goBack();
            }
          },
        },
      ],
    );
  }, [staffUserId, submittingStaff, deleteStaff, navigation, toast]);

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
                <Text style={styles.deactivateLabel}>{!deactivated ? "Deactivate staff" : "Activate staff"}</Text>
                <NeumorphicSwitch
                  value={deactivated}
                  onValueChange={setDeactivated}
                  thumbOffColor={COLORS.ALERT}
                  thumbOnColor={COLORS.PRIMARY}
                />
              </View>
            </NeumorphicCard>
          ) : null}

          <StaffProfileUpload
            imageUri={profileImageUri}
            onImageUriChange={setProfileImageUri}
          />

          <Text style={[styles.label, !isEdit && styles.labelFirst]}>First Name</Text>
          <InputField
            placeholder="Enter first name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              clearError("firstName");
            }}
            leftIcon={<ProfileIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />
          <FieldError message={errors.firstName} />

          <Text style={styles.label}>Last Name</Text>
          <InputField
            placeholder="Enter last name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              clearError("lastName");
            }}
            leftIcon={<ProfileIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />
          <FieldError message={errors.lastName} />

          <Text style={styles.label}>Phone number</Text>
          <InputField
            placeholder="Enter phone number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              clearError("phone");
            }}
            keyboardType="phone-pad"
            leftIcon={<PhoneIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />
          <FieldError message={errors.phone} />

          <Text style={styles.label}>Email address</Text>
          <InputField
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              clearError("email");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<MailIcon width={18} height={18} />}
            containerStyle={styles.inputTight}
            height={46}
            borderRadius={64}
          />
          <FieldError message={errors.email} />

          {!isEdit ? (
            <>
              <Text style={styles.label}>Password</Text>
              <InputField
                placeholder="Enter password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError("password");
                }}
                secureTextEntry={secure}
                leftIcon={<PasswordIcon width={18} height={18} />}
                rightIcon={
                  secure ? (
                    <HideIcon width={18} height={18} />
                  ) : (
                    <UnhideIcon width={18} height={18} />
                  )
                }
                onRightIconPress={() => setSecure((s) => !s)}
                containerStyle={styles.inputTight}
                height={46}
                borderRadius={64}
              />
              <FieldError message={errors.password} />
            </>
          ) : null}

          <Text style={styles.label}>Date of Birth</Text>
          <DatePickerField
            placeholder="Select date"
            value={dob}
            onChange={(date) => {
              setDob(date);
              clearError("dob");
            }}
            maximumDate={new Date()}
            leftIcon={<CalendarIcon width={18} height={18} />}
            rightIcon={<DownArrowIcon width={10} height={10} />}
            containerStyle={styles.inputTight}
            style={!dob ? styles.placeholderText : undefined}
          />
          <FieldError message={errors.dob} />

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
          <FieldError message={errors.role} />
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
                onPress={handleDelete}
              />
              <ReusableButton
                title="Save"
                onPress={handleSave}
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
              onPress={handleSave}
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
            />
          )}
        </View>

        {submittingStaff ? (
          <View style={styles.loadingOverlay} pointerEvents="auto">
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          </View>
        ) : null}
      </View>

      <StaffRoleBottomSheetModal
        ref={roleSheetRef}
        selectedRole={role}
        onSelectDone={(selected) => {
          setRole(selected);
          clearError("role");
        }}
      />
    </SafeAreaView>
  );
};

export default CreateEditStaff;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  screen: { flex: 1, position: "relative" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  deactivateCardOuter: { width: "100%", marginBottom: 8, marginTop: 20 },
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
    marginTop: 15,
  },
  inputTight: {
    marginTop: 0,
  },
  placeholderText: {
    color: COLORS.TEXT_40,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.ALERT,
    fontWeight: "400",
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
