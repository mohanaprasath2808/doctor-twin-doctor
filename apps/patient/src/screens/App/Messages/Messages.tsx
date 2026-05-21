import React from "react";
import { FlatList, Image, ListRenderItem, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import YellowWarningIcon from "../../../assets/icons/yellowWarningIcon.svg";
import WhitePlusIcon from "../../../assets/icons/whitePlusIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

type MessageItem = {
  id: string;
  sender: string;
  preview: string;
  time: string;
  avatarType: "image" | "initials";
  initials?: string;
  needsAction?: boolean;
};

const MESSAGES: MessageItem[] = [
  {
    id: "1",
    sender: "Dr. Soliman",
    preview: "Your follow-up is due..",
    time: "3 mins ago",
    avatarType: "image",
    needsAction: true,
  },
  {
    id: "2",
    sender: "Care Team",
    preview: "Lab results are ready",
    time: "1 hr ago",
    avatarType: "initials",
    initials: "SW",
  },
  {
    id: "3",
    sender: "Care Team",
    preview: "Lab results are ready",
    time: "1 hr ago",
    avatarType: "initials",
    initials: "SW",
  },
];

const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];
const HORIZONTAL = 16;

const MessageAvatar = ({ item }: { item: MessageItem }) => {
  if (item.avatarType === "image") {
    return <Image source={DoctorTempImage} style={styles.messageAvatar} />;
  }
  return (
    <View style={styles.initialsAvatar}>
      <Text style={styles.initialsText}>{item.initials}</Text>
    </View>
  );
};

const Messages = () => {
  const navigation = useNavigation<any>();

  const renderMessage: ListRenderItem<MessageItem> = ({ item }) => (
    <NeumorphicCard
      outerStyle={styles.messageCardOuter}
      innerStyle={styles.messageCardInner}
      borderRadius={10}
      onPress={() => undefined}
      activeOpacity={0.88}
    >
      <View style={styles.messageRow}>
        <MessageAvatar item={item} />
        <View style={styles.messageBody}>
          <View style={styles.messageTopRow}>
            <Text style={styles.senderName} numberOfLines={1}>
              {item.sender}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text style={styles.previewText} numberOfLines={2}>
            {item.preview}
          </Text>
          {item.needsAction ? (
            <View style={styles.needsActionBadge}>
              <YellowWarningIcon width={12} height={12} />
              <Text style={styles.needsActionText}>Needs action</Text>
            </View>
          ) : null}
        </View>
      </View>
    </NeumorphicCard>
  );

  const listHeader = (
    <>
      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.avatarWrap}
        wrapperStyle={styles.avatarWrapper}
        overlayStyle={styles.avatarOverlay}
        imageStyle={styles.avatarImage}
      />
      <Text style={styles.greeting}>Hi Sarah, I&apos;m here to help.</Text>
      <Text style={styles.subGreeting}>Here&apos;s what needs your attention today.</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.notifWrap}>
          <IconComponent
            icon={<NotificationIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
          />
          <View style={styles.notifDot} />
        </View>
      </View>

      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        ListHeaderComponent={listHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
      />

      <View style={styles.footer}>
        <ReusableButton
          title="New Message"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          leadingIcon={<WhitePlusIcon width={16} height={16} />}
          onPress={() => undefined}
          containerStyle={styles.newMessageCta}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 24,
  },
  avatarWrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 115,
    resizeMode: "contain",
  },
  greeting: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  subGreeting: {
    marginTop: 4,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    paddingHorizontal: 12,
  },
  cardSeparator: {
    height: 12,
  },
  messageCardOuter: {
    width: "100%",
  },
  messageCardInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  initialsAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.TEXT_PRIMARY_20,
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  messageBody: {
    flex: 1,
    minWidth: 0,
  },
  messageTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  senderName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_50,
  },
  previewText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  needsActionBadge: {
    alignSelf: "flex-end",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.ESCALATION,
    backgroundColor: COLORS.ESCALATION_BG,
  },
  needsActionText: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.ESCALATION,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 16 : 8,
  },
  newMessageCta: {
    alignSelf: "stretch",
  },
});

export default Messages;
