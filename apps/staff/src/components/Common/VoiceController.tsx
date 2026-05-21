import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  PermissionStatus,
  UpdateFrequency,
  Waveform,
  type IWaveformRef,
  useAudioPermission,
} from "@simform_solutions/react-native-audio-waveform";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

import AppButton from "./AppButton";
import { COLORS } from "../../constants/theme";

type VoiceControllerProps = {
  active: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onCancel?: () => void;
  onSend?: (text: string) => void;
};

export const VoiceController = ({
  active,
  onStart,
  onStop,
  onCancel,
  onSend,
}: VoiceControllerProps) => {
  const ref = useRef<IWaveformRef>(null);
  const { checkHasAudioRecorderPermission, getAudioRecorderPermission } = useAudioPermission();
  const [partialText, setPartialText] = useState("");
  const [finalText, setFinalText] = useState("");

  const transcript = useMemo(() => {
    const value = `${finalText} ${partialText}`.trim();
    return value.replace(/\s+/g, " ");
  }, [finalText, partialText]);

  useSpeechRecognitionEvent("result", (event) => {
    const next = event.results?.[0]?.transcript ?? "";
    if (!next) return;
    if (event.isFinal) {
      setFinalText(next);
      setPartialText("");
    } else {
      setPartialText(next);
    }
  });

  useSpeechRecognitionEvent("error", () => {
    onStop?.();
  });

  useEffect(() => {
    let cancelled = false;

    async function syncActive() {
      if (active) {
        setPartialText("");
        setFinalText("");
        try {
          const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
          if (!perm.granted) throw new Error("speech-permission-not-granted");
          ExpoSpeechRecognitionModule.start({
            lang: "en-US",
            interimResults: true,
            continuous: true,
          });
          if (!cancelled) onStart?.();
        } catch {
          if (!cancelled) onStop?.();
        }
      } else {
        try {
          ExpoSpeechRecognitionModule.stop();
        } finally {
          if (!cancelled) onStop?.();
        }
      }
    }

    syncActive();
    return () => {
      cancelled = true;
    };
  }, [active, onStart, onStop]);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;

    async function startWaveform() {
      try {
        let permission = await checkHasAudioRecorderPermission();
        if (permission === PermissionStatus.undetermined) {
          permission = await getAudioRecorderPermission();
        }
        if (permission !== PermissionStatus.granted || cancelled) return;
        await ref.current?.startRecord({ updateFrequency: UpdateFrequency.high });
      } catch {
        // Waveform recording is optional; speech recognition still works.
      }
    }

    const frame = requestAnimationFrame(() => {
      void startWaveform();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ref.current?.stopRecord().catch(() => {});
    };
  }, [active, checkHasAudioRecorderPermission, getAudioRecorderPermission]);

  const handleCancel = async () => {
    ExpoSpeechRecognitionModule.abort();
    setPartialText("");
    setFinalText("");
    onCancel?.();
  };

  const handleSend = async () => {
    const text = transcript.trim();
    ExpoSpeechRecognitionModule.stop();
    onSend?.(text);
  };

  return (
    <View style={styles.wrap}>
      {active ? (
        <>
          <Text style={styles.transcript} numberOfLines={3}>
            {transcript.length ? transcript : "Listening..."}
          </Text>
          <View style={styles.actionsRow}>
            <AppButton
              width="48%"
              height={44}
              borderRadius={22}
              borderWidth={1}
              borderColor="#FF6B6B"
              bgColor="#FDECEC"
              text="Cancel"
              textStyle={styles.cancelText}
              onPress={handleCancel}
            />
            <AppButton
              width="48%"
              height={44}
              borderRadius={22}
              bgColor={COLORS.PRIMARY}
              text="Send"
              textStyle={styles.sendText}
              onPress={handleSend}
              disabled={!transcript.trim().length}
            />
          </View>
          <Waveform
            mode="live"
            ref={ref}
            candleSpace={2}
            candleWidth={2}
            candleHeightScale={8}
            waveColor={COLORS.TEXT_20}
          />
        </>
      ) : null}
    </View>
  );
};

export default VoiceController;

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: COLORS.INNER_SURFACE,
    gap: 10,
  },
  transcript: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E05B6E",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  sendText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Semibold",
  },
});
