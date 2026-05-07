import React, { useState } from "react";
import { LayoutChangeEvent, Platform, StyleSheet, Text, View } from "react-native";
import type { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import InnerShadowView from "./InnerShadowView";
import { COLORS } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

export type NeomorphicToastVariant = "success" | "warning" | "danger";

const VARIANT = {
  success: {
    innerBg: COLORS.TOAST_SUCCESS_BG,
    borderGradientTop: ["rgba(16, 185, 129, 0.55)", "rgba(214, 227, 243, 0.35)"] as [
      string,
      string,
    ],
    borderGradientBottom: ["#FFFFFF", "rgba(255, 255, 255, 0)"] as [string, string],
    textColor: "#065F46",
    innerShadowSurface: "#E8F8EF",
  },
  warning: {
    innerBg: COLORS.TOAST_WARNING_BG,
    borderGradientTop: ["rgba(238, 182, 33, 0.65)", "rgba(255, 244, 214, 0.6)"] as [string, string],
    borderGradientBottom: ["#FFFFFF", "rgba(255, 255, 255, 0)"] as [string, string],
    textColor: "#92400E",
    innerShadowSurface: COLORS.PRIMARY,
  },
  danger: {
    innerBg: COLORS.TOAST_ERROR_BG,
    borderGradientTop: ["rgba(255, 107, 107, 0.65)", "rgba(253, 236, 236, 0.75)"] as [
      string,
      string,
    ],
    borderGradientBottom: ["#FFFFFF", "rgba(255, 255, 255, 0)"] as [string, string],
    textColor: "#991B1B",
    innerShadowSurface: COLORS.ALERT,
  },
} as const;

type Props = {
  toast: ToastProps;
  variant: NeomorphicToastVariant;
};

const NeomorphicToast = ({ toast, variant }: Props) => {
  const cfg = VARIANT[variant];
  const [box, setBox] = useState({ width: 0, height: 0 });
  const borderRadius = 14;
  const innerRadius = Math.max(0, borderRadius - 1);

  const onInnerLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setBox((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    }
  };

  const messageContent =
    typeof toast.message === "string" ? (
      <Text style={[styles.message, { color: cfg.textColor }]} allowFontScaling={false}>
        {toast.message}
      </Text>
    ) : (
      toast.message
    );

  return (
    <View pointerEvents="box-none" style={styles.marginWrap}>
      <View style={[styles.outer, { borderRadius }]}>
        <View
          pointerEvents="none"
          style={[
            styles.shadowLayer,
            styles.shadowDark,
            { borderRadius, backgroundColor: cfg.innerBg },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.shadowLayer,
            styles.shadowLight,
            { borderRadius, backgroundColor: cfg.innerBg },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.shadowLayer,
            styles.shadowSoft,
            { borderRadius, backgroundColor: cfg.innerBg },
          ]}
        />

        <View style={[styles.border, { borderRadius }]}>
          <LinearGradient
            colors={cfg.borderGradientTop}
            locations={[0.082, 0.8268]}
            start={{ x: 1, y: 0.465 }}
            end={{ x: 0, y: 0.535 }}
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={cfg.borderGradientBottom}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />

          <View
            style={[styles.inner, { borderRadius: innerRadius, backgroundColor: cfg.innerBg }]}
            onLayout={onInnerLayout}
          >
            {box.width > 0 && box.height > 0 && (
              <View
                pointerEvents="none"
                style={[
                  styles.innerShadowWrap,
                  {
                    width: box.width,
                    height: box.height,
                    borderRadius: innerRadius,
                  },
                ]}
              >
                <InnerShadowView
                  width={box.width}
                  height={box.height}
                  borderRadius={innerRadius}
                  color={cfg.innerShadowSurface}
                />
              </View>
            )}
            <View style={styles.content}>{messageContent}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginWrap: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  outer: {
    position: "relative",
    overflow: "visible",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  border: {
    zIndex: 1,
    padding: 1,
    overflow: "hidden",
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 14,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
    }),
  },
  inner: {
    overflow: "hidden",
    position: "relative",
  },
  innerShadowWrap: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 0,
  },
  content: {
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  message: {
    fontSize: 14,
    fontFamily: "SF-Pro-Display-Medium",
    lineHeight: 20,
  },
});

export default NeomorphicToast;
