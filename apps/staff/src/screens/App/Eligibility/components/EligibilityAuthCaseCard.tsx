import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../../../../components/Common/AppButton";
import InnerShadowPill from "../../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../../constants/theme";
import {
  CASE_CARD_INNER,
  ELIGIBILITY_CARD_RADIUS,
  ESCALATE_CORAL,
  ESCALATE_FILL,
  SUBMIT_FILL_FALLBACK,
  SUBMIT_GRADIENT,
} from "../eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as styles } from "../eligibilityPriorAuthStyles";
import type { AuthCaseRow } from "../eligibilityPriorAuthTypes";

const ACTION_BTN_HEIGHT = 35;

function InfoWell({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.infoWellShell}>
      <View style={styles.infoWellForeground}>{children}</View>
    </View>
  );
}

export default function EligibilityAuthCaseCard({
  row,
  onSubmit,
  onRequest,
  onEscalate,
}: {
  row: AuthCaseRow;
  onSubmit?: () => void;
  onRequest?: () => void;
  onEscalate?: () => void;
}) {
  return (
    <NeumorphicCard
      borderRadius={ELIGIBILITY_CARD_RADIUS}
      backgroundColor={CASE_CARD_INNER}
      suppressInsetShadows
      outerStyle={styles.caseCardOuterLift}
      innerStyle={[styles.caseCardInner, styles.caseCardInnerOverflow]}
      activeOpacity={1}
    >
      <Pressable style={styles.caseHeader} onPress={() => {}}>
        <Image source={row.avatar} style={styles.caseAvatar} />
        <View style={styles.caseHeaderCenter}>
          <Text style={styles.caseStatusTitle} numberOfLines={2}>
            {row.statusTitle}
          </Text>
          <Text style={styles.casePatientLine} numberOfLines={1}>
            {row.patientName} • Age {row.age}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.TEXT_40} />
      </Pressable>

      <View style={styles.divider} />

      <View style={styles.twoCol}>
        <InfoWell>
          <View style={styles.infoWellLabelRow}>
            <Text style={styles.infoWellLabelInline} numberOfLines={1}>
              {row.coverageLabel}
            </Text>
            <InnerShadowPill label={row.coveragePill} tone={row.coveragePillTone} subtleOuterGlow />
          </View>
          <Text style={styles.infoWellDetailBold} numberOfLines={2}>
            {row.coverageDetail}
          </Text>
        </InfoWell>
        <InfoWell>
          <View style={styles.infoWellLabelRow}>
            <Text style={styles.infoWellLabelInline} numberOfLines={1}>
              {row.missingLabel}
            </Text>
            <InnerShadowPill label={row.missingPill} tone={row.missingPillTone} subtleOuterGlow />
          </View>
          <Text style={styles.infoWellDetailBold} numberOfLines={2}>
            {row.missingDetail}
          </Text>
        </InfoWell>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.actionBtnWrap}>
          <ReusableButton
            title="Submit"
            height={ACTION_BTN_HEIGHT}
            borderRadius={22}
            width="100%"
            gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
            gradientPositions={[0.125, 1]}
            softFillShade
            ctaGlow
            backgroundColor={SUBMIT_FILL_FALLBACK}
            textStyle={styles.submitBtnText}
            onPress={() => onSubmit?.()}
          />
        </View>
        <View style={styles.actionBtnWrap}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={ACTION_BTN_HEIGHT}
            borderRadius={22}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.WHITE}
            text="Request"
            textStyle={styles.outlineGreenTextAuth}
            shadowStyle={styles.outlineBtnNoShadow}
            onPress={() => onRequest?.()}
          />
        </View>
        <View style={styles.actionBtnWrap}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={ACTION_BTN_HEIGHT}
            borderRadius={22}
            borderWidth={1}
            borderColor={ESCALATE_CORAL}
            bgColor={ESCALATE_FILL}
            text="Escalate"
            textStyle={styles.outlineCoralText}
            shadowStyle={styles.outlineBtnNoShadow}
            onPress={() => onEscalate?.()}
          />
        </View>
      </View>
    </NeumorphicCard>
  );
}
