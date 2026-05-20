import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import NeumorphicCheckboxMark from "./NeumorphicCheckboxMark";
import { COLORS } from "../../constants/theme";

export const DOCUMENT_CHANNEL_IDS = ["email", "app", "sms"] as const;

export type DocumentChannelId = (typeof DOCUMENT_CHANNEL_IDS)[number];

export type ChannelSelectionState = Record<DocumentChannelId, boolean>;

const CHANNEL_LABELS: Record<DocumentChannelId, string> = {
  email: "Email",
  app: "App",
  sms: "SMS",
};

export function createDefaultChannelSelection(
  overrides?: Partial<ChannelSelectionState>,
): ChannelSelectionState {
  return {
    email: overrides?.email ?? true,
    app: overrides?.app ?? false,
    sms: overrides?.sms ?? false,
  };
}

type ChannelCheckboxRowsProps = {
  channels: ChannelSelectionState;
  onToggle: (id: DocumentChannelId) => void;
};

/**
 * Email / App / SMS rows with `NeumorphicCheckboxMark` and hairline dividers.
 * Wrap with `NeumorphicCard` and a section title where used (Billing Answer, Documents flows).
 */
export function ChannelCheckboxRows({ channels, onToggle }: ChannelCheckboxRowsProps) {
  return (
    <View>
      {DOCUMENT_CHANNEL_IDS.map((id, index) => (
        <Pressable
          key={id}
          style={[styles.channelRow, index < DOCUMENT_CHANNEL_IDS.length - 1 && styles.channelRowBorder]}
          onPress={() => onToggle(id)}
        >
          <NeumorphicCheckboxMark selected={channels[id]} />
          <Text style={styles.channelLabel}>{CHANNEL_LABELS[id]}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  channelRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.TEXT_20,
  },
  channelLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
});
