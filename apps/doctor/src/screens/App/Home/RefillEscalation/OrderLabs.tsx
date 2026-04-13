import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import TickIcon from "../../../../assets/icon/tickIcon.svg";
import LapReportIcon from "../../../../assets/icon/labReportIcon.svg";
import CalendarIcon from "../../../../assets/icon/appointmentCalendarIcon.svg";
import ReportIcon from "../../../../assets/icon/reportIcon.svg";

const APPEAL_ITEMS = [
    { id: "bmp", label: "BMP" },
    { id: "egfr", label: "eGFR" },
];

const OrderLabs = () => {
    const navigation = useNavigation<any>();

    const renderAppealItem = ({ item }: { item: (typeof APPEAL_ITEMS)[number] }) => (
        <View style={styles.row}>
            <View style={styles.rowLeft}>
                <InnerShadowIcon icon={<TickIcon width={18} height={18} />} size={40} />
                <Text style={styles.rowLabel}>{item.label}</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <IconComponent
                        icon={<BackIcon width={18} height={18} />}
                        width={40}
                        height={40}
                        radius={20}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Order Labs</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
                    <Text style={styles.sectionTitle}>Lab Ordered</Text>

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <InnerShadowIcon icon={<LapReportIcon width={18} height={18} />} size={40} />
                            <Text style={styles.rowLabel}>Torrance Lab</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <InnerShadowIcon icon={<CalendarIcon width={18} height={18} />} size={40} />
                            <Text style={styles.rowLabel}>Notify patient with lab instructions?</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <InnerShadowIcon icon={<CalendarIcon width={18} height={18} />} size={40} />
                            <Text style={styles.rowLabel}>Routine</Text>
                        </View>
                        <NeumorphicCard outerStyle={styles.soonOuter} innerStyle={styles.soonInner} borderRadius={62}>
                            <Text style={styles.soonText}>Soon</Text>
                            <DownArrowIcon width={10} height={10} />
                        </NeumorphicCard>
                    </View>
                </NeumorphicCard>

                <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
                    <Text style={styles.sectionTitle}>Does appropriate appeals for due</Text>
                    <FlatList
                        data={APPEAL_ITEMS}
                        keyExtractor={(item) => item.id}
                        renderItem={renderAppealItem}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.divider} />}
                    />
                </NeumorphicCard>

                <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <InnerShadowIcon icon={<ReportIcon width={18} height={18} />} size={40} />
                            <Text style={styles.rowLabel}>Assign lab arrangment task to{"\n"}Megan (MA)</Text>
                        </View>
                        <RightArrowIcon width={10} height={10} />
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.footerText}>We can media for follow-up visit. Expect to file share</Text>
                </NeumorphicCard>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 16, paddingBottom: 24 },
    header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
    headerSpacer: { width: 40, height: 40 },
    cardOuter: { marginTop: 30 },
    cardInner: { borderRadius: 10, padding: 10, paddingTop: 10, paddingBottom: 16 },
    sectionTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500", marginBottom: 20 },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    rowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
    rowLabel: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500", flexShrink: 1 },
    divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 14 },
    soonOuter: { minWidth: 98, paddingHorizontal: 13 },
    soonInner: { height: 36, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    soonText: { color: COLORS.TEXT_50, fontSize: 14, fontWeight: "500" },
    footerText: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400" },
});

export default OrderLabs;