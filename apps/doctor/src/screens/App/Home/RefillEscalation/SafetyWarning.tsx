import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import StatusDot from "../../../../components/Common/StatusDot";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import WarningIcon from "../../../../assets/image/safetyWarning.png";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import navigationStrings from "../../../../constants/navigationStrings";

const ALERT_ITEMS = [
  { id: "egfr", text: "eGFR not updated", color: COLORS.TEXT_60 },
  { id: "interaction", text: "Possible drug interaction", color: COLORS.TEXT_60 },
];

const SafetyWarning = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={WarningIcon}
          wrapperStyle={styles.avatarWrapper}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>Safety Warning</Text>
        <Text style={styles.subTitle}>BMP and eGFR results are due; advise{"\n"}patient accordingly</Text>

        <NeumorphicCard outerStyle={styles.infoOuter} innerStyle={styles.infoInner} borderRadius={10}>
          <Text style={styles.infoTitle}>Risk Info</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.alertCard}
            contentStyle={styles.alertCardContent}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <FlatList
              data={ALERT_ITEMS}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.alertRow}>
                  <StatusDot color={item.color} size={8} outerGradientColors={[COLORS.LIGHT_SHADOW, COLORS.DARK_SHADOW]} />
                  <Text style={styles.alertText}>{item.text}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.alertRowSeparator} />}
            />
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <View style={styles.actionGrid}>
          <AppButton activeOpacity={0.8} style={styles.gridBtn} borderWidth={1} borderColor={COLORS.PRIMARY} bgColor={COLORS.SURFACE} text="Approve with note" textStyle={styles.primaryOutlineText} onPress={() => { }} />
          <AppButton activeOpacity={0.8} style={styles.gridBtn} borderWidth={1} borderColor={COLORS.PRIMARY} bgColor={COLORS.SURFACE} text="Send to Staff" textStyle={styles.primaryOutlineText} onPress={() => { }} />
          <AppButton activeOpacity={0.8} style={styles.gridBtn} borderWidth={1} borderColor={COLORS.PRIMARY} bgColor={COLORS.SURFACE} text="Short Supply + Schedule" textStyle={styles.primaryOutlineText} onPress={() => navigation.navigate(navigationStrings.SHORT_SUPPLY_APPROVAL)} />
          <AppButton activeOpacity={0.8} style={styles.gridBtn} borderWidth={1} borderColor={COLORS.ALERT} bgColor={COLORS.ALERT_LIGHT} text="Deny + Message Patient" textStyle={styles.denyText} onPress={() => navigation.navigate(navigationStrings.PATIENT_MESSAGE_PREVIEW)} />
        </View>

        <ReusableButton
          title="Order Labs"
          containerStyle={styles.orderBtn}
          onPress={() => navigation.navigate(navigationStrings.ORDER_LABS)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 170, height: 170, marginTop: 34 },
  avatarImage: { width: 102, height: 102, borderRadius: 110 },
  title: { marginTop: 10, textAlign: "center", color: COLORS.TEXT_DARK, fontSize: 20, fontWeight: "500" },
  subTitle: { marginTop: 10, textAlign: "center", color: COLORS.TEXT_70, fontSize: 14, fontWeight: "400" },
  infoOuter: { marginTop: 18 },
  infoInner: { borderRadius: 10, padding: 10 },
  infoTitle: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "500" },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 8 },
  alertCard: { marginTop: 16 },
  alertCardContent: { paddingHorizontal: 10, paddingVertical: 10 },
  alertRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  alertRowSeparator: { height: 8 },
  alertText: { color: COLORS.TEXT_DARK, fontSize: 10, fontWeight: "500" },
  actionGrid: { marginTop: 30, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 10 },
  gridBtn: { display: "flex", alignItems: "center", justifyContent: "center", width: "48%", borderRadius: 60, paddingHorizontal: 16 },
  primaryOutlineText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500", textAlign: "center" },
  denyText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500", textAlign: "center" },
  orderBtn: { marginTop: 20, height: 40, borderRadius: 20 },
});

export default SafetyWarning;
