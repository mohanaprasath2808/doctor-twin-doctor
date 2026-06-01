import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../../constants/theme";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { NotificationItem } from "./imagingAssignmentTypes";

type ImagingNotificationSectionProps = {
  items: NotificationItem[];
};

const ImagingNotificationSection = ({ items }: ImagingNotificationSectionProps) => (
  <NeumorphicCard
    outerStyle={styles.notificationOuter}
    innerStyle={styles.notificationInner}
    borderRadius={14}
  >
    <Text style={styles.notificationTitle}>Notification</Text>
    {items.map((item, index) => (
      <View key={item.id}>
        {index > 0 ? <View style={styles.notificationDivider} /> : null}
        <View style={styles.notificationRow}>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    ))}
  </NeumorphicCard>
);

export default ImagingNotificationSection;

const styles = StyleSheet.create({
  notificationOuter: {
    width: "100%",
    marginTop: 20,
  },
  notificationInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  notificationRow: {
    gap: 6,
  },
  notificationMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Medium",
  },
  notificationTime: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  notificationDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 12,
  },
});
