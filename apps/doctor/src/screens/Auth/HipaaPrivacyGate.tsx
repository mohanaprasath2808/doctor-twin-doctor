import React, { useCallback, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicRadioMark from "../../components/Common/NeumorphicRadioMark";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import BackIcon from "../../assets/icon/backArrow.svg";
import WarningIcon from "../../assets/icon/warningIcon.svg";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { useToast } from "react-native-toast-notifications";

const HipaaPrivacyGate = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const [isSecureCompliantAgreed, setIsSecureCompliantAgreed] = useState(false);
  const [isPrivateEnvironmentConfirmed, setIsPrivateEnvironmentConfirmed] = useState(false);

  const handleConfirm = () => {
    toast.hideAll();
    if (!isSecureCompliantAgreed || !isPrivateEnvironmentConfirmed) {
      toast.show("Please agree to the terms and conditions.", { type: "warning" });
      return;
    }
    navigation.navigate(navigationStrings.ENABLE_VOICE_HANDS_FREE);
  };

  //show back blocked toast
  const showBackBlockedToast = useCallback(() => {
    toast.hideAll();
    toast.show("You cannot go back from this screen.", { type: "warning" });
  }, [toast]);
  //block back button
  useFocusEffect(
    useCallback(() => {
      //IOS
      const unsubscribeBeforeRemove = navigation.addListener("beforeRemove", (e: any) => {
        e.preventDefault();
        navigation.goBack();
      });
      //Android
      const backSub = BackHandler.addEventListener("hardwareBackPress", () => {
        showBackBlockedToast();
        return true;
      });
      return () => {
        unsubscribeBeforeRemove();
        backSub.remove();
      };
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HIPAA Privacy Gate</Text>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.wrapper}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.image}
        />

        <NeumorphicCard
          outerStyle={styles.warningOuter}
          innerStyle={styles.warningInner}
          borderRadius={12}
        >
          <Text style={styles.cardTitle}>Warning</Text>
          <View style={styles.warningRow}>
            <InnerShadowIcon icon={<WarningIcon width={20} height={20} />} size={40} radius={20} />
            <Text style={styles.warningText}>This is a private, HIPAA-compliant environment</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.agreeOuter}
          innerStyle={styles.agreeInner}
          borderRadius={12}
        >
          <Text style={styles.cardTitle}>By continuing, you agree:</Text>

          <Pressable
            style={[styles.selectionRow, { marginTop: 25 }]}
            onPress={() => setIsSecureCompliantAgreed(!isSecureCompliantAgreed)}
          >
            <NeumorphicRadioMark selected={isSecureCompliantAgreed} />
            <Text style={styles.selectionText}>
              You are in private, secure and compliant environment to access patient information
            </Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={styles.selectionRow}
            onPress={() => setIsPrivateEnvironmentConfirmed(!isPrivateEnvironmentConfirmed)}
          >
            <NeumorphicRadioMark selected={isPrivateEnvironmentConfirmed} />
            <Text style={styles.selectionText}>Yes, I confirm I am in a private environment</Text>
          </Pressable>
        </NeumorphicCard>

        <ReusableButton
          title="Confirm"
          onPress={handleConfirm}
          containerStyle={styles.confirmBtn}
          backgroundColor="#2E3A8C"
          textColor="#FFFFFF"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HipaaPrivacyGate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
  headerSpacer: {
    width: 42,
  },
  imageContainer: {
    marginTop: 24,
  },
  wrapper: {
    width: 190,
    height: 190,
  },
  overlayImage: {
    borderRadius: 94,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 55,
  },
  warningOuter: {
    marginTop: 30,
  },
  warningInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  warningRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  warningText: {
    flex: 1,
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  agreeOuter: {
    marginTop: 20,
  },
  agreeInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectionRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectionText: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginTop: 16,
  },
  confirmBtn: {
    marginTop: 30,
  },
});
