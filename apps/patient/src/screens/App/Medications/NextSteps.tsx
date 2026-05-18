import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import IconComponent from "../../../neomorphism/IconComponent";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import LabClipboardIcon from "../../../assets/icons/labClipboard.svg";
import CalendarWithClockIcon from "../../../assets/icons/calendarWithClockIcon.svg";
import MessageIcon from "../../../assets/icons/message.svg";
import NextStepListCard from "./components/NextStepListCard";
import { NEXT_STEP_ITEMS } from "./data/medications.repository";
import type { NextStepItem } from "./types/medications.types";

const HORIZONTAL = 16;

const NextSteps = () => {
  const navigation = useNavigation<any>();

  const onStepPress = useCallback(
    (item: NextStepItem) => {
      if (item.id === "schedule_labs") {
        navigation.navigate(navigationStrings.LAB_REQUEST);
        return;
      }
      if (item.id === "schedule_visit") {
        navigation.navigate(navigationStrings.SCHEDULE_STEP_1);
        return;
      }
      if (item.id === "message_staff") {
        navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
          screen: navigationStrings.NOTIFICATIONS,
        });
      }
    },
    [navigation],
  );

  const iconForStep = (id: string) => {
    if (id === "schedule_labs") {
      return <LabClipboardIcon width={18} height={18} />;
    }
    if (id === "schedule_visit") {
      return <CalendarWithClockIcon width={18} height={18} />;
    }
    return <MessageIcon width={18} height={18} />;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Next Steps</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {NEXT_STEP_ITEMS.map((item, index) => (
          <NextStepListCard
            key={item.id}
            item={item}
            icon={iconForStep(item.id)}
            onPress={() => onStepPress(item)}
            outerStyle={index > 0 ? styles.cardGap : undefined}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NextSteps;

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
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 32,
  },
  cardGap: {
    marginTop: 14,
  },
});
