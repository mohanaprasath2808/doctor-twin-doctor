import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import BackArrowIcon from "../assets/icon/backArrow.svg";
import { COLORS } from "../constants/theme";
import NeumorphicCard from "../components/Common/NeumorphicCard";
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

const YEAR_RANGE = 50;

const SELECTED_DAY_COLOR = COLORS.PRIMARY;

type DayCell = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

type NeumorphicCalendarProps = {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  /** When set, days after this date cannot be selected (e.g. date of birth). */
  maxDate?: Date;
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

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function NeumorphicCalendar({ initialDate, onDateChange, maxDate }: NeumorphicCalendarProps) {
  const resolvedInitialDate = initialDate ?? getRegionToday();
  const [visibleYear, setVisibleYear] = useState(() => resolvedInitialDate.getFullYear());
  const [visibleMonth, setVisibleMonth] = useState(() => resolvedInitialDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(() => resolvedInitialDate);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const normalizedMaxDate = maxDate ? startOfDay(maxDate) : null;

  const grid = useMemo(() => buildGrid(visibleYear, visibleMonth), [visibleYear, visibleMonth]);
  const availableYears = useMemo(() => {
    const anchorYear = getRegionToday().getFullYear();
    const maxYear = anchorYear + YEAR_RANGE;
    const minYear = anchorYear - YEAR_RANGE;
    const years: number[] = [];
    for (let year = maxYear; year >= minYear; year -= 1) {
      years.push(year);
    }
    return years;
  }, []);

  const changeMonth = (delta: -1 | 1) => {
    const next = new Date(visibleYear, visibleMonth + delta, 1);
    setVisibleYear(next.getFullYear());
    setVisibleMonth(next.getMonth());
  };

  const selectDay = (cell: DayCell) => {
    if (normalizedMaxDate && cell.date > normalizedMaxDate) {
      return;
    }
    setSelectedDate(cell.date);
    onDateChange?.(cell.date);
  };

  const selectYear = (year: number) => {
    const maxDay = getDaysInMonth(year, visibleMonth);
    const safeDay = Math.min(selectedDate.getDate(), maxDay);
    let nextSelected = new Date(year, visibleMonth, safeDay);
    if (normalizedMaxDate && nextSelected > normalizedMaxDate) {
      nextSelected = normalizedMaxDate;
    }
    setVisibleYear(nextSelected.getFullYear());
    setVisibleMonth(nextSelected.getMonth());
    setSelectedDate(nextSelected);
    onDateChange?.(nextSelected);
    setIsYearPickerOpen(false);
  };

  return (
    <View style={styles.host}>
      <NeumorphicCard
        borderRadius={18}
        backgroundColor={COLORS.SURFACE}
        outerStyle={styles.calendarOuter}
        innerStyle={styles.calendarInner}
      >
        <View style={styles.monthRow}>
          <Pressable onPress={() => setIsYearPickerOpen((prev) => !prev)} style={styles.monthPress}>
            <Text style={styles.monthText}>{`${MONTHS[visibleMonth].slice(0, 3)} ${visibleYear}`}</Text>
            <Text style={styles.yearHint}>{isYearPickerOpen ? "Hide" : "Year"}</Text>
          </Pressable>
          <View style={styles.navGroup}>
            <IconComponent
              icon={<BackArrowIcon width={12} height={12} />}
              width={30}
              height={30}
              radius={20}
              onPress={() => changeMonth(-1)}
            />
            <IconComponent
              icon={
                <View style={styles.rightChevron}>
                  <BackArrowIcon width={12} height={12} />
                </View>
              }
              width={30}
              height={30}
              radius={20}
              onPress={() => changeMonth(1)}
            />
          </View>
        </View>

        {isYearPickerOpen ? (
          <View style={styles.yearPickerWrap}>
            <ScrollView
              style={styles.yearPickerScroll}
              contentContainerStyle={styles.yearPicker}
              showsVerticalScrollIndicator={false}
            >
              {availableYears.map((year) => (
                <Pressable
                  key={year}
                  style={[styles.yearChip, year === visibleYear && styles.yearChipActive]}
                  onPress={() => selectYear(year)}
                >
                  <Text style={[styles.yearChipText, year === visibleYear && styles.yearChipTextActive]}>
                    {year}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : null}

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
            const isDisabled = normalizedMaxDate ? cell.date > normalizedMaxDate : false;
            return (
              <View key={`${cell.day}-${idx}`} style={styles.gridCellWrap}>
                <Pressable
                  onPress={() => selectDay(cell)}
                  style={styles.cellPress}
                  disabled={isDisabled}
                >
                  <NeumorphicCard
                    borderRadius={10}
                    backgroundColor={
                      isSelected
                        ? SELECTED_DAY_COLOR
                        : cell.isCurrentMonth
                          ? COLORS.SURFACE
                          : "#E6E8EC"
                    }
                    outerStyle={styles.dayOuter}
                    innerStyle={styles.dayInner}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected
                          ? styles.dayTextSelected
                          : isDisabled
                            ? styles.dayTextDisabled
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
  monthPress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  yearHint: {
    fontSize: 11,
    color: COLORS.PRIMARY,
    fontWeight: "600",
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
  yearPickerWrap: {
    borderRadius: 12,
    backgroundColor: "#EFF3F8",
    marginBottom: 10,
    overflow: "hidden",
  },
  yearPickerScroll: {
    maxHeight: 220,
  },
  yearPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 8,
  },
  yearChip: {
    width: "23%",
    minHeight: 30,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    alignItems: "center",
    justifyContent: "center",
  },
  yearChipActive: {
    backgroundColor: SELECTED_DAY_COLOR,
  },
  yearChipText: {
    fontSize: 13,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
  yearChipTextActive: {
    color: COLORS.WHITE,
    fontWeight: "600",
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
  dayTextDisabled: {
    color: "#C2C6CD",
    fontWeight: "400",
  },
  dayTextSelected: {
    color: COLORS.WHITE,
    fontWeight: "600",
  },
});
