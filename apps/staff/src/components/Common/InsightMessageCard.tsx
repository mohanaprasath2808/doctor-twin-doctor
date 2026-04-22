import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";

type InsightMessageCardProps = {
  /** If omitted or empty, only the subtitle is shown (full-width body text). */
  title?: string;
  subTitle: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  titleSubTitleGap?: number;
};

const InsightMessageCard: React.FC<InsightMessageCardProps> = ({
  title,
  subTitle,
  bgColor = "#CBF0FF",
  style,
  titleStyle,
  subTitleStyle,
  titleSubTitleGap = 6,
}) => {
  const showTitle = Boolean(title && title.trim().length > 0);

  return (
    <View style={[styles.outer, style]}>
      <View style={styles.border}>
        <LinearGradient
          colors={["rgba(214, 227, 243, 0.46)", "rgba(255, 255, 255, 0.46)"]}
          locations={[0.082, 0.8268]}
          start={{ x: 1, y: 0.465 }}
          end={{ x: 0, y: 0.535 }}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={["#FFFFFF", "rgba(255, 255, 255, 0)"]}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={[styles.inner, { backgroundColor: bgColor }]}>
          {showTitle ? (
            <Text style={[styles.heading, titleStyle]}>{title}</Text>
          ) : null}
          <Text
            style={[
              styles.sub,
              showTitle ? { marginTop: titleSubTitleGap } : { marginTop: 0 },
              subTitleStyle,
            ]}
          >
            {subTitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InsightMessageCard;

const BORDER_TOP_LEFT = 4;
const BORDER_OTHER = 20;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    minWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  border: {
    padding: 1,
    borderTopLeftRadius: BORDER_TOP_LEFT,
    borderTopRightRadius: BORDER_OTHER,
    borderBottomLeftRadius: BORDER_OTHER,
    borderBottomRightRadius: BORDER_OTHER,
    overflow: "hidden",
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: Math.max(0, BORDER_TOP_LEFT - 1),
    borderTopRightRadius: Math.max(0, BORDER_OTHER - 1),
    borderBottomLeftRadius: Math.max(0, BORDER_OTHER - 1),
    borderBottomRightRadius: Math.max(0, BORDER_OTHER - 1),
    overflow: "hidden",
  },
  heading: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  sub: {
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
  },
});
