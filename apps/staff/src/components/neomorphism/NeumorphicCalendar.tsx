import React, { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import ChevronLeftIcon from "../../assets/icon/chevronLeft.svg";
import { COLORS } from "../../constants/theme";
import IconComponent from "./IconComponent";
import NeumorphicCard from "./NeumorphicCard";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DayCell = {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const getMondayBasedWeekday = (year: number, month: number) => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
};

const sameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();

function buildGrid(year: number, month: number): DayCell[] {
    const firstWeekday = getMondayBasedWeekday(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrev = getDaysInMonth(prevYear, prevMonth);

    const cells: DayCell[] = [];

    for (let i = firstWeekday - 1; i >= 0; i--) {
        const day = daysInPrev - i;
        cells.push({ date: new Date(prevYear, prevMonth, day), day, isCurrentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ date: new Date(year, month, d), day: d, isCurrentMonth: true });
    }

    const requiredCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
    let trailingDay = 1;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
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

type NeumorphicCalendarProps = {
    initialDate?: Date;
    onDateChange?: (date: Date) => void;
};

const getRegionToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export function NeumorphicCalendar({ initialDate, onDateChange }: NeumorphicCalendarProps) {
    const resolvedInitialDate = initialDate ?? getRegionToday();
    const [visibleYear, setVisibleYear] = useState(() => resolvedInitialDate.getFullYear());
    const [visibleMonth, setVisibleMonth] = useState(() => resolvedInitialDate.getMonth());
    const [selectedDate, setSelectedDate] = useState(() => resolvedInitialDate);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const grid = useMemo(() => buildGrid(visibleYear, visibleMonth), [visibleYear, visibleMonth]);

    const changeMonth = (delta: -1 | 1) => {
        const next = new Date(visibleYear, visibleMonth + delta, 1);
        setVisibleYear(next.getFullYear());
        setVisibleMonth(next.getMonth());
    };

    const applyDate = (date: Date) => {
        setSelectedDate(date);
        setVisibleYear(date.getFullYear());
        setVisibleMonth(date.getMonth());
        onDateChange?.(date);
    };

    const selectDay = (cell: DayCell) => {
        applyDate(cell.date);
    };

    const onNativeDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === "android") {
            setShowDatePicker(false);
        }
        if (event.type === "dismissed" || !date) {
            return;
        }
        applyDate(date);
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
                    <Pressable onPress={() => setShowDatePicker((prev) => !prev)} hitSlop={8}>
                        <Text style={styles.monthText}>{`${MONTHS[visibleMonth].slice(0, 3)} ${visibleYear}`}</Text>
                    </Pressable>
                    <View style={styles.navGroup}>
                        <IconComponent
                            icon={<ChevronLeftIcon width={12} height={12} />}
                            width={30}
                            height={30}
                            radius={15}
                            onPress={() => changeMonth(-1)}
                        />
                        <IconComponent
                            icon={
                                <View style={styles.rightChevron}>
                                    <ChevronLeftIcon width={12} height={12} />
                                </View>
                            }
                            width={30}
                            height={30}
                            radius={15}
                            onPress={() => changeMonth(1)}
                        />
                    </View>
                </View>

                {showDatePicker ? (
                    <View style={styles.pickerWrap}>
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === "ios" ? "inline" : "default"}
                            onChange={onNativeDateChange}
                        />
                        {Platform.OS === "ios" ? (
                            <Pressable style={styles.doneBtn} onPress={() => setShowDatePicker(false)}>
                                <Text style={styles.doneBtnText}>Done</Text>
                            </Pressable>
                        ) : null}
                    </View>
                ) : null}

                <View style={styles.weekdayRow}>
                    {WEEKDAYS.map((d) => (
                        <View key={d} style={styles.weekdayCell}>
                            <Text style={styles.weekdayText}>{d}</Text>
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
                                            isSelected
                                                ? COLORS.PRIMARY
                                                : cell.isCurrentMonth
                                                    ? COLORS.INNER_SURFACE
                                                    : "#E6E8EC"
                                        }
                                        outerStyle={styles.selectedDayOuter}
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
    pickerWrap: {
        marginBottom: 12,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: COLORS.INNER_SURFACE,
    },
    doneBtn: {
        alignSelf: "flex-end",
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    doneBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.PRIMARY,
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
    selectedDayOuter: {
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