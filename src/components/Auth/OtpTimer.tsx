import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface OtpTimerProps {
  onResend?: () => void;
  initialSeconds?: number;
}

const OtpTimer: React.FC<OtpTimerProps> = ({
  onResend,
  initialSeconds = 30,
}) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTimerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
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
      if (onResend) onResend();
    }
  };

  const formattedTime = `00:${String(seconds).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      {isTimerActive && seconds > 0 ? (
        <Text style={styles.timerText}>
          You can resend OTP in{' '}
          <Text style={styles.timerSeconds}>{formattedTime}</Text>
        </Text>
      ) : (
        <Text style={styles.resendText}>
          I didn't receive a code{'  '}
          <Text style={styles.resendLink} onPress={handleResend}>
            Resend Code
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 23,
    alignItems: 'center',
  },
  timerText: {
    textAlign: 'center',
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: '400',
  },
  timerSeconds: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  resendText: {
    textAlign: 'center',
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: '400',
  },
  resendLink: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});

export default OtpTimer;
