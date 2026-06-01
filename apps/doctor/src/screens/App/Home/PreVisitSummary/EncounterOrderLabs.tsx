import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";

type LabKey = "lipid" | "a1c" | "bmp";

const LAB_ROWS: { key: LabKey; label: string }[] = [
  { key: "lipid", label: "Lipid Panel" },
  { key: "a1c", label: "A1C" },
  { key: "bmp", label: "BMP" },
];

const EncounterOrderLabs = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [selected, setSelected] = useState<Record<LabKey, boolean>>({
    lipid: false,
    a1c: false,
    bmp: false,
  });

  const toggle = (key: LabKey) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
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
            <Text style={styles.headerTitle}>Order Labs</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={12}
          >
            {LAB_ROWS.map((row, index) => (
              <React.Fragment key={row.key}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <Pressable style={styles.optionRow} onPress={() => toggle(row.key)}>
                  <View style={styles.optionLeft}>
                    <NeumorphicCheckboxMark selected={selected[row.key]} />
                    <Text style={styles.optionText}>{row.label}</Text>
                  </View>
                </Pressable>
              </React.Fragment>
            ))}
          </NeumorphicCard>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          <ReusableButton
            title="Confirm Order"
            height={52}
            borderRadius={26}
            containerStyle={styles.cta}
            onPress={() => navigation.goBack()}
            textStyle={styles.footerBtnLabel}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EncounterOrderLabs;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Semibold",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  cardOuter: {
    width: "100%",
    marginTop: 20,
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionRow: {
    minHeight: 46,
    justifyContent: "center",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  optionText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.TEXT_10,
  },
  cta: {},
  footerBtnLabel: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.WHITE,
  },
});
