import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import AppButton from "./AppButton";
import NeumorphicCard from "./NeumorphicCard";
import { COLORS } from "../../constants/theme";
import { TEXT } from "../../constants/typography";
import UploadIcon from "../../assets/icons/uploadIcon.svg";

export type DocumentUploadFieldProps = {
  label?: string;
  hint?: string;
  buttonText?: string;
  onUploadPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const DocumentUploadField = ({
  label = "Document",
  hint = "Upload document",
  buttonText = "Upload",
  onUploadPress,
  containerStyle,
}: DocumentUploadFieldProps) => (
  <View style={[styles.wrap, containerStyle]}>
    <Text style={styles.label}>{label}</Text>
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
      <UploadIcon width={22} height={22} />
      <Text style={styles.hint}>{hint}</Text>
      <AppButton
        text={buttonText}
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        width={70}
        height={28}
        borderRadius={17}
        textStyle={styles.uploadBtnText}
        onPress={onUploadPress}
      />
    </NeumorphicCard>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    minHeight: 112,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 8,
  },
  hint: {
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  uploadBtnText: {
    ...TEXT.body,
    color: COLORS.PRIMARY,
  },
});

export default DocumentUploadField;
