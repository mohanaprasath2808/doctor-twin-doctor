import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import AppButton from "../../../../components/Common/AppButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import LastVisitIcon from "../../../../assets/icon/appointmentCalendarIcon.svg";
import PharmacyIcon from "../../../../assets/icon/pharmacyIcon.svg";
import SelectedCheckBox from "../../../../assets/icon/selectedCheckBoxIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";

const RefillSent = () => {
  const navigation = useNavigation<any>();
  const [isNotifyChecked, setIsNotifyChecked] = useState(false);
  const auditItems = [
    { id: "pharmacy", title: "CVS Pharmacy", subTitle: "Torrance Crossroads", type: "pharmacy" as const },
    { id: "date", title: "7 Apr 2025, 4:30 PM", subTitle: "", type: "visit" as const },
  ];

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
        <Text style={styles.title}>Refill Sent Successfully</Text>
        <Text style={styles.subTitle}>Refill sent to CVS Redondo from Dr.Soliman</Text>

        <NeumorphicCard outerStyle={styles.notifyOuter} innerStyle={styles.notifyInner} borderRadius={10}>
          <Pressable style={styles.notifyRow} onPress={() => setIsNotifyChecked((prev) => !prev)}>
            {isNotifyChecked ? <SelectedCheckBox width={20} height={20} /> : <InnerShadowIcon icon={<></>} size={20} radius={6} />}
            <View>
              <Text style={styles.notifyTitle}>Notify Sarah Williams</Text>
              <Text style={styles.notifySub}>Shared your refill was approved.</Text>
            </View>
          </Pressable>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.auditOuter} innerStyle={styles.auditInner} borderRadius={10}>
          <FlatList
            data={auditItems}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.auditList}
            ItemSeparatorComponent={() => <View style={styles.auditDivider} />}
            renderItem={({ item }) => (
              <View style={styles.auditRow}>
                <View style={styles.auditLeft}>
                  <InnerShadowIcon icon={item.type === "pharmacy" ? <PharmacyIcon width={18} height={18} /> : <LastVisitIcon width={18} height={18} />} size={40} />
                  <View>
                    <Text style={styles.auditRowTitle}>{item.title}</Text>
                    {!!item.subTitle && <Text style={styles.auditRowSub}>{item.subTitle}</Text>}
                  </View>
                </View>
              </View>
            )}
          />
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <AppButton
            activeOpacity={0.85}
            style={styles.viewBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="View Patient chart"
            textStyle={styles.viewBtnText}
            onPress={() => { }}
          />
          <ReusableButton title="Done" containerStyle={styles.doneBtn} onPress={() => navigation.goBack()} />
        </View>
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
  avatarWrapper: { width: 170, height: 170, marginTop: 30 },
  avatarImage: { width: 100, height: 100, borderRadius: 43 },
  title: { marginTop: 0, textAlign: "center", color: COLORS.TEXT_DARK, fontSize: 20, fontWeight: "500" },
  subTitle: { marginTop: 8, textAlign: "center", color: COLORS.TEXT_70, fontSize: 14, fontWeight: "400" },
  notifyOuter: { marginTop: 26 },
  notifyInner: { borderRadius: 10, padding: 10 },
  notifyRow: { flexDirection: "row", gap: 10 },
  notifyTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  notifySub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 1 },
  auditOuter: { marginTop: 20 },
  auditInner: { borderRadius: 10, padding: 10 },
  auditTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  auditList: {},
  auditDivider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 10 },
  auditRow: { flexDirection: "row", alignItems: "center" },
  auditLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  auditRowTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  auditRowSub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400" },
  actionRow: { marginTop: 88, flexDirection: "row", gap: 12 },
  viewBtn: { flex: 1, height: 48, borderRadius: 24 },
  viewBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  doneBtn: { flex: 1, height: 48, borderRadius: 24 },
});

export default RefillSent;
