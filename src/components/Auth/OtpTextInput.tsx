import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/theme';
import InnerShadowView from '../../neomorphism/InnerShadowView';

interface OtpTextInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  onFilled?: (otp: string) => void;
}

const DIGITS = 4;
const CELL_SIZE = 54;
const CELL_RADIUS = CELL_SIZE / 2;

const OtpTextInput: React.FC<OtpTextInputProps> = ({
  otp,
  setOtp,
  onFilled,
}) => {
  const [values, setValues] = useState<string[]>(Array(DIGITS).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  // Sync internal state when external otp changes (e.g. reset)
  useEffect(() => {
    const next = Array(DIGITS)
      .fill('')
      .map((_, i) => otp[i] ?? '');
    setValues(next);
  }, [otp]);

  const handleChange = (text: string, index: number) => {
    const char = text.slice(-1);
    const nextValues = [...values];
    nextValues[index] = char;
    setValues(nextValues);

    const joined = nextValues.join('');
    setOtp(joined);
    if (joined.length === DIGITS && onFilled) {
      onFilled(joined);
    }

    // Auto-focus next
    if (char && index < DIGITS - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const cells = useMemo(
    () =>
      Array.from({ length: DIGITS }).map((_, index) => {
        const isFocused = focusedIndex === index;

        return (
          <View key={index} style={[styles.cell]}>
            <View
              pointerEvents="none"
              style={[
                styles.shadowLayer,
                styles.shadowDark,
                isFocused && styles.shadowDarkFocused,
              ]}
            />
            <View
              pointerEvents="none"
              style={[
                styles.shadowLayer,
                styles.shadowLight,
                isFocused && styles.shadowLightFocused,
              ]}
            />
            <View
              pointerEvents="none"
              style={[styles.shadowLayer, styles.shadowSoft]}
            />
            <LinearGradient
              colors={['#D6E3F3', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.border}
            >
              <View style={styles.surface}>
                <View
                  pointerEvents="none"
                  style={[
                    styles.innerShadowWrapper,
                    isFocused ? styles.show : styles.hide,
                  ]}
                >
                  <InnerShadowView
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    borderRadius={CELL_RADIUS}
                    color={COLORS.SURFACE}
                  />
                </View>
                <TextInput
                  ref={ref => {
                    inputsRef.current[index] = ref;
                  }}
                  style={styles.input}
                  value={values[index]}
                  onChangeText={text => handleChange(text, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => {}}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  placeholder=""
                  selectionColor={COLORS.PRIMARY}
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </View>
            </LinearGradient>
          </View>
        );
      }),
    [focusedIndex, values],
  );

  return <View style={styles.container}>{cells}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 16,
    overflow: 'visible',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_RADIUS,
    borderWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CELL_RADIUS,
    backgroundColor: COLORS.SURFACE,
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: '#C8CBCC',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: '#FFFFFF',
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: '#728EAB',
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
      android: {
        elevation: 2,
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
  innerShadowWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_RADIUS,
  },
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  border: {
    width: '100%',
    height: '100%',
    borderRadius: CELL_RADIUS,
    padding: 1,
  },
  surface: {
    flex: 1,
    borderRadius: CELL_RADIUS - 1,
    backgroundColor: COLORS.SURFACE, // #F7FBFF
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.PRIMARY,
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
});

export default OtpTextInput;
