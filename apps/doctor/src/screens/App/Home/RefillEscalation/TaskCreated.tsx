import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import EcgPadIcon from "../../../../assets/icon/ecgPadIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import navigationStrings from "../../../../constants/navigationStrings";

const TaskCreated = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <View style={styles.headerSpacer} />
        </View>

        <Pressable onPress={() => navigation.navigate(navigationStrings.SAFETY_WARNING)}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            wrapperStyle={styles.avatarWrapper}
            imageStyle={styles.avatarImage}
          />
        </Pressable>

        <Text style={styles.title}>Task Created</Text>
        <Text style={styles.subTitle}>We&apos;ll follow up shortly.</Text>

        <NeumorphicCard outerStyle={styles.infoOuter} innerStyle={styles.infoInner} borderRadius={10}>
          <View style={styles.infoRow}>
            <InnerShadowIcon icon={<EcgPadIcon width={18} height={18} />} size={40} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>Task sent to allen (Nurse) - Review Refill</Text>
              <Text style={styles.infoSub}>For more context - click below</Text>
              <Text style={styles.infoSub}>www.link.com</Text>
            </View>
          </View>
        </NeumorphicCard>

        <ReusableButton
          title="Back to Queue"
          containerStyle={styles.backBtn}
          onPress={() => navigation.navigate(navigationStrings.REFILL_ESCALATION)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 170, height: 170, marginTop: 90 },
  avatarImage: { width: 102, height: 102, borderRadius: 110 },
  title: { marginTop: 5, textAlign: "center", color: COLORS.TEXT_DARK, fontSize: 20, fontWeight: "500" },
  subTitle: { marginTop: 8, textAlign: "center", color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400" },
  infoOuter: { marginTop: 20 },
  infoInner: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 16, minHeight: 70, justifyContent: "center" },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  infoTextWrap: { flex: 1 },
  infoTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  infoSub: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400", marginTop: 1 },
  backBtn: { marginTop: 30, height: 40, borderRadius: 20 },
});

export default TaskCreated;
