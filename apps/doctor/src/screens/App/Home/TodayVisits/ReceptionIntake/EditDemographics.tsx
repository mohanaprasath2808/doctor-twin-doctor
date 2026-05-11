import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InputField from "../../../../../neomorphism/InputField";
import DatePickerField from "../../../../../neomorphism/DatePickerField";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import ProfileIcon from "../../../../../assets/icon/profile.svg";
import CalendarIcon from "../../../../../assets/icon/calendarIcon.svg";
import DownArrowIcon from "../../../../../assets/icon/downArrow.svg";
import MailIcon from "../../../../../assets/icon/mailIcon.svg";
import LabLocationIcon from "../../../../../assets/icon/locationPin.svg";
import CallIcon from "../../../../../assets/icon/callIconGrey.svg";

const EditDemographics = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("Sarah Johnson");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date(1969, 11, 5));
  const [phoneNumber, setPhoneNumber] = useState("(555) 987-6543");
  const [emailAddress, setEmailAddress] = useState("sarah@example.com");
  const [address, setAddress] = useState("123 Main St, Anytown, CA");
  const [emergencyContact, setEmergencyContact] = useState("(555) 987-6543");

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
          <Text style={styles.headerTitle}>Edit Demographics</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.label}>Name</Text>
        <InputField
          value={name}
          onChangeText={setName}
          leftIcon={<ProfileIcon width={18} height={18} />}
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <DatePickerField
          value={dateOfBirth}
          onChange={setDateOfBirth}
          maximumDate={new Date()}
          placeholder="Select date of birth"
          leftIcon={<CalendarIcon width={18} height={18} />}
          rightIcon={<DownArrowIcon width={10} height={10} />}
          containerStyle={styles.input}
          style={styles.inputText}
        />

        <Text style={styles.label}>Phone number</Text>
        <InputField
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          leftIcon={<CallIcon width={18} height={18} />}
          keyboardType="phone-pad"
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        <Text style={styles.label}>Email address</Text>
        <InputField
          value={emailAddress}
          onChangeText={setEmailAddress}
          leftIcon={<MailIcon width={18} height={18} />}
          keyboardType="email-address"
          autoCapitalize="none"
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        <Text style={styles.label}>Address</Text>
        <InputField
          value={address}
          onChangeText={setAddress}
          leftIcon={<LabLocationIcon width={18} height={18} />}
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        <Text style={styles.label}>Emergency Contact</Text>
        <InputField
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          leftIcon={<CallIcon width={18} height={18} />}
          keyboardType="phone-pad"
          borderRadius={64}
          minHeight={46}
          containerStyle={styles.input}
        />

        <ReusableButton
          title="Save & Confirm"
          height={50}
          borderRadius={25}
          containerStyle={styles.saveButton}
          textStyle={styles.saveButtonText}
          onPress={() =>
            navigation.goBack()
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditDemographics;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
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
  inputText: {
    color: COLORS.TEXT_DARK,
  },
  saveButton: {
    marginTop: "auto",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
