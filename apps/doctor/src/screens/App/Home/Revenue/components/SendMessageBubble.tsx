import React from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import BulbIcon from "../../../../../assets/icon/bulbIcon.svg";
import DoctorAvatar from "../../../../../components/Common/DoctorAvatar";
import { COLORS } from "../../../../../constants/theme";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";

type SendMessageBubbleBaseProps = {
  avatarSource: ImageSourcePropType;
};

type OutgoingMessageProps = SendMessageBubbleBaseProps & {
  variant: "outgoing";
  message: string;
  timestamp?: string;
};

type InsightMessageProps = SendMessageBubbleBaseProps & {
  variant: "insight";
  title: string;
  actionText: string;
  actionIcon?: React.ReactNode;
};

export type SendMessageBubbleProps = OutgoingMessageProps | InsightMessageProps;

function InnerActionCard({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <NeumorphicInnerShadowCard
      borderRadius={12}
      containerStyle={styles.actionCardOuter}
      contentStyle={styles.incomingActionCardInner}
    >
      <View style={styles.actionRow}>
        <BulbIcon width={16} height={16} />
        <Text style={styles.actionText}>{text}</Text>
      </View>
    </NeumorphicInnerShadowCard>
  );
}

const SendMessageBubble = (props: SendMessageBubbleProps) => {
  if (props.variant === "outgoing") {
    const { message, timestamp, avatarSource } = props;

    return (
      <View style={styles.outgoingRow}>
        <View style={styles.outgoingCol}>
          <NeumorphicCard
            borderRadius={16}
            borderTopRightRadius={4}
            outerStyle={styles.outgoingBubbleOuter}
            innerStyle={styles.outgoingBubbleInner}
          >
            <Text style={styles.messageText}>{message}</Text>
          </NeumorphicCard>
          {timestamp ? <Text style={styles.outgoingTimestamp}>{timestamp}</Text> : null}
        </View>
        <DoctorAvatar
          source={avatarSource}
          imageSize={34}
          containerSize={40}
          outerRingExtra={4}
        />
      </View>
    );
  }

  const { title, actionText, actionIcon, avatarSource } = props;

  return (
    <View style={styles.insightRow}>
      <DoctorAvatar source={avatarSource} imageSize={38} containerSize={44} />
      <NeumorphicCard
        borderRadius={16}
        borderTopLeftRadius={4}
        outerStyle={styles.insightBubbleOuter}
        innerStyle={styles.insightBubbleInner}
      >
        <Text style={styles.insightTitle}>{title}</Text>
        <InnerActionCard text={actionText} icon={actionIcon} />
      </NeumorphicCard>
    </View>
  );
};

export default SendMessageBubble;

const styles = StyleSheet.create({
  outgoingRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 8,
  },
  outgoingCol: {
    flex: 1,
    alignItems: "flex-end",
    maxWidth: "78%",
    gap: 4,
  },
  outgoingBubbleOuter: {
    width: "100%",
  },
  outgoingBubbleInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#CBF0FF",
  },
  messageText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 20,
  },
  outgoingTimestamp: {
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginRight: 4,
  },
  insightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  insightBubbleOuter: {
    flex: 1,
  },
  insightBubbleInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#CBF0FF",
    gap: 10,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  actionCardOuter: {
    width: "100%",
  },
  incomingActionCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  outgoingActionCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.SURFACE,
  },
  actionCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.SURFACE,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
