import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import AppButton from "../../components/Common/AppButton";
import BackIcon from "../../assets/icon/backArrow.svg";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { BackupCodesSessionTimeoutRouteParams } from "../../types/authRoute";
import { useToast } from "react-native-toast-notifications";

type BackupCodeItem = { code: string; isUsed: boolean };

const BackupCodesSessionTimeout = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { backupCodes } = route.params as BackupCodesSessionTimeoutRouteParams;

  const codes: BackupCodeItem[] = useMemo(() => {
    if (!Array.isArray(backupCodes)) return [];
    return backupCodes
      .map((item: any) => {
        if (typeof item === "string") return { code: item, isUsed: false };
        return { code: String(item?.code ?? ""), isUsed: Boolean(item?.isUsed) };
      })
      .filter((v) => v.code.trim().length > 0);
  }, [backupCodes]);

  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const ListHeader = useCallback(
    () => (
      <>
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Backup Codes / Session Timeout</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.wrapper}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.image}
        />

        <Text style={styles.title}>Verify to restore access</Text>
      </>
    ),
    [navigation],
  );

  const ListFooter = useCallback(
    () => (
      <>
        <Text style={styles.helperText}>Enter your 4-digit secure session PIN below</Text>

        <AppButton
          text="Use Backup code"
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.actionText}
          style={styles.actionBtn}
          onPress={() => {
            if (!selectedCode) {
              toast.show("Select a backup code first.", { type: "warning" });
              return;
            }
            navigation.navigate(navigationStrings.DEVICE_TRUST_VERIFICATION, {
              prefillOtp: selectedCode,
            });
          }}
        />

        <AppButton
          text="Need Help?"
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.actionText}
          style={styles.helpBtn}
          onPress={() => navigation.navigate(navigationStrings.EMERGENCY_ACCESS)}
        />

        <Text style={styles.footerText}>Unverified session timed out Login again to continue</Text>
      </>
    ),
    [navigation, selectedCode, toast],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={codes}
        keyExtractor={(item) => item.code}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.codesRow}
        renderItem={({ item }) => {
          const isSelected = selectedCode === item.code;
          const isDisabled = item.isUsed;
          return (
          <Pressable
            style={[styles.codePress, isDisabled && styles.codeDisabled]}
            disabled={isDisabled}
            onPress={() => setSelectedCode(item.code)}
          >
            <NeumorphicCard
              outerStyle={styles.codeOuter}
              innerStyle={[styles.codeInner, isSelected && styles.codeInnerSelected]}
              borderRadius={12}
              backgroundColor={isSelected ? "#E6F0FF" : COLORS.SURFACE}
            >
              <Text style={[styles.codeText, isDisabled && styles.codeTextDisabled]}>{item.code}</Text>
            </NeumorphicCard>
          </Pressable>
        );
        }}
      />
    </SafeAreaView>
  );
};

export default BackupCodesSessionTimeout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
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
  },
  headerSpacer: {
    width: 40,
  },
  imageContainer: {
    marginTop: 20,
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
  title: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 20,
    fontWeight: "500",
  },
  codesRow: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  codePress: {
    width: "48.2%",
  },
  codeOuter: {
    width: "100%",
  },
  codeInner: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  codeText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 20,
    fontWeight: "500",
  },
  codeInnerSelected: {},
  codeDisabled: {
    opacity: 0.45,
  },
  codeTextDisabled: {
    color: COLORS.TEXT_60,
  },
  helperText: {
    marginTop: 6,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
  },
  actionBtn: {
    marginTop: 16,
    height: 50,
    borderRadius: 25,
  },
  helpBtn: {
    marginTop: 12,
    height: 50,
    borderRadius: 25,
  },
  actionText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  footerText: {
    marginTop: 16,
    textAlign: "center",
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
  },
});
