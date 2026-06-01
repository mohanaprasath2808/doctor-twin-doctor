import React, { useCallback } from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import BlueTickIcon from "../../../../assets/icon/tickBlueIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/greenTick.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type StatusRow = { id: string; label: string };

const STATUS_ROWS: StatusRow[] = [
  { id: "s1", label: "Notes saved" },
  { id: "s2", label: "Patient notified" },
  { id: "s3", label: "Orders sent" },
];

const EncounterCompleted = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const renderStatusRow: ListRenderItem<StatusRow> = useCallback(
    ({ item }) => (
      <View style={styles.statusRow}>
        <InnerShadowIcon size={40} radius={20} icon={<BlueTickIcon width={18} height={18} />} />
        <Text style={styles.statusText}>{item.label}</Text>
      </View>
    ),
    [],
  );

  const onBackToDashboard = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: navigationStrings.BOTTOM_NAVIGATION }],
    });
  };

  const onNextPatient = () => {
    // navigation.navigate(navigationStrings.PREVENTIVE_CARE);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 24 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.heroAvatar}
          wrapperStyle={styles.heroWrapper}
          overlayStyle={styles.heroOverlay}
          imageStyle={styles.heroImage}
        />

        <Text style={styles.title}>Encounter Completed</Text>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={12}
        >
          <FlatList
            data={STATUS_ROWS}
            keyExtractor={(r) => r.id}
            scrollEnabled={false}
            renderItem={renderStatusRow}
          />
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            <AppButton
              text="Back to Dashboard"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.footerOutlineLabel}
              onPress={onBackToDashboard}
            />
          </View>
          <View style={styles.actionCell}>
            <ReusableButton
              title="Next Patient"
              height={52}
              borderRadius={26}
              containerStyle={styles.nextBtn}
              textStyle={styles.nextBtnText}
              onPress={onNextPatient}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EncounterCompleted;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  heroAvatar: {
    alignSelf: "center",
    marginTop: 4,
  },
  heroWrapper: {
    width: 200,
    height: 200,
  },
  heroOverlay: {
    borderRadius: 100,
  },
  heroImage: {
    width: 120,
    height: 120,
  },
  title: {
    marginTop: 7,
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Display-Medium",
  },
  cardOuter: {
    width: "100%",
    marginTop: 24,
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 7,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
    marginTop: 28,
  },
  actionCell: {
    flex: 1,
    minWidth: 0,
  },
  footerOutlineLabel: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.PRIMARY,
  },
  nextBtn: {},
  nextBtnText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.WHITE,
  },
});
