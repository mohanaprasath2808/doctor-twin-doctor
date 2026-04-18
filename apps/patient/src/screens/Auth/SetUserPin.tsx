import React, { useRef, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import ReusableButton from "../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

const SetUserPin = () => {
  const navigation = useNavigation<any>();
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handlePinChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...pin];
    updated[index] = digit;
    setPin(updated);

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, key: string) => {
    if (key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LeftArrowIcon width={26} height={26} />
      </TouchableOpacity>

      <View style={styles.textBlock}>
        <Text style={styles.heading}>Set your User PIN</Text>
        <Text style={styles.subHeading}>Enter the 4-digit code to set your PIN</Text>
      </View>

      <View style={styles.pinRow}>
        {pin.map((digit, index) => (
          <View key={index} style={styles.pinItem}>
            <View style={styles.pinInnerShadow}>
              <InnerShadowView width={54} height={54} borderRadius={27} color="#F7FBFF" />
            </View>
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handlePinChange(index, text)}
              onKeyPress={({ nativeEvent }) => handleBackspace(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              style={styles.pinInput}
              selectionColor={COLORS.PRIMARY}
            />
          </View>
        ))}
      </View>

      <ReusableButton
        title="Continue"
        textColor="#FFFFFF"
        backgroundColor={COLORS.PRIMARY}
        containerStyle={styles.continueButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? 8 : 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  textBlock: {
    marginTop: 20,
    width: "100%",
    gap: 10,
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    letterSpacing: 0.64,
    color: COLORS.TEXT_PRIMARY,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  pinRow: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  pinItem: {
    width: 54,
    height: 54,
    borderRadius: 27,
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  pinInnerShadow: {
    position: "absolute",
    width: 54,
    height: 54,
  },
  pinInput: {
    width: 54,
    height: 54,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
  },
  continueButton: {
    marginTop: 40,
  },
});

export default SetUserPin;