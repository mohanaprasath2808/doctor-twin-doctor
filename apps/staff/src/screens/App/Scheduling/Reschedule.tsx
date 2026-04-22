import React, { useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NeumorphicCalendar } from "../../../components/neomorphism/NeumorphicCalendar";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import FilterChip from "../../../components/Common/FilterChip";
import LocationBottomSheetModal from "../../../components/BottomSheets/LocationBottomSheetModal";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const PROVIDER_OPTIONS = [
    "Dr. Shahinaz Twin",
    "Dr. Alison Parker",
    "Dr. Bernard Hayes",
    "Dr. Sophia Carter",
];
const SLOT_OPTIONS = [
    { label: "10:15 AM", width: 106 },
    { label: "1:00 PM", width: 102 },
    { label: "3:00 PM", width: 102 },
];

export default function Reschedule() {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const providerSheetRef = useRef<BSModal>(null);
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 18));
    const [selectedSlot, setSelectedSlot] = useState("10:15 AM");
    const [selectedProvider, setSelectedProvider] = useState(PROVIDER_OPTIONS[0]);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconComponent
                            icon={<BackArrowIcon width={18} height={18} />}
                            width={40}
                            height={40}
                            radius={20}
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={styles.headerTitle}>Reschedule</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    <Text style={styles.sectionTitle}>Calender</Text>
                    <NeumorphicCalendar initialDate={selectedDate} onDateChange={setSelectedDate} />

                    <NeumorphicCard
                        borderRadius={12}
                        backgroundColor={COLORS.INNER_SURFACE}
                        outerStyle={styles.sectionCard}
                        innerStyle={styles.sectionInner}
                    >
                        <Text style={styles.sectionLabel}>Provider</Text>
                        <Pressable onPress={() => providerSheetRef.current?.present()}>
                            <View pointerEvents="none">
                                <InputField
                                    value={selectedProvider}
                                    editable={false}
                                    leftIcon={<MaterialCommunityIcons name="account-outline" size={16} color={COLORS.TEXT_60} />}
                                    rightIcon={<MaterialCommunityIcons name="chevron-down" size={18} color={COLORS.TEXT_60} />}
                                    containerStyle={styles.providerInput}
                                    minHeight={44}
                                    borderRadius={22}
                                    isFocused={false}
                                />
                            </View>
                        </Pressable>
                    </NeumorphicCard>

                    <NeumorphicCard
                        borderRadius={12}
                        backgroundColor={COLORS.INNER_SURFACE}
                        outerStyle={styles.sectionCard}
                        innerStyle={styles.sectionInner}
                    >
                        <Text style={styles.sectionLabel}>Time Slots</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.slotScroll}
                            contentContainerStyle={styles.slotRow}
                        >
                            {SLOT_OPTIONS.map((slot) => {
                                const isSelected = selectedSlot === slot.label;
                                return (
                                    <Pressable key={slot.label} style={styles.slotWrap} onPress={() => setSelectedSlot(slot.label)}>
                                        {isSelected ? (
                                            <DeltaBadge
                                                icon={null}
                                                value={slot.label}
                                                width={slot.width}
                                                height={40}
                                                radius={20}
                                                bgColor="#C3F0D5"
                                                darkShadowColor="#A9E9D5"
                                                lightShadowColor="#FFFFFFCC"
                                                textColor={COLORS.PRIMARY}
                                                textStyle={styles.selectedBadgeText}
                                            />
                                        ) : (
                                            <FilterChip
                                                title={slot.label}
                                                selected={false}
                                                onPress={() => setSelectedSlot(slot.label)}
                                                width={slot.width}
                                                height={40}
                                                borderRadius={20}
                                                textStyle={styles.slotText}
                                            />
                                        )}
                                    </Pressable>
                                );
                            })}
                        </ScrollView>

                    </NeumorphicCard>
                </View>

                <View style={styles.footer}>
                    <ReusableButton
                        title="Confirm"
                        height={50}
                        borderRadius={25}
                        width="100%"
                        gradientColors={["#A7F3D0", "#166534"]}
                        backgroundColor={COLORS.PRIMARY}
                        onPress={() => { }}
                        containerStyle={styles.confirmBtn}
                    />
                </View>
            </ScrollView>

            <LocationBottomSheetModal
                ref={providerSheetRef}
                title="Select Provider"
                options={PROVIDER_OPTIONS}
                selectedValue={selectedProvider}
                onSelectDone={setSelectedProvider}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.INNER_SURFACE,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingBottom: 8,
    },
    container: {
        paddingHorizontal: 16,
    },
    header: {
        marginTop: Platform.OS === "ios" ? 8 : 6,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 18,
        lineHeight: 22,
        fontWeight: "600",
        letterSpacing: 0.18,
        color: COLORS.TEXT_DARK,
        textAlign: "center",
    },
    headerSpacer: { width: 40, height: 40 },
    sectionTitle: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.TEXT_DARK,
    },
    sectionCard: {
        marginTop: 18,
    },
    sectionInner: {
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.TEXT_DARK,
        marginBottom: 10,
    },
    providerInput: {
        marginTop: 0,
    },
    slotRow: {
        flexDirection: "row",
        paddingHorizontal: 2,
        paddingVertical: 2,
        paddingRight: 4,
    },
    slotScroll: {
        padding: 4,
        width: "100%",
        overflow: "hidden",
    },
    slotWrap: {
        flexShrink: 0,
        marginRight: 10,
    },
    slotText: {
        fontSize: 15,
        fontWeight: "500",
        color: COLORS.TEXT_60,
    },
    selectedBadgeText: {
        fontSize: 15,
        fontWeight: "500",
        color: COLORS.PRIMARY,
    },
    footer: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 8,
    },
    confirmBtn: {
        marginTop: 0,
    },
});