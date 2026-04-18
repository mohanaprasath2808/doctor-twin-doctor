import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import NeumorphicCard from "../Common/NeumorphicCard";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import DeltaBadge from "../Common/DeltaBadge";

type RefillRequestStatus = "urgent" | "approve";

export type RefillRequestItem = {
  id: string;
  initials: string;
  name: string;
  ageGender: string;
  medication: string;
  medicationMethod: string;
  requestedAgo: string;
  status: RefillRequestStatus;
};

type RefillRequestCardProps = {
  item: RefillRequestItem;
  onPress: () => void;
};

const STATUS_MAP: Record<
  RefillRequestStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  urgent: {
    label: "Urgent",
    bgColor: COLORS.ALERT_LIGHT,
    textColor: COLORS.ALERT,
  },
  approve: {
    label: "Approve",
    bgColor: "#DDFBF0",
    textColor: COLORS.GREEN,
  },
};

const RefillRequestCard: React.FC<RefillRequestCardProps> = ({ item, onPress }) => {
  const status = STATUS_MAP[item.status];

  return (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={12}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={styles.topRow}>
          <View style={styles.leftCluster}>
            <InnerShadowIcon
              size={40}
              icon={<Text style={styles.initials}>{item.initials}</Text>}
            />
            <View style={styles.nameRow}>
              <View style={styles.nameWrap}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.ageGender}</Text>
              </View>
              <NeumorphicCard
                outerStyle={styles.statusPill}
                innerStyle={styles.statusPillInner}
                borderRadius={20}
                backgroundColor={status.bgColor}
              >
                <Text style={[styles.statusText, { color: status.textColor }]}>{status.label}</Text>
              </NeumorphicCard>
            </View>

          </View>

        </View>

        <View style={styles.divider} />
        <View style={styles.bottomRow}>
          <View style={styles.medicationContainer}>
            <Text style={styles.medication}>{item.medication}</Text>
            <Text style={styles.medicationMethod}>{item.medicationMethod}</Text>
          </View>
          <Text style={styles.requestedText}>Requested {item.requestedAgo} ago</Text>
        </View>
      </TouchableOpacity>

    </NeumorphicCard>
  );
};

const styles = StyleSheet.create({
  nameRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftCluster: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  nameWrap: {
    gap: 2,
  },
  name: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  meta: {
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "400",
  },
  statusPill: { maxHeight: 28, minWidth: 72 },
  statusPillInner: {
    height: "100%",
    paddingHorizontal: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    color: COLORS.TEXT_70,
    fontSize: 13,
    fontWeight: "500",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginTop: 16,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  medicationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  medication: {
    color: COLORS.TEXT_DARK,
    fontSize: 12,
    fontWeight: "400",
  },
  medicationMethod: {
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "400",
  },
  requestedText: {
    color: COLORS.TEXT_40,
    fontSize: 9,
    fontWeight: "400",
  },
});

export default RefillRequestCard;
