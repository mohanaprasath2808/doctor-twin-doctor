import React, { useContext, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import FlagIcon from "../../assets/icons/flagIcon.svg";
import DropDown from "../../assets/icons/dropDown.svg";
import BirthIcon from "../../assets/icons/birth.svg";
import LeftArrow from "../../assets/icons/leftArrow.svg";
import IconComponent from "../../neomorphism/IconComponent";
import { AuthContext } from "../../context/AuthContext";
import { formatDobFromApi } from "../../constants/constant";

const VerifyIdentity = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  //context
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("VerifyIdentity requires AuthContextProvider");
  }
  const { localUserData } = auth;

  const displayName = useMemo(() => {
    const name = (localUserData as any)?.name;
    return typeof name === "string" && name.trim() ? name.trim() : "there";
  }, [localUserData]);

  //local state
  const [dob, setDob] = useState(formatDobFromApi((localUserData as any)?.date_of_birth));
  const [phone, setPhone] = useState((localUserData as any)?.phone ?? "");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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
            <IconComponent
              icon={<LeftArrow width={22} height={22} />}
              width={40}
              height={40}
              radius={20}
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />

            <ProfileAvatar
              overlaySource={OverlayImage}
              imageSource={DoctorTempImage}
              containerStyle={styles.imageContainer}
              wrapperStyle={styles.avatarWrapper}
              overlayStyle={styles.overlayImage}
              imageStyle={styles.avatarImage}
            />

            <Text style={styles.title}>Verify Your Identity</Text>
            <Text style={styles.subtitle}>
              {`Hi ${displayName}, we're here to confirm your identity for security.`}
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Phone Number</Text>
              <InputField
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                autoCorrect={false}
                leftIcon={
                  <View style={styles.flagRow}>
                    <FlagIcon width={18} height={18} />
                    {/* <View style={styles.flagChevron}>
                      <DropDown width={12} height={12} />
                    </View> */}
                  </View>
                }
                containerStyle={styles.inputField}
                editable={false}
              />

              <Text style={[styles.label, styles.labelSecond]}>Birth of Date</Text>
              <InputField
                value={dob}
                onChangeText={setDob}
                placeholder="DD/MM/YYYY"
                leftIcon={<BirthIcon width={18} height={18} />}
                containerStyle={styles.inputField}
                editable={false}
              />
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <ReusableButton
              title="Next"
              onPress={() => navigation.navigate(navigationStrings.SET_PREFERENCES)}
              containerStyle={styles.cta}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyIdentity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: Platform.OS === "ios" ? 4 : 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: COLORS.BACKGROUND,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 115,
  },
  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.TEXT_PRIMARY_80,
    paddingHorizontal: 8,
    fontWeight: "400",
  },
  form: {
    marginTop: 28,
    width: "100%",
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_PRIMARY_60,
    marginBottom: 4,
  },
  labelSecond: {
    marginTop: 16,
  },
  inputField: {
    marginTop: 0,
  },
  flagRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagChevron: {
    marginLeft: 4,
  },
  cta: {
    width: "100%",
  },
});
