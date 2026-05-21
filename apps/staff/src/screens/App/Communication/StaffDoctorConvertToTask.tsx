import React, { useCallback, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const STATIC_NAME = "Seffesa";
const STATIC_ROLE = "MA";
const STATIC_SUBTEXT = "Patient passes";

const MESSAGE_MIN_HEIGHT = 120;

const StaffDoctorConvertToTask = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + 12;
  const [message, setMessage] = useState("");
  const noop = useCallback(() => {}, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Convert to Task</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.sectionInner}
          >
            <View style={styles.senderRow}>
              <Image source={DoctorTempImage} style={styles.avatar} />
              <View style={styles.senderTextWrap}>
                <Text style={styles.senderName}>
                  {STATIC_NAME} <Text style={styles.roleText}>({STATIC_ROLE})</Text>
                </Text>
                <Text style={styles.subText}>{STATIC_SUBTEXT}</Text>
              </View>
            </View>
          </NeumorphicCard>

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
              multiline
              numberOfLines={6}
              minHeight={MESSAGE_MIN_HEIGHT}
              borderRadius={10}
              containerStyle={styles.messageInputContainer}
              style={styles.messageInput}
              placeholder="Enter message"
            />
          </NeumorphicCard>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          <ReusableButton
            title="Create Task"
            height={52}
            borderRadius={26}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            onPress={noop}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StaffDoctorConvertToTask;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  sectionOuter: {
    width: "100%",
    marginBottom: 16,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 44,
    borderRadius: 20,
    resizeMode: "cover",
  },
  senderTextWrap: {
    flex: 1,
    marginLeft: 10,
    minWidth: 0,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Medium",
  },
  subText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 4,
  },
  messageInputContainer: {
    marginTop: 8,
  },
  messageInput: {
    textAlignVertical: "top",
  },
  footer: {
    flexShrink: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
});
