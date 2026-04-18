import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";

import BlackTickIcon from "../../../../assets/icon/blackTickIcon.svg";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

const CompletionTask = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Completion Task</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            wrapperStyle={styles.avatarWrapper}
            imageStyle={styles.avatarImage}
          />

          <Text style={styles.title}>Task Completed</Text>
          <Text style={styles.subTitle}>Task was completed by Rebacca K</Text>

          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
            <View style={styles.row}>
              <Image source={DoctorTempImage} style={styles.avatar} />
              <View style={styles.textWrap}>
                <Text style={styles.name}>Sarah Williams</Text>
                <Text style={styles.meta}>Female • Age 45</Text>
              </View>
            </View>
            <NeumorphicInnerShadowCard
              borderRadius={100}
              containerStyle={styles.shadowTextOuter}
              contentStyle={styles.shadowTextInner}
              darkShadowColor="#C8CBCC99"
              lightShadowColor="#FFFFFFCC"
            >
              <Text style={styles.shadowText}>Metformin refill prepared</Text>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
            <View style={styles.topInfoRow}>
              <View style={styles.row}>
                <Image source={DoctorTempImage} style={styles.smallAvatar} />
                <View style={styles.textWrap}>
                  <Text style={styles.smallName}>Rebecca K</Text>
                  <Text style={styles.smallMeta}>Staff</Text>
                </View>
              </View>
              <Text style={styles.time}>12 : 33 PM</Text>
            </View>
            <NeumorphicInnerShadowCard
              borderRadius={100}
              containerStyle={styles.shadowTextOuter}
              contentStyle={styles.shadowTextInner}
              darkShadowColor="#C8CBCC99"
              lightShadowColor="#FFFFFFCC"
            >
              <View style={styles.tickIconWrapper}>
                <BlackTickIcon width={16} height={16} />
                <Text style={styles.shadowText}>Approved by Dr.Johnson</Text>
              </View>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
            <Text style={styles.outcomeTitle}>Outcome</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.shadowTextOuter}
              contentStyle={styles.shadowTextInner}
              darkShadowColor="#C8CBCC99"
              lightShadowColor="#FFFFFFCC"
            >
              <Text style={styles.shadowText}>Add a follow-up note based on her blood pressure concerns</Text>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>
          <View style={styles.buttonRow}>
            <AppButton
              text="Close Task"
              activeOpacity={0.85}
              style={styles.closeBtn}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.closeText}
              onPress={() => navigation.goBack()}
            />
            <ReusableButton
              title="View Audit Trail"
              containerStyle={styles.auditBtn}
              textStyle={styles.auditText}
              onPress={() => navigation.navigate(navigationStrings.AUDIT_TRAIL)}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompletionTask;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 200, height: 200, marginTop: 8 },
  avatarImage: { width: 120, height: 120, borderRadius: 60 },
  title: { marginTop: 10, textAlign: "center", fontSize: 20, fontWeight: "500", color: COLORS.TEXT_DARK },
  subTitle: { marginTop: 8, textAlign: "center", fontSize: 14, fontWeight: "400", color: COLORS.TEXT_70 },

  cardOuter: { marginTop: 30 },
  cardInner: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 12 },
  row: { flexDirection: "row", alignItems: "center" },
  topInfoRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  avatar: { width: 60, height: 60, borderRadius: 25, resizeMode: "cover" },
  smallAvatar: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  textWrap: { marginLeft: 10, flex: 1 },
  name: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  meta: { marginTop: 2, color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400" },
  smallName: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  smallMeta: { marginTop: 2, color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
  time: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "500" },
  outcomeTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },

  shadowTextOuter: { marginTop: 14 },
  shadowTextInner: { paddingHorizontal: 14, paddingVertical: 10 },
  shadowText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "400", lineHeight: 22 },
  tickIconWrapper: { flexDirection: "row", alignItems: "center", gap: 4 },
  footer: { paddingHorizontal: 16, paddingBottom: 20 },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 20 },
  closeBtn: { flex: 1, height: 48, borderRadius: 24 },
  closeText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  auditBtn: { flex: 1, height: 48, borderRadius: 24 },
  auditText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
});

