import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import GreenTickImage from "../../../assets/images/greenTick.png";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import navigationStrings from "../../../constants/navigationStrings";

const AppointmentScheduled = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const title = route?.params?.title || "Appointment Scheduled!";
  const message =
    route?.params?.message || "You're all set, Sarah.\nSee you on Monday, April 30 at 3:00 PM.";
  const [blocking, setBlocking] = useState(false);

  const withPopup = useCallback((fn: () => void) => {
    setBlocking(true);
    // allow the modal to render before navigating
    requestAnimationFrame(() => {
      fn();
      setTimeout(() => setBlocking(false), 350);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Modal visible={blocking} transparent animationType="fade">
        <View style={styles.blockingOverlay}>
          <View style={styles.blockingCard}>
            <ActivityIndicator size="small" color={COLORS.PRIMARY} />
            <Text style={styles.blockingText}>Opening appointments...</Text>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Appointment Scheduled</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            containerStyle={styles.imageContainer}
            wrapperStyle={styles.avatarWrap}
            overlayStyle={styles.overlayImage}
            imageStyle={styles.avatarImage}
          />

          <Text style={styles.title}>{String(title)}</Text>
          <Text style={styles.subtitle}>{String(message)}</Text>

          <View style={styles.actionRow}>
            <AppButton
              text="Add to Calender"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.addToCalendarText}
              height={48}
              borderRadius={28}
              style={styles.actionBtn}
              onPress={() => withPopup(() => navigation.navigate(navigationStrings.APPOINTMENTS))}
            />
            <ReusableButton
              title="Done"
              gradientColors={["#22D3EE", "#0F766E"]}
              height={48}
              borderRadius={28}
              containerStyle={styles.actionBtn}
              onPress={() => withPopup(() => navigation.pop(4))}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    paddingHorizontal: 16,
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
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  actionRow: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
  addToCalendarText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  blockingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  blockingCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  blockingText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  avatarWrap: {
    width: 230,
    height: 230,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  avatarImage: {
    width: 142,
    height: 142,
    resizeMode: "contain",
    borderRadius: 110,
  },
});

export default AppointmentScheduled;
