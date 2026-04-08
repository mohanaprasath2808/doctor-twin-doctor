import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import navigationStrings from "../../constants/navigationStrings";
import BackIcon from "../../assets/icon/backArrow.svg";
import PracticeSchedule from "../../assets/image/practiceSchedule.png";
import MyCalender from "../../assets/image/myCalendar.png";
import ToDoList from "../../assets/image/toDoList.png";

const Schedule = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={26} height={26} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Schedule</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.grid}>
          <ScheduleCard
            title="Practice Schedule"
            count="10"
            subtitle="Appointment"
            imageSource={PracticeSchedule}
            isFirst
            onPress={() =>
              navigation.navigate(navigationStrings.PRACTICE_SCHEDULE)
            }
          />
          <ScheduleCard
            title="My Calender"
            count="3"
            subtitle="Meetings"
            imageSource={MyCalender}
            alignRight
            isSecond
            onPress={() => navigation.navigate(navigationStrings.MY_CALENDER)}
          />
          <ScheduleCard
            title="To-Do List"
            count="5"
            subtitle="Tasks"
            imageSource={ToDoList}
            isThird
            onPress={() => navigation.navigate(navigationStrings.TO_DO_LIST)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ScheduleCard = ({
  imageSource,
  title,
  count,
  subtitle,
  alignRight = false,
  isFirst = false,
  isSecond = false,
  isThird = false,
  onPress,
}: {
  imageSource: ImageSourcePropType;
  title: string;
  count: string;
  subtitle: string;
  alignRight?: boolean;
  isFirst?: boolean;
  isSecond?: boolean;
  isThird?: boolean;
  onPress?: () => void;
}) => {
  return (
    <View
      style={[
        styles.cardWrap,
        alignRight ? styles.rightCard : styles.leftCard,
        isFirst && styles.firstCard,
        isSecond && styles.secondCard,
        isThird && styles.thirdCard,
      ]}
    >
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <Image
          source={imageSource}
          style={styles.ringImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <NeumorphicCard
        outerStyle={styles.badgeOuter}
        innerStyle={styles.badgeInner}
        borderRadius={54}
      >
        <Text style={styles.badgeCount}>{count}</Text>
        <Text style={styles.badgeLabel}>{subtitle}</Text>
      </NeumorphicCard>

      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  grid: {
    marginTop: 28,
    gap: 12,
  },
  cardWrap: {
    width: "48%",
    alignItems: "center",
  },
  firstCard: { marginTop: 12 },
  secondCard: { marginTop: -60 },
  thirdCard: { marginTop: -60 },
  leftCard: { alignSelf: "flex-start" },
  rightCard: { alignSelf: "flex-end", marginTop: -24 },
  ringImage: {
    width: 184,
    height: 184,
  },
  badgeOuter: {
    marginTop: -40,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  badgeInner: {
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeCount: {
    color: COLORS.PRIMARY,
    fontSize: 18,
    fontWeight: "600",
  },
  badgeLabel: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
  },
  cardTitle: {
    marginTop: 16,
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Schedule;
