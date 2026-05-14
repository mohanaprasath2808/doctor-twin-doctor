import React, { useMemo } from "react";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import FormsNeededIcon from "../../../assets/icon/formsNeedIcon.svg";
import ConsentsIcon from "../../../assets/icon/consentsIcon.svg";
import MissingRecordsIcon from "../../../assets/icon/missingRecordIcon.svg";
import DocumentGreenIcon from "../../../assets/icon/documentIcon.svg";
import DocumentRedIcon from "../../../assets/icon/documentRedIcon.svg";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import type { DocumentsDashboardListItemData } from "./documentDashboardTypes";
import type { DocumentsCategoryKey } from "./documentsCategoryTypes";
import DocumentsDashboardListItem from "./components/DocumentsDashboardListItem";

const BG = COLORS.INNER_SURFACE;

const SCROLL_H_PAD = 16;
const CARD_INNER_H_PAD = 12;
const TILE_GAP = 10;
const TILE_MIN_DIAM = 56;
const TILE_MAX_DIAM = 90;

const MOCK_DOCUMENT_ITEMS: DocumentsDashboardListItemData[] = [
  {
    id: "d1",
    documentTitle: "Shared Decision Form",
    dueLabel: "Due on 21 Apr 2026",
    statusLabel: "Pending",
    documentFlow: "pending",
    patientName: "Brian Carter",
    patientMeta: "Female • Age 45",
  },
  {
    id: "d2",
    documentTitle: "Insurance update",
    dueLabel: "Due on 21 Apr 2026",
    statusLabel: "Missing",
    documentFlow: "pending",
    patientName: "Brian Carter",
    patientMeta: "Female • Age 45",
    payerName: "Blue Cross Blue",
    memberId: "BHHGJSJ9833",
  },
];

const DocumentsDashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { width: sw } = useWindowDimensions();

  const tileLayout = useMemo(() => {
    const innerRowW = sw - SCROLL_H_PAD * 2 - CARD_INNER_H_PAD * 2;
    const colW = (innerRowW - TILE_GAP * 2) / 3;
    const outerDiameter = Math.round(
      Math.min(TILE_MAX_DIAM, Math.max(TILE_MIN_DIAM, Math.min(colW - 6, colW * 0.96))),
    );
    const innerShadowDiameter = Math.round(Math.max(46, outerDiameter - 14));
    const iconPx = Math.round(Math.min(30, Math.max(22, outerDiameter * 0.33)));
    return { outerDiameter, innerShadowDiameter, iconPx };
  }, [sw]);

  const goCategory = (categoryKey: DocumentsCategoryKey) => {
    navigation.navigate(navigationStrings.DOCUMENTS_CATEGORY_LIST, { categoryKey });
  };

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Documents Dashboard</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {header}

        <View style={styles.tilesRow}>
          <View style={styles.tileColumn}>
            <NeumorphicQuickActionTile
              onPress={() => goCategory("forms-needed")}
              icon={
                <FormsNeededIcon width={tileLayout.iconPx} height={tileLayout.iconPx} />
              }
              label="Forms Needed"
              captionBubble="Due in 2 days"
              outerDiameter={tileLayout.outerDiameter}
              innerShadowDiameter={tileLayout.innerShadowDiameter}
              innerShadowBorderRadius={Math.round(tileLayout.innerShadowDiameter / 2)}
              innerShadowColor={"#EDE0BE"}
              containerStyle={styles.tileTouchable}
              labelNumberOfLines={2}
            />
          </View>
          <View style={styles.tileColumn}>
            <NeumorphicQuickActionTile
              onPress={() => goCategory("consents")}
              icon={<ConsentsIcon width={tileLayout.iconPx} height={tileLayout.iconPx} />}
              label="Consents"
              captionBubble="Due Tomorrow"
              outerDiameter={tileLayout.outerDiameter}
              innerShadowDiameter={tileLayout.innerShadowDiameter}
              innerShadowBorderRadius={Math.round(tileLayout.innerShadowDiameter / 2)}
              containerStyle={styles.tileTouchable}
              labelNumberOfLines={2}
            />
          </View>
          <View style={styles.tileColumn}>
            <NeumorphicQuickActionTile
              onPress={() => goCategory("missing-records")}
              icon={<MissingRecordsIcon width={tileLayout.iconPx} height={tileLayout.iconPx} />}
              label="Missing Records"
              captionBubble="Due Today"
              outerDiameter={tileLayout.outerDiameter}
              innerShadowDiameter={tileLayout.innerShadowDiameter}
              innerShadowColor={"#FDECEC"}
              innerShadowBorderRadius={Math.round(tileLayout.innerShadowDiameter / 2)}
              containerStyle={styles.tileTouchable}
              labelNumberOfLines={2}
            />
          </View>
        </View>

        {MOCK_DOCUMENT_ITEMS.map((item, index) => (
          <DocumentsDashboardListItem
            key={item.id}
            item={item}
            outerStyle={index === 0 ? styles.firstListItem : undefined}
            onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_DETAIL, { item })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentsDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  quickCardOuter: {
    width: "100%",
    marginBottom: 8,
  },
  quickCardInner: {
    paddingHorizontal: CARD_INNER_H_PAD,
    paddingVertical: 14,
  },
  tilesRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: TILE_GAP,
    marginBottom: 25,
  },
  tileColumn: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
  },
  tileTouchable: {
    alignItems: "center",
    marginBottom: 0,
    paddingHorizontal: 0,
    width: "100%",
    maxWidth: "100%",
  },
  firstListItem: {
    marginTop: 0,
  },
});
