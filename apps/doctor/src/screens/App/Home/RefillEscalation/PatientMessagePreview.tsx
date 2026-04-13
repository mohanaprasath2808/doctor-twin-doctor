import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";

const PatientMessagePreview = () => {
  const navigation = useNavigation<any>();
  const [messageText, setMessageText] = useState(
    "Your refill request cannot be approved at this time because updated labs are required.\n\nPlease schedule an appointment or complete the requested labs.",
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Patient Message Preview</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={{ flex: 1, marginTop: 30 }}>
          <NeumorphicCard
            outerStyle={styles.previewOuter}
            innerStyle={styles.previewInner}
            borderRadius={12}
          >
            <Text style={styles.previewTitle}>Patient Message Preview</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.messageOuter}
              contentStyle={styles.messageInner}
              darkShadowColor={COLORS.DARK_SHADOW}
              lightShadowColor={COLORS.LIGHT_SHADOW}
            >
              <TextInput
                value={messageText}
                onChangeText={setMessageText}
                multiline
                style={styles.messageText}
                placeholder="Enter patient message"
                placeholderTextColor={COLORS.TEXT_40}
                textAlignVertical="top"
              />
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>
        </View>

        <View style={styles.footerActions}>
          <View style={styles.actionRow}>
            <AppButton
              text="Send to Staff Task"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
            />
            <ReusableButton
              title="Send to Patient"
              containerStyle={styles.actionBtn}
              textStyle={styles.primaryText}
            />
          </View>
          <View style={styles.actionRow}>
            <AppButton
              text="Send to Pharmacy"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
            />
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  previewOuter: { width: "100%" },
  previewInner: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  previewTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  messageOuter: { marginTop: 10 },
  messageInner: {
    padding: 14,
    gap: 8,
  },
  messageText: {
    color: COLORS.TEXT_80,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  footerActions: {
    paddingBottom: 10,
    gap: 12,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  primaryText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PatientMessagePreview;
