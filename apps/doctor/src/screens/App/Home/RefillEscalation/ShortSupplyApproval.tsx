import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import navigationStrings from "../../../../constants/navigationStrings";

type FollowUpOption = "order-labs" | "schedule-visit";

const ShortSupplyApproval = () => {
  const navigation = useNavigation<any>();
  const [selectedOption, setSelectedOption] = useState<FollowUpOption>("schedule-visit");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
      <View style={styles.screen}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>Short Supply Approval</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard outerStyle={styles.topCardOuter} innerStyle={styles.topCardInner} borderRadius={10}>
            <View style={styles.rowLeft}>
              <InnerShadowIcon icon={<CapsuleIcon width={18} height={18} />} size={40} />
              <View>
                <Text style={styles.rowTitle}>7 days</Text>
                <Text style={styles.rowSub}>Supply</Text>
              </View>
            </View>
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.optionsOuter} innerStyle={styles.optionsInner} borderRadius={10}>
            <Pressable style={styles.optionRow} onPress={() => setSelectedOption("order-labs")}>
              <View style={styles.rowLeft}>
                <NeumorphicCheckboxMark selected={selectedOption === "order-labs"} />
                <Text style={styles.optionText}>Order Labs</Text>
              </View>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.optionRow} onPress={() => setSelectedOption("schedule-visit")}>
              <View style={styles.rowLeft}>
                <NeumorphicCheckboxMark selected={selectedOption === "schedule-visit"} />
                <Text style={styles.optionText}>Schedule Visit</Text>
              </View>
            </Pressable>
          </NeumorphicCard>
        </ScrollView>
        <View style={styles.bottomAction}>
          <ReusableButton
            title="Approve Short Supply"
            containerStyle={styles.approveBtn}
            onPress={() =>
              selectedOption === "order-labs"
                ? navigation.navigate(navigationStrings.ORDER_LABS)
                : navigation.navigate(navigationStrings.REFILL_SCHEDULE_VISIT)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  topCardOuter: { marginTop: 30 },
  topCardInner: { borderRadius: 10, padding: 10, justifyContent: "center" },
  optionsOuter: { marginTop: 20 },
  optionsInner: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 },
  optionRow: { paddingVertical: 10, justifyContent: "center" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  rowSub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 1 },
  optionText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 8 },
  bottomAction: { paddingHorizontal: 16, paddingBottom: 10 },
  approveBtn: {},
});

export default ShortSupplyApproval;
