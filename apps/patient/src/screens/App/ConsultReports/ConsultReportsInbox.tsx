import React from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import CheckedListPadIcon from "../../../assets/icons/consultIcon.svg";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

type ConsultReportRow = {
  id: string;
  title: string;
  date: string;
  doctorName: string;
};

const MOCK_REPORTS: ConsultReportRow[] = [
  {
    id: "1",
    title: "Dermatology Visit Notes",
    date: "20 April 2025",
    doctorName: "Dr. Lisa Shaw",
  },
  {
    id: "2",
    title: "Hospital Discharge Summary",
    date: "18 April 2025",
    doctorName: "Dr. Marcus Chen",
  },
  {
    id: "3",
    title: "Cardiology Consult",
    date: "2 April 2025",
    doctorName: "Dr. Anita Rao",
  },
];

const ConsultReportsInbox = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: ListRenderItemInfo<ConsultReportRow>) => (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={10}
      onPress={() => navigation.navigate(navigationStrings.CONSULT_REPORT_DETAIL)}
    >
      <InnerShadowIcon
        icon={<CheckedListPadIcon width={20} height={20} />}
        size={40}
        radius={20}
        surfaceColor={COLORS.INNER_SURFACE}
      />
      <View style={styles.cardTextCol}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
        <View style={styles.doctorRow}>
          <Image source={DoctorTempImage} style={styles.doctorThumb} />
          <Text style={styles.doctorName} numberOfLines={1}>
            {item.doctorName}
          </Text>
        </View>
      </View>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Consult Reports Inbox</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={MOCK_REPORTS}
            keyExtractor={(row) => row.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConsultReportsInbox;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  body: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Medium",
  },
  notifWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ALERT,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 8,
  },
  sep: { height: 14 },
  cardOuter: {
    alignSelf: "stretch",
    width: "100%",
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 12,
    borderRadius: 10,
  },
  cardTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  itemDate: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  doctorThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    resizeMode: "cover",
  },
  doctorName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Regular",
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
});
