import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import NotificationIcon from "../../../../assets/icon/notificationIcon.svg";
import IncreaseIcon from "../../../../assets/icon/increaseIcon.svg";
import DecreaseIcon from "../../../../assets/icon/decreaseIcon.svg";
import navigationStrings from "../../../../constants/navigationStrings";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import { getInitials } from "../../../../constants/contant";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import StatusDot from "../../../../components/Common/StatusDot";
import RefillDenyReasonBottomSheetModal from "../../../../components/BottomSheets/RefillDenyReasonBottomSheetModal";

const LAST_VISIT_LABS = [
    { id: "egfr", title: "eGFR", value: "6 months ago" },
    { id: "a1c", title: "A1C", value: "6 months ago" },
    { id: "creatinine", title: "Creatinine", value: "1.5 mg/-dL" },
];

const ALERT_ITEMS = [
    { id: "renal-overdue", text: "Renal Function labs are Overdue", color: "#FF6B6B" },
    { id: "a1c-elevated", text: "A1C level elevated", color: COLORS.ESCALATION_DARK },
];

type LastVisitLabItem = (typeof LAST_VISIT_LABS)[number];
type AlertItem = (typeof ALERT_ITEMS)[number];

const RefillRequestDetail = () => {
    const navigation = useNavigation<any>();
    const denyReasonSheetRef = useRef<BSModal>(null);
    const [denyReason, setDenyReason] = useState("refill-too-early");
    const [otherDenyReason, setOtherDenyReason] = useState("");
    const renderLabItem = ({ item }: { item: LastVisitLabItem }) => (
        <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.innerAlertCard}
            contentStyle={styles.innerAlertContent}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor={COLORS.LIGHT_SHADOW}
        >
            <Text style={styles.labTitle} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
            </Text>
            <Text style={styles.labValue} numberOfLines={1} ellipsizeMode="tail">
                {item.value}
            </Text>
        </NeumorphicInnerShadowCard>
    );
    const renderAlertItem = ({ item }: { item: AlertItem }) => (
        <View style={styles.alertRow}>
            <StatusDot color={item.color} size={8} outerGradientColors={[COLORS.LIGHT_SHADOW, COLORS.DARK_SHADOW]} />
            <Text style={styles.alertText}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top", "bottom", "left", "right"]}
        >
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
                    <Text style={styles.headerTitle}>Dr.Twin Listening...</Text>
                    <IconComponent
                        icon={<NotificationIcon width={18} height={18} />}
                        width={40}
                        height={40}
                        radius={20}
                        onPress={() => { }}
                    />
                </View>

                <ProfileAvatar
                    overlaySource={OverlayImage}
                    imageSource={DoctorTempImage}
                    containerStyle={styles.avatarWrap}
                    wrapperStyle={styles.avatarWrapper}
                    overlayStyle={styles.avatarOverlay}
                    imageStyle={styles.avatar}
                />


                <View style={styles.messageRow}>
                    <DoctorAvatar
                        source={DoctorTempImage}
                        imageSize={38}
                        containerSize={44}
                    />
                    <InsightMessageCard
                        title="Risk Detected"
                        subTitle="Metformin refill needs your decision."
                        bgColor="#CBF0FF"
                    />
                </View>

                <NeumorphicCard
                    outerStyle={styles.cardOuter}
                    innerStyle={styles.cardInner}
                    borderRadius={12}
                >
                    <View style={styles.topRow}>
                        <View style={styles.leftCluster}>
                            <InnerShadowIcon
                                size={40}
                                icon={<Text style={styles.initials}>{getInitials("David Johnson")}</Text>}
                            />
                            <View style={styles.nameWrap}>
                                <Text style={styles.name}>David Johnson</Text>
                                <Text style={styles.meta}>Male • Age 41</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.medication}><Text style={{ fontWeight: "500" }}>Lipitor</Text> 20 mg</Text>
                        <Text style={styles.medicationMethod}>#90 tablet</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.medication}><Text style={{ fontWeight: "500" }}>Last Visit:</Text> 3 months ago</Text>
                        <FlatList
                            data={LAST_VISIT_LABS}
                            horizontal
                            scrollEnabled
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.labListContent}
                            renderItem={renderLabItem}
                            ItemSeparatorComponent={() => <View style={styles.labSeparator} />}
                        />
                    </View>
                    <View style={styles.divider} />
                    <NeumorphicInnerShadowCard
                        borderRadius={10}
                        containerStyle={styles.alertCard}
                        contentStyle={styles.alertCardContent}
                        darkShadowDx={4}
                        darkShadowDy={4}
                        darkShadowBlur={14}
                        darkShadowColor={COLORS.DARK_SHADOW}
                        lightShadowDx={-4}
                        lightShadowDy={-4}
                        lightShadowBlur={9}
                        lightShadowColor={COLORS.LIGHT_SHADOW}
                    >
                        <FlatList
                            data={ALERT_ITEMS}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={renderAlertItem}
                            ItemSeparatorComponent={() => (
                                <View style={styles.alertRowSeparator} />
                            )}
                        />
                    </NeumorphicInnerShadowCard>
                </NeumorphicCard>

                <View style={styles.actionsRow}>
                    <AppButton
                        activeOpacity={0.8}
                        style={styles.actionBtnBase}
                        borderWidth={1}
                        borderColor={COLORS.GREEN}
                        bgColor={COLORS.SUCCESS}
                        text="Approve"
                        textStyle={styles.approveBtnText}
                    />

                    <AppButton
                        activeOpacity={0.8}
                        style={styles.actionBtnBase}
                        borderWidth={1}
                        borderColor={COLORS.PRIMARY}
                        bgColor={COLORS.SURFACE}
                        text="Modify"
                        textStyle={styles.modifyBtnText}
                        onPress={() =>
                            navigation.navigate(navigationStrings.DELEGATE_REVIEW_TO_STAFF)
                        }
                    />
                    <AppButton
                        activeOpacity={0.8}
                        style={styles.actionBtnBase}
                        borderWidth={1}
                        borderColor={COLORS.ALERT}
                        bgColor={"#FDECEC"}
                        text="Deny"
                        textStyle={styles.denyBtnText}
                        onPress={() => denyReasonSheetRef.current?.present()}
                    />
                </View>
                <View style={styles.actionsRow}>
                    <ReusableButton
                        title="Message Patient"
                        onPress={() => { }}
                        containerStyle={styles.messagePatientBtn}
                        backgroundColor="#2E3A8C"
                        textColor="#FFFFFF"
                        textStyle={styles.messagePatientBtnText}
                    />
                </View>
            </ScrollView>
            <RefillDenyReasonBottomSheetModal
                ref={denyReasonSheetRef}
                selectedValue={denyReason}
                otherReason={otherDenyReason}
                onSelectDone={(value, reasonText) => {
                    setDenyReason(value);
                    setOtherDenyReason(reasonText);
                    navigation.navigate(navigationStrings.PATIENT_MESSAGE_PREVIEW);
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 16, paddingBottom: 28 },
    cardOuter: {
        marginTop: 16,
        width: "100%",
    },
    cardInner: {
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 8,
    },
    header: {
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.PRIMARY,
        textAlign: "center",
    },
    headerSpacer: { width: 40, height: 40 },
    avatarWrap: { alignItems: "center", marginTop: 4 },
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
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftCluster: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    initials: {
        color: COLORS.PRIMARY,
        fontSize: 16,
        fontWeight: "500",
    },
    nameWrap: {
        gap: 2,
    },
    innerAlertCard: {
        width: 114,
    },
    innerAlertContent: {
        paddingHorizontal: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    labListContent: {
        marginTop: 10,
    },
    labSeparator: {
        width: 10,
    },
    alertCard: {
        marginVertical: 2,
    },
    alertCardContent: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    alertRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    alertRowSeparator: {
        height: 10,
    },
    alertText: {
        color: COLORS.TEXT_DARK,
        fontSize: 14,
        fontWeight: "500",
    },
    name: {
        color: COLORS.TEXT_DARK,
        fontSize: 14,
        fontWeight: "500",
    },
    meta: {
        color: COLORS.TEXT_60,
        fontSize: 12,
        fontWeight: "400",
    },
    avatar: { width: 150, height: 150, borderRadius: 115, resizeMode: "contain" },
    title: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.PRIMARY,
    },
    messageRow: {
        marginTop: 18,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
    },
    grid: {
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
        columnGap: 16,
    },
    metricCardOuter: {
        width: "47.5%",
        borderRadius: 10,
    },
    metricCard: {
        width: "100%",
        borderRadius: 10,
        padding: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.TEXT_10,
        marginVertical: 10,
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    medicationContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    medication: {
        color: COLORS.TEXT_80,
        fontSize: 14,
        fontWeight: "400",
    },
    medicationMethod: {
        color: COLORS.TEXT_60,
        fontSize: 14,
        fontWeight: "400",
    },
    metricHeader: { flexDirection: "row", alignItems: "center", gap: 15 },
    metricTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
    metricValue: {
        marginTop: 16,
        color: COLORS.TEXT_DARK,
        fontSize: 24,
        fontWeight: "500",
    },
    metricFooter: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    labTitle: {
        fontWeight: "600",
        fontSize: 20,
        color: COLORS.TEXT_DARK,
    },
    labValue: {
        fontWeight: "400",
        fontSize: 12,
        color: COLORS.TEXT_70,
    },
    actionsRow: { marginTop: 20, flexDirection: "row", gap: 12 },
    actionBtnBase: {
        flex: 1,
        borderRadius: 26,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    approveBtnText: { color: COLORS.GREEN, fontSize: 16, fontWeight: "500" },
    modifyBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
    denyBtnText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
    messagePatientBtn: { height: 48, borderRadius: 24 },
    messagePatientBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
});

export default RefillRequestDetail;
