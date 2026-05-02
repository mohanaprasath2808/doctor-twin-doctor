import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import IconComponent from "../../neomorphism/IconComponent";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../assets/icons/notificationIcon.svg";
import FirstNameIcon from "../../assets/icons/firstName.svg";
import PhoneIcon from "../../assets/icons/greyPhoneIcon.svg";
import MailIcon from "../../assets/icons/mailIcon.svg";
import LabLocationPin from "../../assets/icons/greyLocationIcon.svg";

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("Sarah Johnson");
  const [phone, setPhone] = useState("(555) 987-6543");
  const [email, setEmail] = useState("sarah@example.com");
  const [address, setAddress] = useState("123 Main St, Anytown, CA");
  const [emergency, setEmergency] = useState("(555) 987-6543");

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
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Field label="Name">
            <InputField
              value={name}
              onChangeText={setName}
              leftIcon={<FirstNameIcon width={18} height={18} />}
              containerStyle={styles.inputField}
              style={styles.inputFieldText}
            />
          </Field>

          <Field label="Phone number">
            <InputField
              value={phone}
              onChangeText={setPhone}
              leftIcon={<PhoneIcon width={18} height={18} />}
              keyboardType="phone-pad"
              containerStyle={styles.inputField}
              style={styles.inputFieldText}
            />
          </Field>

          <Field label="Email address">
            <InputField
              value={email}
              onChangeText={setEmail}
              leftIcon={<MailIcon width={18} height={18} />}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.inputField}
              style={styles.inputFieldText}
            />
          </Field>

          <Field label="Address">
            <InputField
              value={address}
              onChangeText={setAddress}
              leftIcon={<LabLocationPin width={18} height={18} />}
              containerStyle={styles.inputField}
              style={styles.inputFieldText}
            />
          </Field>

          <Field label="Emergency Contact">
            <InputField
              value={emergency}
              onChangeText={setEmergency}
              leftIcon={<PhoneIcon width={18} height={18} />}
              keyboardType="phone-pad"
              containerStyle={styles.inputField}
              style={styles.inputFieldText}
            />
          </Field>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton title="Update" height={48} borderRadius={24} width="100%" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  avatarWrapper: {
    width: 150,
    height: 150,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 75,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    resizeMode: "cover",
  },
  fieldWrap: {
    marginTop: 14,
  },
  label: {
    marginLeft: 2,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  inputField: {
    marginTop: 0,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
  },
  inputFieldText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
});

export default EditProfile;
