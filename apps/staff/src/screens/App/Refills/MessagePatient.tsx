import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const MessagePatient = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("We’re scheduling you for a follow-up visit.\nExpect a call soon");
  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 152 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Message Patient</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.sectionInner}
          >
            <Text style={styles.sectionTitle}>Message</Text>
            <InputField
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
              multiline
              numberOfLines={12}
              minHeight={420}
              isFocused={false}
              borderRadius={10}
              containerStyle={styles.messageInput}
              style={styles.messageInputField}
            />
          </NeumorphicCard>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title="Send Message"
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          textStyle={styles.fillButtonText}
          onPress={() => { }}
        />
        <View style={styles.footerRow}>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={50}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Convert to call"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={50}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Save Template"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessagePatient;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
  container: { paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { width: "100%" },
  sectionInner: { paddingHorizontal: 10, paddingVertical: 12 },
  sectionTitle: { fontSize: 14, fontWeight: "500", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  messageInput: { marginTop: 14 },
  messageInputField: {
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    gap: 14,
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
  fillButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
