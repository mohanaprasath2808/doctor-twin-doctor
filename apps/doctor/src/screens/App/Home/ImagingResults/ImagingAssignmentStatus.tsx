import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import NurseTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import ImagingNotificationSection from "./ImagingNotificationSection";
import {
  IMAGING_ASSIGNMENT_CONFIG,
  ImagingAssignmentMode,
  StaffAssignmentCard,
} from "./imagingAssignmentTypes";

type HomeStackParamList = {
  [navigationStrings.URGENT_VISIT_SCHEDULING]: { mode?: ImagingAssignmentMode };
  [navigationStrings.REQUESTED_ASSIGNED]: { mode?: ImagingAssignmentMode };
};

type AssignmentRouteProp = RouteProp<
  HomeStackParamList,
  | typeof navigationStrings.URGENT_VISIT_SCHEDULING
  | typeof navigationStrings.REQUESTED_ASSIGNED
>;

const STAFF_AVATAR: ImageSourcePropType = NurseTempImage;

function StaffAssignmentCardView({ card }: { card: StaffAssignmentCard }) {
  return (
    <NeumorphicCard
      outerStyle={styles.staffCardOuter}
      innerStyle={styles.staffCardInner}
      borderRadius={14}
    >
      <View style={styles.staffTopRow}>
        <Image source={STAFF_AVATAR} style={styles.staffAvatar} />
        <View style={styles.staffTextCol}>
          <Text style={styles.staffName}>{card.name}</Text>
          <Text style={styles.staffRole}>{card.role}</Text>
        </View>
        <RightArrowIcon width={12} height={12} />
      </View>
      <Text style={styles.staffMessage}>{card.message}</Text>
      <Text style={styles.referenceLog}>{card.referenceLog}</Text>
    </NeumorphicCard>
  );
}

function NotificationSection({
  items,
}: {
  items: NonNullable<
    (typeof IMAGING_ASSIGNMENT_CONFIG)[ImagingAssignmentMode]["notifications"]
  >;
}) {
  return <ImagingNotificationSection items={items} />;
}

function ActionButtons({
  onReturnToInbox,
  onDone,
}: {
  onReturnToInbox: () => void;
  onDone: () => void;
}) {
  return (
    <View style={styles.actionsRow}>
      <View style={styles.actionCell}>
        <AppButton
          text="Return to Inbox"
          width="100%"
          height={48}
          borderRadius={24}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.outlineBtnText}
          onPress={onReturnToInbox}
        />
      </View>
      <View style={styles.actionCell}>
        <ReusableButton
          title="Done"
          height={48}
          borderRadius={24}
          containerStyle={styles.doneBtn}
          textStyle={styles.doneBtnText}
          onPress={onDone}
        />
      </View>
    </View>
  );
}

const ImagingAssignmentStatus = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<AssignmentRouteProp>();

  const mode: ImagingAssignmentMode =
    route.params?.mode ??
    (route.name === navigationStrings.REQUESTED_ASSIGNED
      ? "requestedAssigned"
      : "urgentVisit");

  const config = IMAGING_ASSIGNMENT_CONFIG[mode];

  const returnToInbox = () => {
    navigation.navigate(navigationStrings.IMAGING_RESULTS);
  };

  const onDone = () => {
    navigation.navigate(navigationStrings.IMAGING_RESULTS);
  };

  const renderUrgentVisitLayout = () => (
    <>
      <StaffAssignmentCardView card={config.cards[0]} />
      <ActionButtons onReturnToInbox={returnToInbox} onDone={onDone} />
      {config.notifications ? (
        <NotificationSection items={config.notifications} />
      ) : null}
    </>
  );

  const renderRequestedAssignedLayout = () => (
    <>
      <StaffAssignmentCardView card={config.cards[0]} />
      <ActionButtons onReturnToInbox={returnToInbox} onDone={onDone} />
      {config.cards.slice(1).map((card) => (
        <StaffAssignmentCardView key={card.id} card={card} />
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>{config.title}</Text>
          <View style={styles.headerSpacer} />
        </View>

        {mode === "urgentVisit"
          ? renderUrgentVisitLayout()
          : renderRequestedAssignedLayout()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImagingAssignmentStatus;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  staffCardOuter: {
    width: "100%",
    marginTop: 16,
  },
  staffCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  staffTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  staffAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: "cover",
  },
  staffTextCol: { flex: 1, minWidth: 0 },
  staffName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  staffRole: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  staffMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  referenceLog: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  actionsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  actionCell: { flex: 1, minWidth: 0 },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
  doneBtn: { width: "100%" },
  doneBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
