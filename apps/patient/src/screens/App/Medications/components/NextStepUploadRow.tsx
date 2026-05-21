import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../../constants/theme";
import { TEXT } from "../../../../constants/typography";
import DownloadIcon from "../../../../assets/icons/downloadIcon.svg";

type NextStepUploadRowProps = {
  title: string;
  onUploadPress: () => void;
  outerStyle?: object;
};

const NextStepUploadRow = ({ title, onUploadPress, outerStyle }: NextStepUploadRowProps) => (
  <NeumorphicCard
    outerStyle={[styles.cardOuter, outerStyle]}
    innerStyle={styles.cardInner}
    borderRadius={10}
  >
    <InnerShadowIcon
      icon={<DownloadIcon width={18} height={18} transform={[{ rotate: "-180deg" }]} />}
      size={40}
      radius={20}
      surfaceColor={COLORS.INNER_SURFACE}
    />
    <Text style={styles.title}>{title}</Text>
    <AppButton
      text="Upload"
      borderWidth={1}
      borderColor={COLORS.PRIMARY}
      bgColor={COLORS.SURFACE}
      width={72}
      height={32}
      borderRadius={60}
      textStyle={styles.uploadBtnText}
      onPress={onUploadPress}
    />
  </NeumorphicCard>
);

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    flex: 1,
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  uploadBtnText: {
    ...TEXT.captionSemibold,
    color: COLORS.PRIMARY,
  },
});

export default NextStepUploadRow;
