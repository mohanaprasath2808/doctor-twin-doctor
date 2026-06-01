import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const AppealCreated = () => {
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
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>Appeal created</Text>
        <Text style={styles.subTitle}>
          Your Build Appeal has been created successfully!
        </Text>

        <ReusableButton
          title="Done"
          width="100%"
          height={48}
          borderRadius={24}
          containerStyle={styles.doneBtn}
          textStyle={styles.doneBtnText}
          onPress={() =>
            navigation.navigate(navigationStrings.PRIOR_AUTHORIZATION)
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppealCreated;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    flexGrow: 1,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSpacer: { width: 40, height: 40 },
  avatarWrap: { alignItems: "center", marginTop: 40 },
  avatarWrapper: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "contain",
  },
  title: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  subTitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
    paddingHorizontal: 24,
  },
  doneBtn: { marginTop: 32 },
  doneBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
