import React, { useContext, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCheckboxMark from "../../components/Auth/NeumorphicCheckboxMark";
import SelectPharmacySheet, {
  type SelectListItem,
} from "../../components/BottomSheets/SelectPharmacySheet";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicSwitch from "../../components/Common/NeumorphicSwitch";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import BellIcon from "../../assets/icons/bell.svg";
import DropDown from "../../assets/icons/dropDown.svg";
import LeftArrow from "../../assets/icons/leftArrow.svg";
import { AuthContext } from "../../context/AuthContext";
import IconComponent from "../../neomorphism/IconComponent";
import { AUTH_LOCAL_STORAGE_KEYS } from "../../utils/authStorage";
import { setSecureItem } from "../../utils/secureStorge";

const DISPLAY_NAME = "Sarah";

/** Sample options — replace with API data when wired. */
const PHARMACY_ITEMS: SelectListItem[] = [
  { id: "torrance-1", label: "Torrance Imaging Center" },
  { id: "torrance-2", label: "Torrance Imaging Center" },
  { id: "torrance-3", label: "Torrance Imaging Center" },
  { id: "torrance-4", label: "Torrance Imaging Center" },
  { id: "torrance-5", label: "Torrance Imaging Center" },
  { id: "torrance-6", label: "Torrance Imaging Center" },
  { id: "torrance-7", label: "Torrance Imaging Center" },
  { id: "torrance-8", label: "Torrance Imaging Center" },
  { id: "torrance-9", label: "Torrance Imaging Center" },
  { id: "torrance-10", label: "Torrance Imaging Center" },
  { id: "torrance-11", label: "Torrance Imaging Center" },
];

type CommKey = "email" | "app" | "sms";

const SetPreferences = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const pharmacySheetRef = useRef<BSModal>(null);
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("SetPreferences requires AuthContextProvider");
  }
  const { setIsLogin } = auth;

  const [pharmacy, setPharmacy] = useState("");
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [communication, setCommunication] = useState<Record<CommKey, boolean>>({
    email: false,
    app: false,
    sms: false,
  });

  const toggleComm = (key: CommKey) => {
    setCommunication((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = async () => {
    await setSecureItem(AUTH_LOCAL_STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
    setIsLogin(true);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <View style={styles.column}>
          <ScrollView
            style={styles.scroll}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <IconComponent
                icon={<LeftArrow width={22} height={22} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerTitle}>Set Preferences</Text>
              <View style={styles.headerSpacer} />
            </View>
            <ProfileAvatar
              overlaySource={OverlayImage}
              imageSource={DoctorTempImage}
              containerStyle={styles.avatarContainer}
              wrapperStyle={styles.avatarWrapper}
              overlayStyle={styles.avatarOverlay}
              imageStyle={styles.avatarImage}
            />

            <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.pharmacyCardInner}>
              <Text style={styles.blockTitle}>Pharmacy</Text>

              <Text style={styles.innerLabel}>Pharmacy</Text>
              <Pressable
                onPress={() => pharmacySheetRef.current?.present()}
                style={({ pressed }) => [pressed && styles.pressablePressed]}
              >
                <InputField
                  value={pharmacy}
                  editable={false}
                  showSoftInputOnFocus={false}
                  placeholder="Select Pharmacy"
                  onChangeText={setPharmacy}
                  containerStyle={styles.pharmacyField}
                  style={styles.pharmacyInput}
                  height={46}
                  rightIcon={<DropDown width={10} height={10} />}
                />
              </Pressable>
            </NeumorphicCard>

            <NeumorphicCard
              outerStyle={[styles.cardOuter, styles.notifCard]}
              innerStyle={styles.notifInner}
            >
              <InnerShadowIcon
                icon={<BellIcon width={18} height={18} />}
                size={40}
                radius={20}
                style={styles.bellInset}
              />
              <Text style={styles.notifLabel}>Enable Notifications</Text>
              <NeumorphicSwitch value={notificationsOn} onValueChange={setNotificationsOn} />
            </NeumorphicCard>

            <NeumorphicCard
              outerStyle={[styles.cardOuter, { marginTop: 20 }]}
              innerStyle={styles.commCardInner}
            >
              <Text style={[styles.blockTitle, { marginHorizontal: 10 }]}>Communication</Text>

              <CommRow
                label="Email"
                selected={communication.email}
                onPress={() => toggleComm("email")}
                showDivider
              />
              <CommRow
                label="App Notification"
                selected={communication.app}
                onPress={() => toggleComm("app")}
                showDivider
              />
              <CommRow
                label="SMS"
                selected={communication.sms}
                onPress={() => toggleComm("sms")}
                showDivider={false}
              />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <ReusableButton
              title="Continue"
              onPress={handleContinue}
              containerStyle={styles.continueBtn}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <SelectPharmacySheet
        ref={pharmacySheetRef}
        items={PHARMACY_ITEMS}
        selectedId={selectedPharmacyId}
        title="Select Location"
        onConfirm={(id) => {
          setSelectedPharmacyId(id);
          const row = PHARMACY_ITEMS.find((i) => i.id === id);
          if (row) setPharmacy(row.label);
        }}
      />
    </SafeAreaView>
  );
};

type CommRowProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  showDivider: boolean;
};

const CommRow: React.FC<CommRowProps> = ({ label, selected, onPress, showDivider }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.commRow,
      showDivider && styles.commRowDivider,
      pressed && styles.pressablePressed,
    ]}
  >
    <NeumorphicCheckboxMark selected={selected} />
    <Text style={styles.commLabel}>{label}</Text>
  </Pressable>
);

export default SetPreferences;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  column: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 4 : 8,
    paddingBottom: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerSpacer: {
    width: 44,
    height: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 112,
    height: 112,
    resizeMode: "contain",
    borderRadius: 115,
  },
  greeting: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  blockTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  commSectionTitle: {
    marginTop: 20,
  },
  cardOuter: {
    width: "100%",
  },
  pharmacyCardInner: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pharmacyField: {
    marginTop: 0,
  },
  pharmacyInput: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_40,
  },
  innerLabel: {
    fontSize: 12,
    color: COLORS.TEXT_PRIMARY_60,
    marginBottom: 6,
  },
  notifCard: {
    marginTop: 20,
  },
  notifInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  bellInset: {
    marginRight: 12,
  },
  notifLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  commCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 0,
  },
  commRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  commRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.TEXT_PRIMARY_10,
  },
  commLabel: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  continueBtn: {
    width: "100%",
  },
  pressablePressed: {
    opacity: 0.92,
  },
});
