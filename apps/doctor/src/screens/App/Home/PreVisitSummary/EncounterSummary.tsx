import React, { useCallback, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import PharmacyIcon from "../../../../assets/icon/pharmacyIcon.svg";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InnerShadowView from "../../../../neomorphism/InnerShadowView";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const INTRO = "Here's a summary of this visit.";

const INSET_RADIUS = 10;

type BulletSection = { id: string; title: string; lines: string[] };

const BULLET_SECTIONS: BulletSection[] = [
  {
    id: "notes",
    title: "Notes",
    lines: ["Chest pain on exertion", "Hypertension uncontrolled"],
  },
  {
    id: "diagnoses",
    title: "Diagnoses",
    lines: ["Angina (suspected)", "Hypertension"],
  },
  {
    id: "orders",
    title: "Orders",
    lines: ["Lipid panel", "ECG"],
  },
];

type PrescriptionRow = { id: string; name: string; detail: string };

const PRESCRIPTIONS: PrescriptionRow[] = [
  { id: "rx-1", name: "Atorvastatin", detail: "20 mg daily" },
];

type FollowUpRow = { id: string; text: string };

const FOLLOW_UP_ROWS: FollowUpRow[] = [
  { id: "fu-1", text: "Cardiology referral" },
  { id: "fu-2", text: "Follow-up in 2 weeks" },
];

function InsetBulletList({ lines }: { lines: string[] }) {
  const [insetSize, setInsetSize] = useState({ w: 0, h: 0 });

  const onInsetLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setInsetSize((prev) =>
      prev.w === width && prev.h === height ? prev : { w: width, h: height },
    );
  }, []);

  const renderBullet: ListRenderItem<string> = useCallback(
    ({ item }) => <Text style={styles.bulletLine}>• {item}</Text>,
    [],
  );

  return (
    <View style={styles.insetShell} onLayout={onInsetLayout}>
      {insetSize.w > 0 && insetSize.h > 0 ? (
        <View style={styles.insetShadowLayer} pointerEvents="none">
          <InnerShadowView
            width={insetSize.w}
            height={insetSize.h}
            borderRadius={INSET_RADIUS}
            color={COLORS.SURFACE}
          />
        </View>
      ) : null}
      <View style={styles.insetListLayer}>
        <FlatList
          data={lines}
          keyExtractor={(item, index) => `${index}-${item}`}
          scrollEnabled={false}
          renderItem={renderBullet}
          ItemSeparatorComponent={BulletSeparator}
        />
      </View>
    </View>
  );
}

function BulletSeparator() {
  return <View style={styles.bulletSep} />;
}

const EncounterSummary = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const renderBulletSection: ListRenderItem<BulletSection> = useCallback(
    ({ item }) => (
      <View style={styles.sectionWrap}>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <InsetBulletList lines={item.lines} />
        </NeumorphicCard>
      </View>
    ),
    [],
  );

  const renderPrescription: ListRenderItem<PrescriptionRow> = useCallback(
    ({ item }) => (
      <View style={styles.rxRow}>
        <View style={styles.iconShadowSlot}>
          <InnerShadowIcon size={40} radius={20} icon={<PharmacyIcon width={18} height={18} />} />
        </View>
        <View style={styles.rxTextCol}>
          <Text style={styles.rxName}>{item.name}</Text>
          <Text style={styles.rxDetail}>{item.detail}</Text>
        </View>
      </View>
    ),
    [],
  );

  const renderFollowUp: ListRenderItem<FollowUpRow> = useCallback(
    ({ item }) => (
      <View style={styles.followRow}>
        <View style={styles.iconShadowSlot}>
          <InnerShadowIcon size={40} radius={20} icon={<CalendarIcon width={18} height={18} />} />
        </View>
        <Text style={styles.followText}>{item.text}</Text>
      </View>
    ),
    [],
  );

  const followSeparator = useCallback(() => <View style={styles.followDivider} />, []);

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
            <IconComponent
              icon={<BackIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Encounter Summary</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatar}
            wrapperStyle={styles.heroWrapper}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />

          <Text style={styles.intro}>{INTRO}</Text>

          <FlatList
            data={BULLET_SECTIONS}
            keyExtractor={(s) => s.id}
            scrollEnabled={false}
            renderItem={renderBulletSection}
          />

          <View style={styles.sectionWrap}>
            <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
              <Text style={styles.cardTitle}>Prescriptions</Text>
              <FlatList
                data={PRESCRIPTIONS}
                keyExtractor={(p) => p.id}
                scrollEnabled={false}
                renderItem={renderPrescription}
                ItemSeparatorComponent={() => <View style={styles.rxSep} />}
              />
            </NeumorphicCard>
          </View>

          <View style={styles.sectionWrap}>
            <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
              <Text style={styles.cardTitle}>Follow-up in 2 weeks</Text>
              <FlatList
                data={FOLLOW_UP_ROWS}
                keyExtractor={(r) => r.id}
                scrollEnabled={false}
                renderItem={renderFollowUp}
                ItemSeparatorComponent={followSeparator}
              />
            </NeumorphicCard>
          </View>

          <View style={{ height: bottomPad + 88 }} />
        </ScrollView>

        <View style={[styles.footerDock, { paddingBottom: bottomPad }]}>
          <View style={styles.footerBtnWrap}>
            <AppButton
              text="Edit"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={[styles.editLabel, styles.editLabelColor]}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.footerBtnWrap}>
            <ReusableButton
              title="Sign & Submit"
              height={52}
              borderRadius={26}
              containerStyle={styles.signBtn}
              onPress={() => navigation.navigate(navigationStrings.ENCOUNTER_COMPLETED)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EncounterSummary;

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
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
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
  intro: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    paddingHorizontal: 8,
    fontFamily: "SF-Pro-Display-Medium",
  },
  sectionWrap: {
    marginTop: 16,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
  },
  insetShell: {
    width: "100%",
    borderRadius: INSET_RADIUS,
    overflow: "hidden",
  },
  insetShadowLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  insetListLayer: {
    zIndex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bulletLine: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: COLORS.TEXT_DARK,
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  bulletSep: {
    height: 8,
  },
  iconShadowSlot: {
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
  },
  rxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rxTextCol: {
    flex: 1,
  },
  rxName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  rxDetail: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  rxSep: {
    height: 14,
  },
  followRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  followText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
  },
  followDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 12,
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
  editLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  editLabelColor: {
    color: COLORS.PRIMARY_DARK,
  },
  signBtn: {},
});
