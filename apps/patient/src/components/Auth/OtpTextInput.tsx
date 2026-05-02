import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import InnerShadowView from "../../neomorphism/InnerShadowView";
import { COLORS } from "../../constants/theme";

interface OtpTextInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  onFilled?: (otp: string) => void;
}

const DIGITS = 4;
const CELL_SIZE = 54;
const CELL_RADIUS = CELL_SIZE / 2;

/** Same split as `InputField`. Decorative layers use opacity only — never mount/unmount around `TextInput` (fixes Android focus↔blur flicker). */
const GRADIENT_PAD = 0.6;
const INNER_SHADOW_DY = 4;
const INNER_SHADOW_BLUR = 5;
const INNER_FACE = CELL_SIZE - 2 * GRADIENT_PAD;
const INNER_FACE_RADIUS = INNER_FACE / 2;

/** Idle face matches NeumorphicCard (`COLORS.INNER_SURFACE`). */
const IDLE_GRADIENT = [
  "#E8EDF266",
  "#FFFFFFEE",
  COLORS.INNER_SURFACE,
  COLORS.INNER_SURFACE,
] as const;
const IDLE_LOCATIONS = [0, 0.35, 0.72, 1] as const;
const FOCUSED_GRADIENT = ["#D6E3F399", "#FFFFFFCC", "#FFFFFF80", "#FFFFFF00"] as const;
const FOCUSED_LOCATIONS = [0, 0.4, 0.7, 1] as const;

const OtpTextInput: React.FC<OtpTextInputProps> = ({ otp, setOtp, onFilled }) => {
  const [values, setValues] = useState<string[]>(Array(DIGITS).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const next = Array(DIGITS)
      .fill("")
      .map((_, i) => otp[i] ?? "");
    setValues(next);
  }, [otp]);

  const handleChange = (text: string, index: number) => {
    const char = text.replace(/\D/g, "").slice(-1);
    const nextValues = [...values];
    nextValues[index] = char;
    setValues(nextValues);

    const joined = nextValues.join("");
    setOtp(joined);
    if (joined.length === DIGITS && onFilled) {
      onFilled(joined);
    }

    if (char && index < DIGITS - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const cells = Array.from({ length: DIGITS }).map((_, index) => {
    const hasDigit = Boolean(values[index]?.trim());
    const isFocused = focusedIndex === index;
    const showFocusedState = isFocused || hasDigit;

    return (
      <View key={index} style={styles.cellOuter}>
        {/* Idle “lift” — iOS shadow only; Android uses stable `cellOuter` elevation (below). */}
        <View
          pointerEvents="none"
          style={[
            styles.idleLiftLayer,
            { borderRadius: CELL_RADIUS },
            { opacity: showFocusedState ? 0 : 1 },
          ]}
        />

        <LinearGradient
          colors={showFocusedState ? [...FOCUSED_GRADIENT] : [...IDLE_GRADIENT]}
          locations={showFocusedState ? [...FOCUSED_LOCATIONS] : [...IDLE_LOCATIONS]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientBorder, { borderRadius: CELL_RADIUS }]}
        >
          <View style={[styles.innerWrapper, { borderRadius: CELL_RADIUS }]}>
            <View
              pointerEvents="none"
              style={[
                styles.shadowLayer,
                styles.shadowDark,
                { borderRadius: CELL_RADIUS },
                styles.shadowDarkFocused,
                layerOpacity(showFocusedState),
              ]}
            />
            <View
              pointerEvents="none"
              style={[
                styles.shadowLayer,
                styles.shadowLight,
                { borderRadius: CELL_RADIUS },
                styles.shadowLightFocused,
                layerOpacity(showFocusedState),
              ]}
            />
            <View
              pointerEvents="none"
              style={[
                styles.shadowLayer,
                styles.shadowSoft,
                { borderRadius: CELL_RADIUS },
                layerOpacity(showFocusedState),
              ]}
            />

            <View style={[styles.surface, { borderRadius: CELL_RADIUS }]}>
              <View
                pointerEvents="none"
                style={[
                  styles.shadowWrapper,
                  { borderRadius: CELL_RADIUS },
                  layerOpacity(showFocusedState),
                ]}
              >
                <InnerShadowView
                  width={INNER_FACE}
                  height={INNER_FACE}
                  borderRadius={INNER_FACE_RADIUS}
                  color="#FFFFFF"
                  darkShadowDy={INNER_SHADOW_DY}
                  darkShadowBlur={INNER_SHADOW_BLUR}
                  lightShadowDy={-INNER_SHADOW_DY}
                  lightShadowBlur={INNER_SHADOW_BLUR}
                />
              </View>

              <View
                style={[styles.inputWrapper, { borderRadius: CELL_RADIUS }]}
                collapsable={false}
              >
                <TextInput
                  ref={(ref) => {
                    inputsRef.current[index] = ref;
                  }}
                  style={styles.input}
                  value={values[index]}
                  onChangeText={(text) => handleChange(text, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex((f) => (f === index ? null : f))}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  placeholder=""
                  selectionColor={COLORS.TEXT_PRIMARY}
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  });

  return <View style={styles.container}>{cells}</View>;
};

function layerOpacity(showFocusedState: boolean) {
  return showFocusedState ? styles.layerVisible : styles.layerHidden;
}

export default OtpTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    overflow: "visible",
  },
  cellOuter: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_RADIUS,
    overflow: "visible",
    position: "relative",
    /** Stable elevation — never tied to focus (prevents native relayout stealing focus). */
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  idleLiftLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.INNER_SURFACE,
    zIndex: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
    }),
  },
  gradientBorder: {
    width: "100%",
    height: "100%",
    padding: GRADIENT_PAD,
    overflow: "hidden",
    zIndex: 1,
  },
  innerWrapper: {
    flex: 1,
    overflow: "visible",
  },
  layerVisible: {
    opacity: 1,
  },
  layerHidden: {
    opacity: 0,
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FAFAFA",
  },
  /** Inner rings: iOS shadows only — Android elevation here fights opacity hiding + focus stability. */
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  shadowDarkFocused: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
    }),
  },
  shadowLightFocused: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.45,
        shadowRadius: 6,
      },
    }),
  },
  surface: {
    flex: 1,
    overflow: "hidden",
  },
  shadowWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
  },
});
