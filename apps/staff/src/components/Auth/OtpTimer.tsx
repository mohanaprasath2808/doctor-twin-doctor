import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface OtpTimerProps {
  onResend?: () => void;
  initialSeconds?: number;
}

const OtpTimer: React.FC<OtpTimerProps> = ({ onResend, initialSeconds = 30 }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTimerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, seconds]);

  const handleResend = (): void => {
    if (!isTimerActive) {
      setSeconds(initialSeconds);
      setIsTimerActive(true);
      onResend?.();
    }
  };

  const formattedTime = `00:${String(seconds).padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      {isTimerActive && seconds > 0 ? (
        <Text style={styles.timerText}>
          You can resend OTP in <Text style={styles.timerSeconds}>{formattedTime}</Text>
        </Text>
      ) : (
        <View style={styles.resendRow} collapsable={false}>
          <Text style={styles.resendMuted}>{`Didn't get the code? `}</Text>
          <Pressable
            onPress={handleResend}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
            android_ripple={{ color: "rgba(22, 101, 52, 0.12)" }}
            style={({ pressed }) => [
              styles.resendPressable,
              Platform.OS === "ios" && pressed && styles.resendPressed,
            ]}
          >
            <Text style={styles.resendLink}>Resend OTP</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    // Android: keep this subtree above neighbors that use elevation / shadows so touches hit the link.
    zIndex: 1,
    ...Platform.select({
      android: { elevation: 6 },
      default: {},
    }),
  },
  timerText: {
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
  },
  timerSeconds: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  resendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  resendPressable: {
    alignSelf: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  resendPressed: {
    opacity: 0.65,
  },
  resendMuted: {
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
  },
  resendLink: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default OtpTimer;
