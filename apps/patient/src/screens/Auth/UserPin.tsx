import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import LeftArrow from "../../assets/icons/leftArrow.svg";
import { AuthContext } from "../../context/AuthContext";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";

const UserPinScreen = () => {
  const navigation = useNavigation<any>();
  const [pin, setPin] = useState("");
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("UserPin requires AuthContextProvider");
  }
  const { setIsLogin } = auth;

  const handleContinue = () => {
    navigation.navigate(navigationStrings.VERIFY_IDENTITY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <ScrollView
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

          <Text style={styles.title}>Set your User PIN</Text>
          <Text style={styles.subTitle}>Enter the 4-digit code to set your PIN</Text>

          <View style={styles.pinContainer}>
            <OtpTextInput otp={pin} setOtp={setPin} />
          </View>

          <ReusableButton
            title="Continue"
            onPress={handleContinue}
            containerStyle={styles.ctaBtn}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerMuted}>Do you remember PIN? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                /** Wire to Forgot PIN flow when that screen exists in AuthStack. */
              }}
            >
              <Text style={styles.footerLink}>Forgot PIN</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserPinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: Platform.OS === "ios" ? 4 : 12,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  pinContainer: {
    marginTop: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtn: {
    marginTop: 36,
    width: "100%",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 28,
    paddingHorizontal: 8,
  },
  footerMuted: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_60,
    fontWeight: "400",
  },
  footerLink: {
    fontSize: 14,
    color: COLORS.ACCENT_LIGHT,
    fontWeight: "600",
  },
});
