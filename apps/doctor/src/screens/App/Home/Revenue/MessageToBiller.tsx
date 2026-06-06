import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import PatientTempImage from "../../../../assets/image/tempImage/fakeID.png";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import SendMessageBubble from "./components/SendMessageBubble";

const MessageToBiller = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [question, setQuestion] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Message to Biller</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={14}>
          <View style={styles.patientRow}>
            <Image source={PatientTempImage} style={styles.patientAvatar} />
            <View style={styles.patientText}>
              <Text style={styles.patientName}>Nathan Adams</Text>
              <Text style={styles.patientSub}>Humana</Text>
              <Text style={styles.patientAmount}>$145</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Medical necessity</Text>
            </View>
          </View>
        </NeumorphicCard>

        <View style={styles.chatSection}>
          <SendMessageBubble
            variant="outgoing"
            message="Why was this claim denied?"
            timestamp="09:23 PM"
            avatarSource={DoctorTempImage}
          />

          <View style={styles.incomingCol}>
            <NeumorphicCard
              outerStyle={styles.incomingBubbleOuter}
              innerStyle={styles.incomingBubbleInner}
              borderRadius={16}
            >
              <Text style={styles.incomingText}>It was denied due to missing documentation.</Text>
            </NeumorphicCard>
            <Text style={styles.incomingTimestamp}>09:23 PM</Text>
          </View>

          <SendMessageBubble
            variant="insight"
            title="Missing documentation"
            actionText="Attach visit notes and resubmit"
            avatarSource={DoctorTempImage}
          />
        </View>
      </ScrollView>

      <View style={[styles.inputFooter, { paddingBottom: insets.bottom + 12 }]}>
        <InputField
          placeholder="Type a question"
          value={question}
          onChangeText={setQuestion}
          borderRadius={64}
          containerStyle={styles.input}
          rightIcon={<MessageIcon width={18} height={18} />}
          onRightIconPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default MessageToBiller;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 16,
  },
  patientOuter: {
    width: "100%",
  },
  patientInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  patientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  patientText: {
    flex: 1,
    minWidth: 0,
    gap: 2,
    paddingTop: 2,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  patientAmount: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF8DB",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    maxWidth: "40%",
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.ESCALATION_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "center",
  },
  chatSection: {
    gap: 14,
  },
  incomingCol: {
    alignItems: "flex-start",
    maxWidth: "82%",
    gap: 4,
  },
  incomingBubbleOuter: {
    width: "100%",
  },
  incomingBubbleInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  incomingText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 20,
  },
  incomingTimestamp: {
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginLeft: 4,
  },
  inputFooter: {
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  input: {
    width: "100%",
    marginTop: 0,
  },
});
