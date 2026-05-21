import React, { useCallback, useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import IconComponent from "../../../components/neomorphism/IconComponent";
import navigationStrings from "../../../constants/navigationStrings";
import type { AppStackParamList } from "../../../router/App/AppStack";
import EligibilityAuthCaseCard from "./components/EligibilityAuthCaseCard";
import EligibilityScreenHeader from "./components/EligibilityScreenHeader";
import EligibilitySummaryTile from "./components/EligibilitySummaryTile";
import {
  ACCENT_GREEN,
  HEADER_ICON_CIRCLE,
  HEADER_ICON_GLYPH,
  MOCK_CASES,
  SUMMARY_COLUMNS,
  SUMMARY_H_PAD,
  SUMMARY_SPOTS,
  SUMMARY_TILE_GAP,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as styles } from "./eligibilityPriorAuthStyles";

export default function EligibilityPriorAuth() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const { outerDiameter, innerShadowDiameter, slotWidth, iconSize } = useMemo(() => {
    const inner = windowWidth - SUMMARY_H_PAD * 2;
    const slot = (inner - SUMMARY_TILE_GAP * (SUMMARY_COLUMNS - 1)) / SUMMARY_COLUMNS;
    const outer = Math.min(100, slot);
    const innerD = Math.max(60, outer - 18);
    const computedIconSize = Math.round(Math.min(40, outer * 0.38));
    return {
      outerDiameter: outer,
      innerShadowDiameter: innerD,
      slotWidth: slot,
      iconSize: computedIconSize,
    };
  }, [windowWidth]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openAuthorizationDetail = useCallback(() => {
    navigation.navigate(navigationStrings.AUTHORIZATION_DETAIL);
  }, [navigation]);

  const openRequestDocuments = useCallback(() => {
    navigation.navigate(navigationStrings.REQUEST_DOCUMENTS);
  }, [navigation]);

  const openDenialResolution = useCallback(() => {
    navigation.navigate(navigationStrings.DENIAL_RESOLUTION);
  }, [navigation]);

  const openSummaryScreen = useCallback(
    (key: (typeof SUMMARY_SPOTS)[number]["key"]) => {
      if (key === "pending") {
        navigation.navigate(navigationStrings.AUTHORIZATION_TRACKING);
      } else if (key === "issue") {
        navigation.navigate(navigationStrings.MISSING_DOCUMENTS);
      } else {
        navigation.navigate(navigationStrings.DENIAL_ANALYSIS);
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <EligibilityScreenHeader
          title="Eligibility / Prior Auth"
          onBack={onBack}
          rightSlot={
            <IconComponent
              icon={
                <MaterialCommunityIcons name="plus" size={HEADER_ICON_GLYPH} color={ACCENT_GREEN} />
              }
              width={HEADER_ICON_CIRCLE}
              height={HEADER_ICON_CIRCLE}
              radius={HEADER_ICON_CIRCLE / 2}
              onPress={() => {}}
            />
          }
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryCarousel}
          nestedScrollEnabled
          decelerationRate="fast"
        >
          {SUMMARY_SPOTS.map((spot, index) => (
            <View
              key={spot.key}
              style={[
                styles.summaryCarouselItem,
                { width: slotWidth },
                index < SUMMARY_SPOTS.length - 1 ? { marginRight: SUMMARY_TILE_GAP } : null,
              ]}
            >
              <EligibilitySummaryTile
                spot={spot}
                outerDiameter={outerDiameter}
                innerShadowDiameter={innerShadowDiameter}
                iconSize={iconSize}
                slotWidth={slotWidth}
                onPress={() => openSummaryScreen(spot.key)}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.caseList}>
          {MOCK_CASES.map((row, index) => (
            <View key={row.id} style={index > 0 ? styles.caseGap : undefined}>
              <EligibilityAuthCaseCard
                row={row}
                onSubmit={openAuthorizationDetail}
                onRequest={openRequestDocuments}
                onEscalate={openDenialResolution}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
