import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import TickIcon from "../../../../assets/icon/tickIcon.svg";
import MinusIcon from "../../../../assets/icon/minus.svg";
import PlusIcon from "../../../../assets/icon/plus.svg";
import navigationStrings from "../../../../constants/navigationStrings";

const LAB_REVIEW_LIST = [
    { id: "potassium", name: "Potassium", value: "97.8 g", dose: "120/g", count: 1 },
    { id: "refills", name: "Refills", value: "97.8 mg", dose: "120/g", count: 1 },
    { id: "creatinine", name: "Creatinine", value: "R73 mg/dl", dose: "120/g", count: 1 },
    { id: "egfr", name: "eGFR", value: "49", dose: "Ingent", count: 1 },
];

const FOLLOW_UP_LIST = [
    { id: "repeat-labs", label: "Repeat Labs", icon: <TickIcon width={20} height={20} /> },
    { id: "needs-appointment", label: "Needs appointment", icon: <TickIcon width={20} height={20} /> },
    { id: "med-recon", label: "Need med reconciliation", icon: <TickIcon width={20} height={20} /> },
];

const LabsReview = () => {
    const navigation = useNavigation<any>();

    const renderLabItem = ({ item }: { item: (typeof LAB_REVIEW_LIST)[number] }) => (
        <View style={styles.labRow}>
            <View style={styles.labInfo}>
                <Text style={styles.labName}>{item.name}</Text>
                <Text style={styles.labMeta}>{item.value}</Text>
            </View>
            <Text style={styles.labDose}>{item.dose}</Text>
            <View style={styles.counterWrap}>
                <NeumorphicCard
                    outerStyle={styles.counterValueOuter}
                    innerStyle={styles.counterValueInner}
                    borderRadius={55}
                >
                    <MinusIcon width={10} height={10} />
                </NeumorphicCard>

                <Text style={styles.counterValue}>{item.count}</Text>

                <NeumorphicCard
                    outerStyle={styles.counterValueOuter}
                    innerStyle={styles.counterValueInner}
                    borderRadius={55}
                >
                    <PlusIcon width={10} height={10} />
                </NeumorphicCard>
            </View>
        </View>
    );

    const renderFollowUpItem = ({ item }: { item: (typeof FOLLOW_UP_LIST)[number] }) => (
        <View style={styles.followUpRow}>
            <View style={styles.followUpLeft}>
                <InnerShadowIcon icon={item.icon} size={40} />
                <Text style={styles.followUpLabel}>{item.label}</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} >
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <IconComponent
                        icon={<BackIcon width={18} height={18} />}
                        width={40}
                        height={40}
                        radius={20}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Labs Review</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <NeumorphicCard outerStyle={styles.patientCardOuter} innerStyle={styles.patientCardInner} borderRadius={12}>
                    <View style={styles.patientHeader}>
                        <View style={styles.patientLeft}>
                            <InnerShadowIcon
                                size={40}
                                icon={<Text style={styles.initials}>{getInitials("Sarah Williams")}</Text>}
                            />
                            <View style={{ display: "flex", flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                <View >
                                    <Text style={styles.patientName}>Sarah Williams</Text>
                                    <Text style={styles.patientMeta}>Female . Age 45</Text>
                                </View>
                                <Text style={styles.patientDate}>2 Feb 2024</Text>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={LAB_REVIEW_LIST}
                        keyExtractor={(item) => item.id}
                        renderItem={renderLabItem}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
                    />
                </NeumorphicCard>


                <NeumorphicCard outerStyle={styles.criteriaOuter} innerStyle={styles.criteriaInner} borderRadius={12}>
                    <Text style={styles.criteriaTitle}>Does this meet refill safety criteria</Text>

                    <FlatList
                        data={FOLLOW_UP_LIST}
                        keyExtractor={(item) => item.id}
                        renderItem={renderFollowUpItem}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.divider} />}
                    />
                </NeumorphicCard>

                <ReusableButton
                    title="Order Labs"
                    containerStyle={styles.footerBtn}
                    onPress={() => navigation.navigate(navigationStrings.ORDER_LABS)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 16, paddingBottom: 20 },
    header: {
        marginTop: 6,
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
    headerSpacer: { width: 40, height: 40 },
    patientCardOuter: { marginTop: 30 },
    patientCardInner: { padding: 10, borderRadius: 10 },
    patientHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    patientLeft: { flexDirection: "row", alignItems: "center", gap: 10, width: "100%" },
    initials: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
    patientName: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
    patientMeta: { color: COLORS.TEXT_60, fontSize: 10, fontWeight: "400", marginTop: 2 },
    patientDate: { color: COLORS.TEXT_40, paddingTop: 1, fontSize: 12, fontWeight: "400" },
    labRow: { flexDirection: "row", alignItems: "center" },
    labInfo: { flex: 1 },
    labName: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
    labMeta: { color: COLORS.TEXT_50, fontSize: 12, fontWeight: "400", marginTop: 2 },
    labDose: { color: COLORS.TEXT_50, fontSize: 12, fontWeight: "400", marginRight: 20 },
    counterWrap: { flexDirection: "row", alignItems: "center", gap: 10, padding: 3 },
    counterControl: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "600", lineHeight: 14 },
    counterValueOuter: { width: 32 },
    counterValueInner: { height: 30, alignItems: "center", justifyContent: "center", borderRadius: 10 },
    counterValue: { color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400" },
    rowSeparator: { height: 10 },
    criteriaTitle: { marginBottom: 20, color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
    criteriaOuter: { marginTop: 20 },
    criteriaInner: { padding: 10, borderRadius: 10 },
    divider: { height: 1, marginVertical: 12, backgroundColor: COLORS.TEXT_10 },
    followUpRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    followUpLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    followUpLabel: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
    footerBtn: { marginTop: 20 },
});

export default LabsReview;