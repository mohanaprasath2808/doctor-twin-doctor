import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import type { HealthJournalEntryType } from "./types/healthJournalEntryConfig";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import GreenTickImage from "../../../assets/images/greenTick.png";
import OverlayImage from "../../../assets/images/imageBgShadow.png";

const FOOTER_BTN_HEIGHT = 48;

const HealthJournalReadingSaved = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const entryType = route?.params?.entryType ?? "blood_pressure";

  const goToHealthJournal = () => {
    const state = navigation.getState();
    const routes = state?.routes ?? [];
    const journalIdx = routes.findIndex(
      (r: { name: string }) => r.name === navigationStrings.HEALTH_JOURNAL,
    );

    if (journalIdx >= 0) {
      const nextRoutes = routes.slice(0, journalIdx + 1).map((r: { name: string; params?: object }) => ({
        name: r.name,
        params: r.params,
      }));
      navigation.dispatch(
        CommonActions.reset({
          index: nextRoutes.length - 1,
          routes: nextRoutes,
        }),
      );
      return;
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: navigationStrings.BOTTOM_NAVIGATION },
          { name: navigationStrings.HEALTH_JOURNAL },
        ],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={goToHealthJournal}
          />
          <Text style={styles.headerTitle}>Reading Saved</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.body}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            containerStyle={styles.imageContainer}
            wrapperStyle={styles.avatarWrap}
            overlayStyle={styles.overlayImage}
            imageStyle={styles.avatarImage}
          />

          <Text style={styles.title}>Thank you.</Text>
          <Text style={styles.subtitle}>I will watch your trends.</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <ReusableButton
                title="Done"
                height={FOOTER_BTN_HEIGHT}
                borderRadius={24}
                width="100%"
                gradientColors={["#22D3EE", "#0F766E"]}
                onPress={goToHealthJournal}
              />
            </View>
            <View style={styles.footerHalf}>
              <AppButton
                text="View Trends"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                height={FOOTER_BTN_HEIGHT}
                borderRadius={24}
                width="100%"
                textStyle={styles.outlineBtnText}
                onPress={() =>
                  navigation.navigate(navigationStrings.HEALTH_JOURNAL_TRENDS, {
                    trendType: entryType as HealthJournalEntryType,
                  })
                }
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrap: {
    width: 210,
    height: 210,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 105,
  },
  avatarImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    borderRadius: 65,
  },
  title: {
    textAlign: "center",
    ...TEXT.hero,
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    ...TEXT.sectionTitleMedium,
    fontWeight: "400",
    fontFamily: TEXT.caption.fontFamily,
    color: COLORS.TEXT_PRIMARY_70,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 8 : 12,
    paddingTop: 8,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
  },
  outlineBtnText: {
    color: COLORS.PRIMARY,
    ...TEXT.sectionTitleMedium,
  },
});

export default HealthJournalReadingSaved;
