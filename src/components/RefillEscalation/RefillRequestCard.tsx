import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
  requestedAgo: string;
  status: RefillRequestStatus;
};

type RefillRequestCardProps = {
  item: RefillRequestItem;
};

const STATUS_MAP: Record<
  RefillRequestStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  urgent: {
    label: "Urgent",
    bgColor: "#FDECEC",
    textColor: COLORS.ALERT,
  },
  approve: {
    label: "Approve",
    bgColor: "#DDFBF0",
    textColor: COLORS.GREEN,
  },
};

const RefillRequestCard: React.FC<RefillRequestCardProps> = ({ item }) => {
  const status = STATUS_MAP[item.status];

  return (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={12}
    >
      <View style={styles.topRow}>
        <View style={styles.leftCluster}>
          <InnerShadowIcon
            size={30}
            icon={<Text style={styles.initials}>{item.initials}</Text>}
          />
          <View style={styles.nameWrap}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.ageGender}</Text>
          </View>
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

      <View style={styles.divider} />
      <View style={styles.bottomRow}>
        <Text style={styles.medication}>{item.medication}</Text>
        <Text style={styles.requestedText}>Requested {item.requestedAgo} ago</Text>
      </View>
    </NeumorphicCard>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "600",
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
    fontSize: 11,
    fontWeight: "400",
  },
  statusPill: {
  },
  statusPillInner: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 64,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  medication: {
    flex: 1,
    color: COLORS.TEXT_60,
    fontSize: 11,
    fontWeight: "400",
  },
  requestedText: {
    color: COLORS.TEXT_40,
    fontSize: 9,
    fontWeight: "400",
  },
});

export default RefillRequestCard;
