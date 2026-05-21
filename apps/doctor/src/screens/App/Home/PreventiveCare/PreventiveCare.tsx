import React, { useCallback, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowView from "../../../../neomorphism/InnerShadowView";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const TERRY_PREFIX = "For Terry in room 3, ";

const CARD_SUMMARY_REST = "PPO insurance, schedule mammogram.";

const FOOTER_QUESTION_REST = "PPO insurance, shall I schedule a mammogram?";

const HMO_CHECK_LABEL = "For HMO patients, I will ask Jilda to submit requested referrals";

type PreventiveRow = {
  id: string;
  name: string;
  procedure: string;
  timeLabel: string;
  insurance: string;
};

const MOCK_ROWS: PreventiveRow[] = [
  {
    id: "1",
    name: "Emily Carter",
    procedure: "Colonoscopy",
    timeLabel: "08:55 AM",
    insurance: "PPO",
  },
  {
    id: "2",
    name: "James Wilson",
    procedure: "Flexible sigmoidoscopy",
    timeLabel: "09:20 AM",
    insurance: "Medicare",
  },
  {
    id: "3",
    name: "Rachel Adams",
    procedure: "Mammogram",
    timeLabel: "10:00 AM",
    insurance: "PPO",
  },
];

const BADGE_H = 28;
const BADGE_R = BADGE_H / 2;

function InsuranceBadge({ label }: { label: string }) {
  const [box, setBox] = useState({ w: 72, h: BADGE_H });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
  }, []);

  return (
    <View style={styles.badgeShell} onLayout={onLayout}>
      {box.w > 0 && box.h > 0 ? (
        <View style={styles.badgeShadow} pointerEvents="none">
          <InnerShadowView
            width={box.w}
            height={box.h}
            borderRadius={BADGE_R}
            color={COLORS.SURFACE}
          />
        </View>
      ) : null}
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const PreventiveCare = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [hmoReferrals, setHmoReferrals] = useState(false);

  const renderRow: ListRenderItem<PreventiveRow> = useCallback(
    ({ item }) => (
      <NeumorphicCard
        outerStyle={styles.rowCardOuter}
        innerStyle={styles.rowCardInner}
        borderRadius={12}
      >
        <View style={styles.rowMain}>
          <View style={styles.rowTextCol}>
            <Text style={styles.rowName}>{item.name}</Text>
            <Text style={styles.rowSub}>
              {item.procedure} • {item.timeLabel}
            </Text>
          </View>
          <InsuranceBadge label={item.insurance} />
        </View>
      </NeumorphicCard>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 8 }]}
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
          <Text style={styles.headerTitle}>Preventive Care</Text>
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

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
          <InsightMessageCard
            title="I've identified some preventive care needs for today, Dr. Soliman."
            subTitle="Shall I prepare the forms and requests to follow up?"
            bgColor="#E1F5FE"
            style={styles.messageCard}
            titleSubTitleGap={6}
          />
        </View>

        <NeumorphicCard
          clipInner={false}
          outerStyle={styles.mainCardOuter}
          innerStyle={styles.mainCardInner}
          borderRadius={14}
        >
          <Text style={styles.instruction}>
            <Text style={styles.instructionBold}>{TERRY_PREFIX}</Text>
            <Text style={styles.instructionMuted}>{CARD_SUMMARY_REST}</Text>
          </Text>
          <FlatList
            data={MOCK_ROWS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={renderRow}
            style={styles.list}
          />
        </NeumorphicCard>

        <Text style={styles.footerQuestion}>
          <Text style={styles.instructionBold}>{TERRY_PREFIX}</Text>
          <Text style={styles.instructionMuted}>{FOOTER_QUESTION_REST}</Text>
        </Text>

        <Pressable style={styles.checkRow} onPress={() => setHmoReferrals((v) => !v)}>
          <NeumorphicCheckboxMark selected={hmoReferrals} />
          <Text style={styles.checkLabel}>{HMO_CHECK_LABEL}</Text>
        </Pressable>

        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            <AppButton
              text="Cancel"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={[styles.outlineLabel, styles.outlineColor]}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.actionCell}>
            <ReusableButton
              title="Confirm"
              height={52}
              borderRadius={26}
              onPress={() => navigation.navigate(navigationStrings.ORDER_ENGINE)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreventiveCare;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
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
  messageRow: {
    marginTop: 18,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  messageCard: {
    flex: 1,
  },
  mainCardOuter: {
    width: "100%",
    marginTop: 20,
  },
  mainCardInner: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  instruction: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  instructionBold: {
    fontWeight: "700",
    color: "#333333",
  },
  instructionMuted: {
    fontWeight: "400",
    color: "#757575",
  },
  list: {
    overflow: "visible",
    marginTop: 2,
  },
  rowCardOuter: {
    width: "100%",
    marginVertical: 6,
  },
  rowCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rowMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTextCol: {
    flex: 1,
    minWidth: 0,
  },
  rowName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
  },
  rowSub: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  badgeShell: {
    minWidth: 56,
    paddingHorizontal: 12,
    height: BADGE_H,
    borderRadius: BADGE_R,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeShadow: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  footerQuestion: {
    marginTop: 22,
    fontSize: 15,
    lineHeight: 22,
  },
  checkRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
    marginTop: 28,
  },
  actionCell: {
    flex: 1,
    minWidth: 0,
  },
  outlineLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  outlineColor: {
    color: COLORS.PRIMARY_DARK,
  },
});
