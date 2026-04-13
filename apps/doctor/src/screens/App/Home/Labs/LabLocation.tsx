import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import {
  openGoogleMapsByCoords,
  openPhoneDialer,
} from "../../../../constants/contant";

const LAB_COORDS = { latitude: 43.0481, longitude: -76.1474 };
const LAB_PHONE = "(406) 555-0120";

const LabLocation = () => {
  const navigation = useNavigation<any>();
  const onOpenGoogleMaps = async () => {
    await openGoogleMapsByCoords(LAB_COORDS.latitude, LAB_COORDS.longitude);
  };
  const onCallLab = async () => {
    await openPhoneDialer(LAB_PHONE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Lab Location</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.content}>
        <NeumorphicCard
          outerStyle={styles.locationInfoOuter}
          innerStyle={styles.locationInfoInner}
          borderRadius={10}
        >
          <View style={styles.locationTopRow}>
            <Image source={DoctorTempImage} style={styles.labImage} />
            <View style={styles.labInfoTextWrap}>
              <Text style={styles.labName}>Quest Diagnostics</Text>
              <Text style={styles.labAddress}>
                2118 Thornridge Cir. Syracuse,{"\n"}Connecticut 35624
              </Text>
            </View>
          </View>
          <Text style={styles.phoneText}>{LAB_PHONE}</Text>
        </NeumorphicCard>
        <NeumorphicCard
          outerStyle={styles.mapOuter}
          innerStyle={styles.mapInner}
          borderRadius={12}
        >
          <Text style={styles.mapTitle}>Map</Text>
          <Pressable style={styles.mapPreview} onPress={onOpenGoogleMaps}>
            <Text style={styles.mapPreviewText}>Open in Google Maps</Text>
          </Pressable>
        </NeumorphicCard>
        <View style={styles.buttonRow}>
          <View style={styles.buttonHalf}>
            <AppButton
              text="Direction"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.directionText}
              style={styles.actionButton}
              onPress={onOpenGoogleMaps}
            />
          </View>
          <View style={styles.buttonHalf}>
            <ReusableButton
              title="Call Lab"
              containerStyle={styles.actionButton}
              textStyle={styles.callText}
              onPress={onCallLab}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LabLocation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  content: { paddingHorizontal: 16, gap: 16 },
  locationInfoOuter: { width: "100%" },
  locationInfoInner: { padding: 12 },
  locationTopRow: { flexDirection: "row", alignItems: "center" },
  labImage: { width: 60, height: 60, borderRadius: 30 },
  labInfoTextWrap: { marginLeft: 12, flex: 1 },
  labName: { fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500" },
  labAddress: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.TEXT_80,
    fontWeight: "400",
    lineHeight: 20,
  },
  phoneText: {
    marginTop: 1,
    marginLeft: 72,
    fontSize: 14,
    color: COLORS.TEXT_80,
    fontWeight: "400",
    lineHeight: 20,
  },
  mapOuter: { width: "100%" },
  mapInner: { paddingVertical: 12, paddingHorizontal: 10 },
  mapTitle: {
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
    marginBottom: 10,
  },
  mapPreview: {
    height: 170,
    borderRadius: 10,
    backgroundColor: "#E8EDF3",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPreviewText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonRow: { marginTop: 10, flexDirection: "row", gap: 12 },
  buttonHalf: { flex: 1 },
  actionButton: { height: 48, borderRadius: 24 },
  directionText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  callText: { color: COLORS.WHITE, fontSize: 16, fontWeight: "600" },
});
