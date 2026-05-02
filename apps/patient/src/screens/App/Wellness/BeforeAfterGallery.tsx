import React from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../neomorphism/IconComponent";
import BeforeAfterTreatmentCard from "./components/BeforeAfterTreatmentCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const GALLERY_ITEMS = [
  { id: "1", title: "Juvederm Lip Fillers", subtitle: "Fuller Lips" },
  { id: "2", title: "Juvederm Lip Fillers", subtitle: "Fuller Lips" },
  { id: "3", title: "Juvederm Lip Fillers", subtitle: "Fuller Lips" },
];

const BeforeAfterGallery = () => {
  const navigation = useNavigation<any>();

  const goToResult = (item: { title: string; subtitle: string }) => {
    navigation.navigate(navigationStrings.TREATMENT_RESULT, { treatment: item });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Before & After Gallery</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.heading}>Join our wellness membership to{"\n"}save and benefit</Text>

        <FlatList
          data={GALLERY_ITEMS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <BeforeAfterTreatmentCard
              title={item.title}
              subtitle={item.subtitle}
              onPressAction={() => goToResult(item)}
              onPressCard={() => goToResult(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.list}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 12,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    resizeMode: "cover",
  },
  heading: {
    marginTop: 8,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 22,
  },
  separator: {
    height: 14,
  },
  list: {
    padding: 16,
  },
});

export default BeforeAfterGallery;
