import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../../assets/icon/backArrow.svg";
import IconComponent from "../../../../components/neomorphism/IconComponent";
import {
  HEADER_ICON_CIRCLE,
  HEADER_ICON_GLYPH,
  HEADER_TOP_FROM_SCREEN,
} from "../eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as styles } from "../eligibilityPriorAuthStyles";

type EligibilityScreenHeaderProps = {
  title: string;
  onBack: () => void;
  rightSlot?: React.ReactNode;
};

export default function EligibilityScreenHeader({
  title,
  onBack,
  rightSlot,
}: EligibilityScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const headerTopPad = Math.max(0, HEADER_TOP_FROM_SCREEN - insets.top);

  return (
    <View style={[styles.headerBar, { paddingTop: headerTopPad }]}>
      <IconComponent
        icon={<BackArrowIcon width={HEADER_ICON_GLYPH} height={HEADER_ICON_GLYPH} />}
        width={HEADER_ICON_CIRCLE}
        height={HEADER_ICON_CIRCLE}
        radius={HEADER_ICON_CIRCLE / 2}
        onPress={onBack}
      />
      {rightSlot ?? <View style={styles.headerSpacer} />}
      <View style={styles.headerTitleOverlay} pointerEvents="none">
        <Text
          style={styles.headerTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
          maxFontSizeMultiplier={1}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
