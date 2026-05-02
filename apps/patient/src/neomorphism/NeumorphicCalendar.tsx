import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import LeftArrowIcon from "../assets/icons/leftArrow.svg";
import NeumorphicCard from "../components/Common/NeumorphicCard";
import { COLORS } from "../constants/theme";
import IconComponent from "./IconComponent";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DayCell = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

type NeumorphicCalendarProps = {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const getMondayBasedWeekday = (year: number, month: number) => {
  const weekday = new Date(year, month, 1).getDay();
  return weekday === 0 ? 6 : weekday - 1;
};

const sameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

function buildGrid(year: number, month: number): DayCell[] {
  const firstWeekday = getMondayBasedWeekday(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrev = getDaysInMonth(prevYear, prevMonth);

  const cells: DayCell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i -= 1) {
    const day = daysInPrev - i;
    cells.push({ date: new Date(prevYear, prevMonth, day), day, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(year, month, day), day, isCurrentMonth: true });
  }

  const requiredCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  let trailingDay = 1;
  while (cells.length < requiredCells) {
    cells.push({
      date: new Date(nextYear, nextMonth, trailingDay),
      day: trailingDay,
      isCurrentMonth: false,
    });
    trailingDay += 1;
  }

  return cells;
}

const getRegionToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export function NeumorphicCalendar({ initialDate, onDateChange }: NeumorphicCalendarProps) {
  const resolvedInitialDate = initialDate ?? getRegionToday();
  const [visibleYear, setVisibleYear] = useState(() => resolvedInitialDate.getFullYear());
  const [visibleMonth, setVisibleMonth] = useState(() => resolvedInitialDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(() => resolvedInitialDate);

  const grid = useMemo(() => buildGrid(visibleYear, visibleMonth), [visibleYear, visibleMonth]);

  const changeMonth = (delta: -1 | 1) => {
    const next = new Date(visibleYear, visibleMonth + delta, 1);
    setVisibleYear(next.getFullYear());
    setVisibleMonth(next.getMonth());
  };

  const selectDay = (cell: DayCell) => {
    setSelectedDate(cell.date);
    onDateChange?.(cell.date);
  };

  return (
    <View style={styles.host}>
      <NeumorphicCard
        borderRadius={18}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={styles.calendarOuter}
        innerStyle={styles.calendarInner}
      >
        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{`${MONTHS[visibleMonth].slice(0, 3)} ${visibleYear}`}</Text>
          <View style={styles.navGroup}>
            <IconComponent
              icon={<LeftArrowIcon width={12} height={12} />}
              width={30}
              height={30}
              radius={15}
              onPress={() => changeMonth(-1)}
            />
            <IconComponent
              icon={
                <View style={styles.rightChevron}>
                  <LeftArrowIcon width={12} height={12} />
                </View>
              }
              width={30}
              height={30}
              radius={15}
              onPress={() => changeMonth(1)}
            />
          </View>
        </View>

        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((dayLabel) => (
            <View key={dayLabel} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{dayLabel}</Text>
            </View>
          ))}
        </View>

        <View style={styles.grid}>
          {grid.map((cell, idx) => {
            const isSelected = sameDate(cell.date, selectedDate);
            return (
              <View key={`${cell.day}-${idx}`} style={styles.gridCellWrap}>
                <Pressable onPress={() => selectDay(cell)} style={styles.cellPress}>
                  <NeumorphicCard
                    borderRadius={10}
                    backgroundColor={
                      isSelected ? COLORS.SECONDARY : cell.isCurrentMonth ? COLORS.INNER_SURFACE : "#E6E8EC"
                    }
                    outerStyle={styles.dayOuter}
                    innerStyle={styles.dayInner}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected
                          ? styles.dayTextSelected
                          : cell.isCurrentMonth
                            ? styles.dayTextCurrent
                            : styles.dayTextDimmed,
                      ]}
                    >
                      {cell.day}
                    </Text>
                  </NeumorphicCard>
                </Pressable>
              </View>
            );
          })}
        </View>
      </NeumorphicCard>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    width: "100%",
  },
  calendarOuter: {
    width: "100%",
  },
  calendarInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  monthText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  navGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rightChevron: {
    transform: [{ rotate: "180deg" }],
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_70,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridCellWrap: {
    width: `${100 / 7}%`,
    height: 46,
    marginTop: -2,
  },
  cellPress: {
    flex: 1,
  },
  dayOuter: {
    width: "100%",
    height: "100%",
  },
  dayInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    includeFontPadding: false,
  },
  dayTextCurrent: {
    color: COLORS.TEXT_DARK,
    fontWeight: "400",
  },
  dayTextDimmed: {
    color: COLORS.TEXT_40,
    fontWeight: "400",
  },
  dayTextSelected: {
    color: COLORS.WHITE,
    fontWeight: "600",
  },
});
