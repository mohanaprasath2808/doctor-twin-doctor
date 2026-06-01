import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphismProgressTracker, {
  MOCK_PA_PROGRESS_STEPS,
} from "../../../../neomorphism/NeumorphismProgressTracker";

const PAStatusMonitor = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
          <Text style={styles.headerTitle}>PA Status Monitor</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.doctorCardInner}
          borderRadius={14}
        >
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={44}
            containerSize={52}
          />
          <View style={styles.doctorTextCol}>
            <Text style={styles.doctorName}>Dr.Soliman</Text>
            <Text style={styles.doctorRole}>Prior authorization</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.progressCardInner}
          borderRadius={14}
        >
          <NeumorphismProgressTracker steps={MOCK_PA_PROGRESS_STEPS} />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PAStatusMonitor;

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
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  cardOuter: { width: "100%", marginTop: 16 },
  doctorCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doctorTextCol: { flex: 1, minWidth: 0 },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  doctorRole: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  progressCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});
