import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import EcgPadIcon from "../../../../assets/icon/ecgPadIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { formatEncounterElapsed } from "../../../../constants/contant";
import { COLORS } from "../../../../constants/theme";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InnerShadowView from "../../../../neomorphism/InnerShadowView";
import navigationStrings from "../../../../constants/navigationStrings";

const ENCOUNTER_HINT = "I'm listening. You can speak naturally.";

const CHIEF_COMPLAINT = "Chest pain on exertion";

const HPI_TEXT =
  "Patient reports intermittent chest discomfort for 2 weeks, worsening with climbing stairs.";

const HPI_INSET_RADIUS = 10;

const ENCOUNTER_TIMER_PILL_W = 80;
const ENCOUNTER_TIMER_PILL_H = 30;
const ENCOUNTER_TIMER_PILL_R = 10;

const EndEncounter = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hpiInsetSize, setHpiInsetSize] = useState({ w: 0, h: 0 });

  const onHpiInsetLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setHpiInsetSize((prev) =>
      prev.w === width && prev.h === height ? prev : { w: width, h: height },
    );
  }, []);

  useEffect(() => {
    const id = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.headerSide}>
              <IconComponent
                icon={<BackIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>End Encounter</Text>
            </View>
            <View style={[styles.headerSide, styles.headerSideEnd]}>
              <View
                style={[
                  styles.timerPill,
                  { width: ENCOUNTER_TIMER_PILL_W, height: ENCOUNTER_TIMER_PILL_H },
                ]}
              >
                <View style={styles.timerPillShadow} pointerEvents="none">
                  <InnerShadowView
                    width={ENCOUNTER_TIMER_PILL_W}
                    height={ENCOUNTER_TIMER_PILL_H}
                    borderRadius={ENCOUNTER_TIMER_PILL_R}
                    color={COLORS.SURFACE}
                  />
                </View>
                <View style={styles.timerTextLayer} pointerEvents="none">
                  <Text style={styles.timerText}>{formatEncounterElapsed(elapsedSeconds)}</Text>
                </View>
              </View>
            </View>
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatar}
            wrapperStyle={styles.heroWrapper}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />

          <Text style={styles.hint}>{ENCOUNTER_HINT}</Text>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={12}
          >
            <Text style={styles.cardSectionTitle}>Chief Complaint</Text>
            <View style={styles.complaintRow}>
              <View style={styles.iconShadowSlot}>
                <InnerShadowIcon
                  size={40}
                  radius={20}
                  icon={<EcgPadIcon width={18} height={18} />}
                />
              </View>
              <Text style={styles.complaintText}>{CHIEF_COMPLAINT}</Text>
            </View>
          </NeumorphicCard>

          <View style={styles.sectionGap} />

          <NeumorphicCard
            outerStyle={[styles.cardOuter, { marginTop: 10 }]}
            innerStyle={styles.cardInner}
            borderRadius={12}
          >
            <Text style={styles.cardSectionTitle}>HPI</Text>
            <View style={styles.hpiInset} onLayout={onHpiInsetLayout}>
              {hpiInsetSize.w > 0 && hpiInsetSize.h > 0 ? (
                <View style={styles.hpiInsetShadow} pointerEvents="none">
                  <InnerShadowView
                    width={hpiInsetSize.w}
                    height={hpiInsetSize.h}
                    borderRadius={HPI_INSET_RADIUS}
                    color={COLORS.SURFACE}
                  />
                </View>
              ) : null}
              <Text style={styles.hpiInsetText}>{HPI_TEXT}</Text>
            </View>
          </NeumorphicCard>

          <View style={styles.midActions}>
            <View style={styles.midRow}>
              <View style={styles.midCell}>
                <AppButton
                  text="Add Note"
                  width="100%"
                  height={48}
                  borderRadius={26}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={[styles.midBtnLabel, styles.midBtnLabelOutlined]}
                  onPress={() => navigation.navigate(navigationStrings.ADD_ENCOUNTER_NOTE)}
                />
              </View>
              <View style={styles.midCell}>
                <AppButton
                  text="Add Diagnosis"
                  width="100%"
                  height={48}
                  borderRadius={26}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={[styles.midBtnLabel, styles.midBtnLabelOutlined]}
                  onPress={() => navigation.navigate(navigationStrings.ADD_DIAGNOSIS)}
                />
              </View>
            </View>
            <View style={styles.midRow}>
              <View style={styles.midCell}>
                <AppButton
                  text="Add Order"
                  width="100%"
                  height={48}
                  borderRadius={26}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={[styles.midBtnLabel, styles.midBtnLabelOutlined]}
                  onPress={() => navigation.navigate(navigationStrings.ENCOUNTER_ORDER_LABS)}
                />
              </View>
              <View style={styles.midCell}>
                <AppButton
                  text="Add Prescription"
                  width="100%"
                  height={48}
                  borderRadius={26}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={[styles.midBtnLabel, styles.midBtnLabelOutlined]}
                  onPress={() => navigation.navigate(navigationStrings.ADD_PRESCRIPTION)}
                />
              </View>
            </View>
          </View>

          <View style={{ height: bottomPad + 100 }} />
        </ScrollView>

        <View style={[styles.footerDock, { paddingBottom: bottomPad }]}>
          <View style={styles.footerBtnWrap}>
            <AppButton
              text="Pause Listening"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={[styles.footerBtnLabel, styles.midBtnLabelOutlined]}
              onPress={() => {}}
            />
          </View>
          <View style={styles.footerBtnWrap}>
            <AppButton
              text="End Encounter"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.ALERT_LIGHT}
              textStyle={styles.footerEndLabel}
              onPress={() => navigation.navigate(navigationStrings.ENCOUNTER_SUMMARY)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EndEncounter;

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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerSide: {
    flex: 1,
    minWidth: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerSideEnd: {
    justifyContent: "flex-end",
  },
  headerCenter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  timerPill: {
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
  timerPillShadow: {
    ...StyleSheet.absoluteFillObject,
  },
  timerTextLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  timerText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Mono-Medium",
    textAlign: "center",
  },
  heroAvatar: {
    alignSelf: "center",
    marginTop: 4,
  },
  heroWrapper: {
    width: 200,
    height: 200,
  },
  heroOverlay: {
    borderRadius: 100,
  },
  heroImage: {
    width: 120,
    height: 120,
  },
  hint: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    paddingHorizontal: 8,
    fontFamily: "SF-Pro-Text-Medium",
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
    fontFamily: "SF-Pro-Text-Medium",
  },
  complaintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconShadowSlot: {
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  complaintText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
  },
  sectionGap: {
    height: 16,
  },
  hpiInset: {
    width: "100%",
    alignSelf: "stretch",
    borderRadius: HPI_INSET_RADIUS,
    overflow: "hidden",
  },
  hpiInsetShadow: {
    ...StyleSheet.absoluteFillObject,
  },
  hpiInsetText: {
    zIndex: 1,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 18,
    color: COLORS.TEXT_DARK,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  midActions: {
    marginTop: 24,
    gap: 12,
  },
  midRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  midCell: {
    flex: 1,
    minWidth: 0,
  },
  midBtnLabel: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  midBtnLabelOutlined: {
    color: COLORS.PRIMARY_DARK,
  },
  footerDock: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.TEXT_10,
  },
  footerBtnWrap: {
    flex: 1,
    minWidth: 0,
  },
  footerBtnLabel: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.PRIMARY_DARK,
  },
  footerEndLabel: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.ALERT,
  },
});
