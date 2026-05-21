import React, { useCallback, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import InsuranceBottomSheetModal from "../../../components/BottomSheets/App/InsuranceBottomSheetModal";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import InputField from "../../../neomorphism/InputField";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import ProfileIcon from "../../../assets/icons/firstName.svg";
import UploadIcon from "../../../assets/icons/uploadIcon.svg";
import WarningIcon from "../../../assets/icons/yellowWarningIcon.svg";

const PLAN_CHIP_WIDTH = 74;
const PLAN_CHIP_HEIGHT = 40;

/** Staff “need update” flow — contextual copy next to each field. */
const UPDATE_FLOW_HINTS = {
  insuranceProvider: "Select proper insurance provider",
  memberId: "Enter proper member ID",
  groupNumber: "Enter proper group number",
  subscriberInfo: "Enter correct subscriber information",
  cardFront: "Upload proper insurance card",
  cardBack: "Upload proper insurance card",
  pcp: "Enter proper primary care physician",
} as const;

type LabelVariant = "sectionFirst" | "sectionSubsequent" | "upload" | "planTitle";

const InsuranceFieldLabel = ({
  title,
  variant,
  showHint,
  hint,
}: {
  title: string;
  variant: LabelVariant;
  showHint: boolean;
  hint?: string;
}) => {
  const titleStyle =
    variant === "sectionFirst"
      ? styles.fieldLabelFirst
      : variant === "sectionSubsequent"
        ? styles.fieldLabel
        : variant === "upload"
          ? styles.uploadLabelPlain
          : styles.planSectionTitle;

  if (!showHint || !hint) {
    if (variant === "upload") {
      return <Text style={styles.uploadLabel}>{title}</Text>;
    }
    return <Text style={titleStyle}>{title}</Text>;
  }

  const rowGapStyle =
    variant === "sectionSubsequent" || variant === "upload"
      ? styles.labelHintRowAfterGap
      : undefined;

  return (
    <View
      style={[styles.labelHintRow, rowGapStyle, variant === "upload" && styles.uploadLabelHintRow]}
    >
      <Text
        style={[
          titleStyle,
          styles.labelHintTitleShrink,
          variant === "sectionSubsequent" && styles.labelFlushTopInHintRow,
        ]}
      >
        {title}
      </Text>
      <View style={styles.hintChip}>
        <WarningIcon width={14} height={14} />
        <Text style={styles.hintText}>{hint}</Text>
      </View>
    </View>
  );
};

type PlanKind = "hmo" | "ppo";

const PlanTypeChip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) =>
  selected ? (
    <View style={styles.planChipHalf}>
      <ReusableButton
        title={label}
        gradientColors={["#3F97B2", "#14B8D4"]}
        borderGradientColors={["#D6E3F3", "#FFFFFF"]}
        onPress={onPress}
        width={PLAN_CHIP_WIDTH}
        height={PLAN_CHIP_HEIGHT}
        borderRadius={20}
        backgroundColor="#14B8D4"
        textStyle={styles.planChipTextSelected}
      />
    </View>
  ) : (
    <Pressable style={styles.planChipHalf} onPress={onPress}>
      <NeumorphicCard
        outerStyle={styles.planNeuOuter}
        innerStyle={styles.planNeuInner}
        borderRadius={20}
      >
        <Text style={styles.planChipTextInactive}>{label}</Text>
      </NeumorphicCard>
    </Pressable>
  );

/** Optional params for `navigationStrings.ADD_NEW_INSURANCE`. */
export type AddNewInsuranceParams = {
  update?: boolean;
};

const AddNewInsurance = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const isUpdateFlow = Boolean((route.params as AddNewInsuranceParams | undefined)?.update);
  const insuranceSheetRef = useRef<BottomSheetModal>(null);

  const [messageText, setMessageText] = useState("");
  const [provider, setProvider] = useState("");
  const [memberId, setMemberId] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [subscriberInfo, setSubscriberInfo] = useState("");
  const [planType, setPlanType] = useState<PlanKind>("hmo");
  const [pcp, setPcp] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (!isUpdateFlow) return;
      setMessageText("");
      setProvider("");
      setMemberId("");
      setGroupNumber("");
      setSubscriberInfo("");
      setPlanType("hmo");
      setPcp("");
    }, [isUpdateFlow]),
  );

  const providerDisplay = provider.trim() === "" ? "" : provider;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>
              {isUpdateFlow ? "Update Insurance" : "Add New Insurance"}
            </Text>
            <View style={styles.notifWrap}>
              <IconComponent
                icon={<NotificationIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
              />
              <View style={styles.notifDot} />
            </View>
          </View>

          {isUpdateFlow ? (
            <NeumorphicCard
              outerStyle={styles.updateMessageCardOuter}
              innerStyle={styles.updateMessageCardInner}
              borderRadius={12}
            >
              <Text style={styles.updateMessageCardTitle}>Message</Text>
              <InputField
                value={messageText}
                onChangeText={setMessageText}
                placeholder="Message"
                borderRadius={10}
                height={48}
                containerStyle={styles.fieldTight}
              />
            </NeumorphicCard>
          ) : null}

          <View style={styles.section}>
            <InsuranceFieldLabel
              title="Insurance Provider"
              variant="sectionFirst"
              showHint={isUpdateFlow}
              hint={UPDATE_FLOW_HINTS.insuranceProvider}
            />
            <Pressable
              onPress={() => insuranceSheetRef.current?.present()}
              style={({ pressed }) => [
                styles.dropdownPress,
                pressed && styles.dropdownPressPressed,
              ]}
            >
              <View pointerEvents="none">
                <InputField
                  value={providerDisplay}
                  editable={false}
                  placeholder="Select Provider"
                  leftIcon={<ProfileIcon width={18} height={18} />}
                  rightIcon={<DropDownIcon width={10} height={10} />}
                  onRightIconPress={() => insuranceSheetRef.current?.present()}
                  containerStyle={styles.fieldTight}
                  borderRadius={64}
                  height={46}
                />
              </View>
            </Pressable>
          </View>

          <View style={styles.section}>
            <InsuranceFieldLabel
              title="Member ID"
              variant="sectionFirst"
              showHint={isUpdateFlow}
              hint={UPDATE_FLOW_HINTS.memberId}
            />
            <InputField
              value={memberId}
              onChangeText={setMemberId}
              placeholder="Enter Member ID"
              containerStyle={styles.fieldTight}
              borderRadius={64}
              height={46}
            />
            <InsuranceFieldLabel
              title="Group Number"
              variant="sectionSubsequent"
              showHint={isUpdateFlow}
              hint={UPDATE_FLOW_HINTS.groupNumber}
            />
            <InputField
              value={groupNumber}
              onChangeText={setGroupNumber}
              placeholder="Enter group number"
              containerStyle={styles.fieldTight}
              borderRadius={64}
              height={46}
            />
          </View>

          <View style={styles.section}>
            <InsuranceFieldLabel
              title="Subscriber info"
              variant="sectionFirst"
              showHint={isUpdateFlow}
              hint={UPDATE_FLOW_HINTS.subscriberInfo}
            />
            <InputField
              value={subscriberInfo}
              onChangeText={setSubscriberInfo}
              placeholder="Enter Subscriber info"
              multiline
              numberOfLines={5}
              minHeight={120}
              borderRadius={14}
              containerStyle={styles.fieldTight}
            />
          </View>

          {isUpdateFlow ? (
            <InsuranceFieldLabel
              title="Insurance Card (Front)"
              variant="upload"
              showHint
              hint={UPDATE_FLOW_HINTS.cardFront}
            />
          ) : (
            <Text style={styles.uploadLabel}>Insurance Card (Front)</Text>
          )}
          <TouchableOpacity activeOpacity={0.9} style={styles.uploadTouchable}>
            <NeumorphicCard
              outerStyle={styles.uploadCardOuter}
              innerStyle={styles.uploadCardInner}
              borderRadius={10}
            >
              <UploadIcon width={20} height={20} />
              <Text style={styles.uploadHint}>Upload document</Text>
              <AppButton
                text="Upload"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                width={70}
                height={28}
                borderRadius={60}
                textStyle={styles.uploadBtnText}
                onPress={() => undefined}
              />
            </NeumorphicCard>
          </TouchableOpacity>

          {isUpdateFlow ? (
            <InsuranceFieldLabel
              title="Insurance Card (Back)"
              variant="upload"
              showHint
              hint={UPDATE_FLOW_HINTS.cardBack}
            />
          ) : (
            <Text style={styles.uploadLabel}>Insurance Card (Back)</Text>
          )}
          <TouchableOpacity activeOpacity={0.9} style={styles.uploadTouchable}>
            <NeumorphicCard
              outerStyle={styles.uploadCardOuter}
              innerStyle={styles.uploadCardInner}
              borderRadius={10}
            >
              <UploadIcon width={20} height={20} />
              <Text style={styles.uploadHint}>Upload document</Text>
              <AppButton
                text="Upload"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                width={70}
                height={28}
                borderRadius={60}
                textStyle={styles.uploadBtnText}
                onPress={() => undefined}
              />
            </NeumorphicCard>
          </TouchableOpacity>

          <NeumorphicCard
            outerStyle={styles.planCardOuter}
            innerStyle={styles.planCardInner}
            borderRadius={10}
          >
            <Text style={styles.planTitle}>Plan type</Text>
            <View style={styles.planRow}>
              <PlanTypeChip
                label="HMO"
                selected={planType === "hmo"}
                onPress={() => setPlanType("hmo")}
              />
              <PlanTypeChip
                label="PPO"
                selected={planType === "ppo"}
                onPress={() => setPlanType("ppo")}
              />
            </View>
            {planType === "hmo" ? (
              <>
                <InsuranceFieldLabel
                  title="PCP"
                  variant="sectionSubsequent"
                  showHint={isUpdateFlow}
                  hint={UPDATE_FLOW_HINTS.pcp}
                />
                <InputField
                  value={pcp}
                  onChangeText={setPcp}
                  placeholder="Enter PCP"
                  containerStyle={styles.fieldTight}
                  borderRadius={64}
                  height={46}
                />
              </>
            ) : null}
          </NeumorphicCard>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <ReusableButton
            title={isUpdateFlow ? "Update" : "Save"}
            height={48}
            borderRadius={64}
            width="100%"
            onPress={() => undefined}
            textStyle={styles.saveBtnText}
          />
        </View>
      </View>

      <InsuranceBottomSheetModal
        ref={insuranceSheetRef}
        title="Select Insurance"
        selectedValue={provider}
        onSelectDone={(v) => setProvider(v)}
      />
    </SafeAreaView>
  );
};

export default AddNewInsurance;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  section: {
    marginTop: 20,
    width: "100%",
  },
  planCardOuter: {
    marginTop: 20,
    width: "100%",
  },
  planCardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  fieldLabelFirst: {
    marginTop: 0,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  fieldLabel: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  uploadLabel: {
    marginTop: 20,
    marginBottom: 2,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
    alignSelf: "stretch",
  },
  dropdownPress: {
    borderRadius: 64,
  },
  dropdownPressPressed: {
    opacity: 0.92,
  },
  fieldTight: {
    marginTop: 2,
    marginBottom: 0,
  },
  uploadTouchable: {
    alignSelf: "stretch",
  },
  uploadCardOuter: {
    width: "100%",
    marginTop: 2,
  },
  uploadCardInner: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 14,
    /** Allow `AppButton` neumorphic shadow to extend past the card face (`NeumorphicCard` inner defaults to `overflow: 'hidden'`). */
    overflow: "visible",
  },
  uploadHint: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  uploadBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  planSectionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  planRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  planChipHalf: {
    width: PLAN_CHIP_WIDTH,
  },
  planNeuOuter: {
    width: PLAN_CHIP_WIDTH,
  },
  planNeuInner: {
    height: PLAN_CHIP_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  planChipTextInactive: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Text-Regular",
  },
  planChipTextSelected: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
  /** `fieldLabel` includes `marginTop`; inside the hint row the row handles spacing. */
  labelFlushTopInHintRow: {
    marginTop: 0,
  },
  updateMessageCardOuter: {
    marginTop: 20,
    width: "100%",
  },
  updateMessageCardInner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  labelHintRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    alignSelf: "stretch",
    marginBottom: 3,
  },
  labelHintRowAfterGap: {
    marginTop: 20,
  },
  uploadLabelHintRow: {
    marginTop: 20,
    marginBottom: 2,
  },
  labelHintTitleShrink: {
    flexShrink: 1,
  },
  hintChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  hintText: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.ESCALATION,
    fontFamily: "SF-Pro-Text-Medium",
  },
  warningGlyph: {
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.ESCALATION,
  },
  uploadLabelPlain: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.WHITE,
  },
  updateMessageCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
