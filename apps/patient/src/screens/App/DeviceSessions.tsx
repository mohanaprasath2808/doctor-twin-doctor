import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import AppButton from "../../components/Common/AppButton";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../constants/theme";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import MobilePhoneIcon from "../../assets/icons/mobilePhone.svg";
import DeskTopIcon from "../../assets/icons/desktopIcon.svg";

const DeviceSessions = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Device Sessions</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
            <Text style={styles.sectionTitle}>Current Device</Text>
            <SessionRow icon={<MobilePhoneIcon width={18} height={18} />} device="iPhone 14" login="Last Login: 2 days ago" />
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
            <Text style={styles.sectionTitle}>Other Devices</Text>
            <SessionRow icon={<DeskTopIcon width={18} height={18} />} device="Desktop" login="Last Login: 20 April 2025" />
            <Divider />
            <SessionRow icon={<MobilePhoneIcon width={18} height={18} />} device="iPhone 15" login="Last Login: 20 April 2025" />
            <Divider />
            <SessionRow icon={<DeskTopIcon width={18} height={18} />} device="Desktop" login="Last Login: 20 April 2025" />
          </NeumorphicCard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const SessionRow = ({
  icon,
  device,
  login,
}: {
  icon: React.ReactNode;
  device: string;
  login: string;
}) => (
  <View style={styles.row}>
    <InnerShadowIcon icon={icon} size={40} radius={20} />
    <View style={styles.infoCol}>
      <Text style={styles.deviceText}>{device}</Text>
      <Text style={styles.loginText}>{login}</Text>
    </View>
    <AppButton
      text="Logout"
      borderWidth={1}
      borderColor={COLORS.ALERT}
      bgColor={COLORS.SURFACE}
      width={72}
      height={30}
      borderRadius={15}
      textStyle={styles.logoutText}
      onPress={() => { }}
    />
  </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 18 },
  cardOuter: { width: "100%", marginBottom: 16 },
  cardInner: { paddingVertical: 12, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_PRIMARY, marginBottom: 8 },
  row: { minHeight: 62, flexDirection: "row", alignItems: "center", gap: 10 },
  infoCol: { flex: 1 },
  deviceText: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_PRIMARY },
  loginText: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_PRIMARY_80 },
  logoutText: { color: COLORS.ALERT, fontSize: 13, fontWeight: "500" },
  divider: { height: 1, backgroundColor: COLORS.TEXT_PRIMARY_10, marginVertical: 10 },
});

export default DeviceSessions;
