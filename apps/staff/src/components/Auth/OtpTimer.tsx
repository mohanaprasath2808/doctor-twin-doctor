import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        <View style={styles.resendRow}>
          <Text style={styles.resendMuted}>{`Didn't get the code? `}</Text>
          <TouchableOpacity
            onPress={handleResend}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
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
