import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import TickIcon from "../../../../assets/icon/tickIcon.svg";
import LastVisitIcon from "../../../../assets/icon/appointmentCalendarIcon.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import MinusIcon from "../../../../assets/icon/minus.svg";
import PlusIcon from "../../../../assets/icon/plus.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";

const RefillSent = () => {
  const navigation = useNavigation<any>();
  const [customCount, setCustomCount] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Refill Sent</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          wrapperStyle={styles.avatarWrapper}
          imageStyle={styles.avatarImage}
        />
        <Text style={styles.title}>Refill Sent</Text>
        <Text style={styles.subTitle}>Refill sent to CVS Redondo from Dr.Soliman</Text>

        <NeumorphicCard outerStyle={styles.notifyOuter} innerStyle={styles.notifyInner} borderRadius={10}>
          <View style={styles.notifyRow}>
            <InnerShadowIcon icon={<TickIcon width={14} height={14} />} size={24} />
            <View>
              <Text style={styles.notifyTitle}>Notify Sarah Williams</Text>
              <Text style={styles.notifySub}>Shared your refill was approved.</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.auditOuter} innerStyle={styles.auditInner} borderRadius={10}>
          <Text style={styles.auditTitle}>Action tagged for audit trail</Text>
          <View style={styles.auditDivider} />
          <View style={styles.auditRow}>
            <View style={styles.auditLeft}>
              <InnerShadowIcon icon={<TickIcon width={14} height={14} />} size={30} />
              <View>
                <Text style={styles.auditRowTitle}>Print how to cause</Text>
                <Text style={styles.auditRowSub}>Preotics BMA and aparted</Text>
              </View>
            </View>
            <RightArrowIcon width={10} height={10} />
          </View>
          <View style={styles.auditDivider} />
          <View style={styles.auditRow}>
            <View style={styles.auditLeft}>
              <InnerShadowIcon icon={<LastVisitIcon width={14} height={14} />} size={30} />
              <View>
                <Text style={styles.auditRowTitle}>15 March 2024</Text>
                <Text style={styles.auditRowSub}>2 week</Text>
              </View>
            </View>
            <RightArrowIcon width={10} height={10} />
          </View>
        </NeumorphicCard>

        <View style={styles.pillsRow}>
          <NeumorphicCard outerStyle={styles.pillOuter} innerStyle={styles.pillInner} borderRadius={10}>
            <Text style={styles.pillText}>Finctein | BUP</Text>
          </NeumorphicCard>
          <NeumorphicCard outerStyle={styles.customOuter} innerStyle={styles.customInner} borderRadius={10}>
            <Text style={styles.customText}>Custom</Text>
            <View style={styles.counterWrap}>
              <IconComponent icon={<MinusIcon width={9} height={9} />} width={24} height={24} radius={12} onPress={() => setCustomCount((v) => Math.max(0, v - 1))} />
              <Text style={styles.countText}>{customCount}</Text>
              <IconComponent icon={<PlusIcon width={9} height={9} />} width={24} height={24} radius={12} onPress={() => setCustomCount((v) => v + 1)} />
            </View>
          </NeumorphicCard>
        </View>

        <ReusableButton title="Send Refill" containerStyle={styles.sendBtn} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 170, height: 170, marginTop: 6 },
  avatarImage: { width: 86, height: 86, borderRadius: 43 },
  title: { marginTop: 4, textAlign: "center", color: COLORS.TEXT_DARK, fontSize: 28, fontWeight: "500" },
  subTitle: { marginTop: 6, textAlign: "center", color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400" },
  notifyOuter: { marginTop: 16 },
  notifyInner: { borderRadius: 10, padding: 10 },
  notifyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  notifyTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  notifySub: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400", marginTop: 1 },
  auditOuter: { marginTop: 16 },
  auditInner: { borderRadius: 10, padding: 10 },
  auditTitle: { color: COLORS.TEXT_DARK, fontSize: 22, fontWeight: "500" },
  auditDivider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 12 },
  auditRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  auditLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  auditRowTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  auditRowSub: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
  pillsRow: { marginTop: 16, flexDirection: "row", gap: 12 },
  pillOuter: { flex: 1 },
  pillInner: { borderRadius: 10, minHeight: 42, justifyContent: "center", alignItems: "center" },
  pillText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
  customOuter: { flex: 1 },
  customInner: { borderRadius: 10, minHeight: 42, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  customText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "400" },
  counterWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  countText: { color: COLORS.TEXT_70, fontSize: 14, fontWeight: "400" },
  sendBtn: { marginTop: 18, height: 48, borderRadius: 24 },
});

export default RefillSent;
