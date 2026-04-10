import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
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
const RefillRequestDetail = () => {
    const navigation = useNavigation<any>();

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
                    />
                    <AppButton
                        activeOpacity={0.8}
                        style={styles.actionBtnBase}
                        borderWidth={1}
                        borderColor={COLORS.ALERT}
                        bgColor={"#FDECEC"}
                        text="Deny"
                        textStyle={styles.denyBtnText}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
    scroll: { flex: 1 },
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
    lastWeek: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
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
