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
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";

const OrderSent = () => {
  const navigation = useNavigation<any>();
  const [notify, setNotify] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Order Sent!</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          wrapperStyle={styles.avatarWrapper}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>Order Sent!</Text>
        <Text style={styles.subTitle}>
          This order sent to quest for Sarah Williams
        </Text>

        <NeumorphicCard
          outerStyle={styles.infoCardOuter}
          innerStyle={styles.infoCardInner}
          borderRadius={12}
        >
          <View style={styles.infoItem}>
            <InnerShadowIcon
              size={40}
              icon={<PatientIcon width={18} height={18} />}
            />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>10:30 AM</Text>
              <Text style={styles.infoSub}>Due by</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <InnerShadowIcon
              size={38}
              icon={<PatientIcon width={18} height={18} />}
            />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>Sarah</Text>
              <Text style={styles.infoSub}>Task</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.notifyCardOuter}
          innerStyle={styles.notifyCardInner}
          borderRadius={12}
        >
          <View style={styles.notifyTopRow}>
            <Text style={styles.notifyText}>Notify Sarah Williams</Text>
            <NeumorphicSwitch value={notify} onValueChange={setNotify} />
          </View>
          <View style={styles.divider} />
          <View style={styles.reminderRow}>
            <InnerShadowIcon
              size={40}
              icon={<PatientIcon width={20} height={20} />}
            />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>How follow-up reminder</Text>
              <Text style={styles.infoSub}>2 weeks</Text>
            </View>
          </View>
        </NeumorphicCard>

        <View style={styles.buttonWrap}>
          <ReusableButton
            title="Send Message"
            width="100%"
            height={48}
            borderRadius={24}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSent;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { flexGrow: 1, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 200, height: 200, marginTop: 8 },
  avatarImage: { width: 120, height: 120, borderRadius: 60 },
  title: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  subTitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_70,
  },
  infoCardOuter: { marginTop: 22, marginHorizontal: 16 },
  infoCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: { width: "48%", flexDirection: "row", alignItems: "center" },
  infoTextWrap: { marginLeft: 10 },
  infoTitle: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  infoSub: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_60,
  },
  notifyCardOuter: { marginTop: 18, marginHorizontal: 16 },
  notifyCardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  notifyTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifyText: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  divider: { marginVertical: 12, height: 1, backgroundColor: COLORS.TEXT_10 },
  reminderRow: { flexDirection: "row", alignItems: "center" },
  buttonWrap: { marginTop: "auto", marginHorizontal: 16, paddingTop: 24 },
});
