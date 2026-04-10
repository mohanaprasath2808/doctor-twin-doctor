import React, { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import RefillRequestCard, {
    RefillRequestItem,
} from "../../../../components/RefillEscalation/RefillRequestCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import navigationStrings from "../../../../constants/navigationStrings";

type RefillFilter = "all" | "urgent";

const REFILL_REQUESTS: RefillRequestItem[] = [
    {
        id: "req-1",
        initials: "SW",
        name: "Sarah Williams",
        ageGender: "Female • Age 45",
        medication: "Lipitor 20 mg",
        medicationMethod: "#90 tablet",
        requestedAgo: "29 mins",
        status: "urgent",
    },
    {
        id: "req-2",
        initials: "DJ",
        name: "David Johnson",
        ageGender: "Male • Age 41",
        medication: "Lisinopril 10 mg",
        medicationMethod: "#90 tablet",
        requestedAgo: "29 mins",
        status: "urgent",
    },
    {
        id: "req-3",
        initials: "SW",
        name: "Susan Anderson",
        ageGender: "Female • Age 49",
        medication: "Metformin 500 mg",
        medicationMethod: "#90 tablet",
        requestedAgo: "29 mins",
        status: "approve",
    },
    {
        id: "req-4",
        initials: "SW",
        name: "Sarah Williams",
        ageGender: "Female • Age 49",
        medication: "Metformin 500 mg",
        medicationMethod: "#90 tablet",
        requestedAgo: "29 mins",
        status: "approve",
    },
    {
        id: "req-5",
        initials: "SA",
        name: "Susan Anderson",
        ageGender: "Male • Age 41",
        medication: "Lisinopril 10 mg",
        medicationMethod: "#90 tablet",
        requestedAgo: "29 mins",
        status: "urgent",
    },
    {
        id: "req-6",
        initials: "DJ",
        name: "David Johnson",
        ageGender: "Female • Age 49",
        medication: "Metformin 500 mg",
        medicationMethod: "#90 tablet",
        requestedAgo: "29 mins",
        status: "approve",
    },
];

const RefillEscalation = () => {
    const navigation = useNavigation<any>();
    const [selectedFilter, setSelectedFilter] = useState<RefillFilter>("all");

    const filteredRequests = useMemo(() => {
        if (selectedFilter === "all" || selectedFilter === "urgent") {
            return REFILL_REQUESTS;
        }
        return REFILL_REQUESTS.filter((item) => item.status === selectedFilter);
    }, [selectedFilter]);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
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
                    <Text style={styles.headerTitle}>Refill Escalation</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <ProfileAvatar
                    overlaySource={OverlayImage}
                    imageSource={DoctorTempImage}
                    containerStyle={styles.avatarWrap}
                    wrapperStyle={styles.avatarWrapper}
                    overlayStyle={styles.avatarOverlay}
                    imageStyle={styles.avatar}
                />
                <Text style={styles.promptText}>What can I Assist you with?</Text>

                <View style={styles.filtersRow}>
                    <FilterChip
                        title="All"
                        selected={selectedFilter === "all"}
                        onPress={() => setSelectedFilter("all")}
                    />
                    <FilterChip
                        title="Urgent (3)"
                        selected={selectedFilter === "urgent"}
                        onPress={() => setSelectedFilter("urgent")}
                    />

                </View>

                <FlatList
                    data={filteredRequests}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    style={styles.cardsList}
                    renderItem={({ item }) => (
                        <RefillRequestCard
                            item={item}
                            onPress={() =>
                                navigation.navigate(navigationStrings.REFILL_REQUEST_DETAILS)
                            }
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const FilterChip = ({
    title,
    selected,
    onPress,
}: {
    title: string;
    selected: boolean;
    onPress: () => void;
}) => (
    <Pressable onPress={onPress} style={styles.filterPress}>
        {selected ? (
            <DeltaBadge
                icon={null}
                value={title}
                height={36}
                bgColor="#CBF0FF"
                darkShadowColor="#C8CBCC"
                lightShadowColor="#FFFFFF99"
                textColor={COLORS.PRIMARY}
                textStyle={styles.selectedFilterText}
            />
        ) : (
            <NeumorphicCard
                outerStyle={styles.filterOuter}
                innerStyle={styles.filterInner}
                borderRadius={18}
            >
                <Text style={styles.filterText}>{title}</Text>
            </NeumorphicCard>
        )}
    </Pressable>
);

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 12, paddingBottom: 24 },
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
    avatarWrap: { alignItems: "center" },
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
    avatar: { width: 150, height: 150, borderRadius: 115, resizeMode: "contain" },
    promptText: {
        color: COLORS.PRIMARY,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    filtersRow: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    filterPress: { flexShrink: 1 },
    filterOuter: { minWidth: 72 },
    filterInner: {
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    filterText: {
        color: COLORS.TEXT_70,
        fontSize: 13,
        fontWeight: "500",
    },
    selectedFilterText: {
        fontSize: 13,
        fontWeight: "500",
    },
    dropdownContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    cardsList: {
        marginTop: 14,
        padding: 5,
    },
    cardSeparator: {
        height: 16,
    },
});

export default RefillEscalation;
