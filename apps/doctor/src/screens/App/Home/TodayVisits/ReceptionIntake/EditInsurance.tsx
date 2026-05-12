import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InputField from "../../../../../neomorphism/InputField";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../../components/Common/AppButton";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import InsuranceProviderBottomSheetModal from "../../../../../components/BottomSheets/InsuranceProviderBottomSheetModal";
import InsuranceStatusBottomSheetModal from "../../../../../components/BottomSheets/InsuranceStatusBottomSheetModal";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../../assets/icon/downArrow.svg";
import ProfileIcon from "../../../../../assets/icon/profile.svg";
import UploadIcon from "../../../../../assets/icon/uploadIcon.svg";

const EditInsurance = () => {
  const navigation = useNavigation<any>();
  const providerSheetRef = useRef<BSModal>(null);
  const statusSheetRef = useRef<BSModal>(null);
  const [provider, setProvider] = useState("Blue Cross");
  const [memberId, setMemberId] = useState("987654321");
  const [groupNumber, setGroupNumber] = useState("12345");
  const [status, setStatus] = useState("");

  const renderUploadCard = (label: string) => (
    <View style={styles.uploadSection}>
      <Text style={styles.label}>{label}</Text>
      <NeumorphicCard outerStyle={styles.uploadOuter} innerStyle={styles.uploadInner} borderRadius={10}>
        <UploadIcon width={22} height={22} />
        <Text style={styles.uploadText}>Upload document</Text>
        <AppButton
          text="Upload"
          width={74}
          height={30}
          borderRadius={15}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.uploadButtonText}
          shadowStyle={styles.uploadButtonShadow}
        />
      </NeumorphicCard>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Edit Insurance</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.label}>Insurance Provider</Text>
        <Pressable onPress={() => providerSheetRef.current?.present()}>
          <View pointerEvents="none">
            <InputField
              value={provider}
              placeholder="Select insurance provider"
              editable={false}
              leftIcon={<ProfileIcon width={18} height={18} />}
              rightIcon={<DownArrowIcon width={10} height={10} />}
              borderRadius={64}
              minHeight={46}
              containerStyle={styles.input}
              isFocused={provider ? true : false}
            />
          </View>
        </Pressable>

        <Text style={styles.label}>Member ID</Text>
        <InputField
          value={memberId}
          onChangeText={setMemberId}
          leftIcon={<ProfileIcon width={18} height={18} />}
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        <Text style={styles.label}>Group Number</Text>
        <InputField
          value={groupNumber}
          onChangeText={setGroupNumber}
          leftIcon={<ProfileIcon width={18} height={18} />}
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        {renderUploadCard("Insurance Card (Front)")}
        {renderUploadCard("Insurance Card (Back)")}

        <Text style={styles.label}>Status</Text>
        <Pressable onPress={() => statusSheetRef.current?.present()}>
          <View pointerEvents="none">
            <InputField
              value={status}
              placeholder="Select status"
              editable={false}
              rightIcon={<DownArrowIcon width={10} height={10} />}
              borderRadius={64}
              minHeight={46}
              containerStyle={styles.input}
              isFocused={status ? true : false}
            />
          </View>
        </Pressable>

        <ReusableButton
          title="Save & Verify"
          height={50}
          borderRadius={25}
          containerStyle={styles.saveButton}
          textStyle={styles.saveButtonText}
          onPress={() =>
            navigation.navigate(navigationStrings.RECEPTION_INTAKE_COMPLETED, {
              title: "Verified",
              buttonText: "Back to Intake",
              backRouteName: navigationStrings.RECEPTION_INTAKE,
            })
          }
        />
      </ScrollView>

      <InsuranceProviderBottomSheetModal
        ref={providerSheetRef}
        selectedValue={provider}
        onSelectDone={setProvider}
      />

      <InsuranceStatusBottomSheetModal
        ref={statusSheetRef}
        selectedValue={status}
        onSelectDone={setStatus}
      />
    </SafeAreaView>
  );
};

export default EditInsurance;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  label: {
    marginTop: 20,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  input: {
    marginTop: 6,
  },
  uploadSection: {
  },
  uploadOuter: {
    width: "100%",
    marginTop: 8,
  },
  uploadInner: {
    minHeight: 112,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  uploadText: {
    fontSize: 13,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  uploadButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  uploadButtonShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButton: {
    marginTop: 86,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
