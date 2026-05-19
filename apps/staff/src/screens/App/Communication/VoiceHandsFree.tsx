import React, { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const VOICE_COMMANDS = [
  { id: "1", text: "Call Mrs. Lee" },
  { id: "2", text: "Check lab results for Ganesh" },
  { id: "3", text: "Dictate follow-up note" },
] as const;

type VoiceCommand = (typeof VOICE_COMMANDS)[number];

const VoiceHandsFree = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + 12;
  const [isListening, setIsListening] = useState(false);

  const handleStart = useCallback(() => {
    setIsListening(true);
  }, []);

  const handleStop = useCallback(() => {
    setIsListening(false);
  }, []);

  const listHeader = (
    <>
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Voice Hands Free Mode</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.avatarContainer}
        wrapperStyle={styles.avatarWrap}
        overlayStyle={styles.avatarOverlay}
        imageStyle={styles.avatarImage}
      />

      <Text style={styles.heading}>How can I assist?</Text>
      <Text style={styles.subheading}>
        Feel free to use voice commands to handle your tasks hands-free
      </Text>
    </>
  );

  const renderCommand = useCallback(
    ({ item }: { item: VoiceCommand }) => (
      <View style={styles.commandRow}>
        <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
        <InsightMessageCard
          subTitle={item.text}
          bgColor={COLORS.WHITE}
          subTitleStyle={styles.commandText}
        />
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <FlatList
          data={[...VOICE_COMMANDS]}
          keyExtractor={(item) => item.id}
          renderItem={renderCommand}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          {isListening ? (
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor="#FF6B6B"
              bgColor="#FDECEC"
              text="Stop"
              textStyle={styles.stopBtnText}
              onPress={handleStop}
            />
          ) : (
            <ReusableButton
              title="Start"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={handleStart}
              textStyle={styles.startBtnText}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VoiceHandsFree;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 8,
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
  avatarContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  avatarWrap: {
    width: 200,
    height: 200,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatarImage: {
    width: 128,
    height: 128,
    resizeMode: "contain",
    borderRadius: 64,
  },
  heading: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  subheading: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: COLORS.TEXT_70,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Regular",
  },
  commandRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  commandText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
  },
  separator: {
    height: 12,
  },
  footer: {
    flexShrink: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
  stopBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E05B6E",
    fontFamily: "SF-Pro-Text-Semibold",
  },
});
