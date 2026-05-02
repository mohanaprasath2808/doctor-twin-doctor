import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicSwitch from "../../components/Common/NeumorphicSwitch";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import FaceIdIcon from "../../assets/icons/faceId.svg";
import DoctorBlueIcon from "../../assets/icons/doctorBlueIcon.svg";
import RightArrowIcon from "../../assets/icons/rightArrowIcon.svg";

const PrivacySecurity = () => {
  const navigation = useNavigation<any>();
  const [faceId, setFaceId] = useState(true);

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
          <Text style={styles.headerTitle}>Privacy & Security</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
            <Text style={styles.sectionTitle}>Security Options</Text>
            <View style={styles.row}>
              <InnerShadowIcon icon={<FaceIdIcon width={18} height={18} />} size={40} radius={20} />
              <Text style={styles.rowLabel}>Face ID</Text>
              <NeumorphicSwitch value={faceId} onValueChange={setFaceId} />
            </View>
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.deviceInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.DEVICE_SESSIONS)}
          >
            <InnerShadowIcon icon={<DoctorBlueIcon width={18} height={18} />} size={40} radius={20} />
            <Text style={styles.rowLabel}>Device Sessions</Text>
            <RightArrowIcon width={12} height={12} />
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton title="Save Changes" width="100%" height={48} borderRadius={24} onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  content: { paddingHorizontal: 16, paddingTop: 18 },
  cardOuter: { width: "100%", marginTop: 30 },
  cardInner: { paddingVertical: 12, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_PRIMARY, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", minHeight: 58 },
  rowLabel: { marginLeft: 12, flex: 1, fontSize: 31 / 2, fontWeight: "400", color: COLORS.TEXT_PRIMARY },
  deviceInner: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
  },
  footer: { paddingHorizontal: 16, paddingBottom: Platform.OS === "ios" ? 20 : 16, paddingTop: 8 },
});

export default PrivacySecurity;
