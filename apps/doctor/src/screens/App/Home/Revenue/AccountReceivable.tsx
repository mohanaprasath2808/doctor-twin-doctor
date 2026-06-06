import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowContainer from "../../../../neomorphism/InnerShadowContainer";

const AGING_TOTAL = "$28,213";

const AGING_RANGES = ["0-30", "31-60", "61-90", "90+"] as const;

type HighBalanceRow = {
  id: string;
  name: string;
  subLabel?: string;
  amount?: string;
  amountColor?: string;
  tag?: string;
  tagColor?: string;
  trailing?: string;
  trailingColor?: string;
  isHeader?: boolean;
};

const HIGH_BALANCE_ROWS: HighBalanceRow[] = [
  { id: "hdr", name: "Acme Insurance", amount: "Majority", trailing: "Agreed", isHeader: true },
  {
    id: "1",
    name: "Blocicare",
    subLabel: "Collectability Days",
    amount: "$6,041",
    trailing: "$83 ad",
  },
  {
    id: "2",
    name: "Melidare",
    amount: "$2,934",
    amountColor: COLORS.ESCALATION_DARK,
    tag: "Nom",
    tagColor: COLORS.GREEN,
    trailing: "$1,936",
  },
  {
    id: "3",
    name: "City Medicaid",
    subLabel: "Priority 90+",
    amount: "$2,931",
    trailing: "$83 ad",
  },
  {
    id: "4",
    name: "AR Aging Days",
    amount: "$2,934",
    amountColor: COLORS.ALERT,
    tag: "Nom",
    tagColor: COLORS.GREEN,
    trailing: "$1,936",
  },
];

function AgingPill({ label }: { label: string }) {
  return (
    <InnerShadowContainer
      borderRadius={20}
      height={40}
      color="#F7FBFF"
      containerStyle={styles.agingPillOuter}
      contentStyle={styles.agingPillContent}
    >
      <Text style={styles.agingPillText}>{label}</Text>
    </InnerShadowContainer>
  );
}

function BalanceTableRow({ row }: { row: HighBalanceRow }) {
  const nameStyle = row.isHeader ? styles.tableHeaderName : styles.tableName;
  const subStyle = row.isHeader ? styles.tableHeaderMeta : styles.tableSub;
  const amountStyle = [
    row.isHeader ? styles.tableHeaderMeta : styles.tableAmount,
    row.amountColor ? { color: row.amountColor } : null,
  ];
  const tagStyle = [styles.tableTag, row.tagColor ? { color: row.tagColor } : null];
  const trailingStyle = [
    row.isHeader ? styles.tableHeaderMeta : styles.tableTrailing,
    row.trailingColor ? { color: row.trailingColor } : null,
  ];

  return (
    <View style={styles.tableRow}>
      <View style={styles.colName}>
        <Text style={nameStyle} numberOfLines={1}>
          {row.name}
        </Text>
        {row.subLabel ? (
          <Text style={subStyle} numberOfLines={1}>
            {row.subLabel}
          </Text>
        ) : null}
      </View>
      <View style={styles.colAmount}>
        {row.amount ? (
          <Text style={amountStyle} numberOfLines={1}>
            {row.amount}
          </Text>
        ) : null}
      </View>
      <View style={styles.colTag}>
        {row.tag ? (
          <Text style={tagStyle} numberOfLines={1}>
            {row.tag}
          </Text>
        ) : null}
      </View>
      <View style={styles.colTrailing}>
        {row.trailing ? (
          <Text style={trailingStyle} numberOfLines={1}>
            {row.trailing}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const AccountReceivable = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Account Receivable</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.agingInner} borderRadius={14}>
          <View style={styles.agingHeaderRow}>
            <Text style={styles.sectionTitle}>Aging</Text>
            <Text style={styles.agingTotal}>{AGING_TOTAL}</Text>
          </View>
          <View style={styles.agingPillsRow}>
            {AGING_RANGES.map((range) => (
              <AgingPill key={range} label={range} />
            ))}
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.tableCardInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>High Balance Accounts</Text>
          <View style={styles.table}>
            {HIGH_BALANCE_ROWS.map((row, index) => (
              <View key={row.id}>
                <BalanceTableRow row={row} />
                {index < HIGH_BALANCE_ROWS.length - 1 ? <View style={styles.tableDivider} /> : null}
              </View>
            ))}
          </View>
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            text="Send Statement"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => {}}
          />
          <AppButton
            text="Start Collection Workflow"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountReceivable;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  cardOuter: {
    width: "100%",
    marginBottom: 14,
  },
  agingInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 14,
  },
  agingHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  agingTotal: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  agingPillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  agingPillOuter: {
    flex: 1,
    minWidth: 0,
  },
  agingPillContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  agingPillText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  tableCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 6,
  },
  tableDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  colName: {
    flex: 1.35,
    minWidth: 0,
    gap: 3,
  },
  colAmount: {
    flex: 0.85,
    minWidth: 0,
    alignItems: "flex-end",
  },
  colTag: {
    flex: 0.55,
    minWidth: 0,
    alignItems: "center",
  },
  colTrailing: {
    flex: 0.75,
    minWidth: 0,
    alignItems: "flex-end",
  },
  tableName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  tableSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  tableAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  tableTag: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.GREEN,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  tableTrailing: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  tableHeaderName: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
  },
  tableHeaderMeta: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  actionsRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
});
