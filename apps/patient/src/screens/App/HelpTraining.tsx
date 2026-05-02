import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import AppButton from "../../components/Common/AppButton";
import IconComponent from "../../neomorphism/IconComponent";
import { COLORS } from "../../constants/theme";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import AppointmentDummyImage from "../../assets/images/tempImage/teachingImg.png";
import NeumorphicInnerShadowCard from "../../neomorphism/NeumorphicInnerShadowCard";

const HELP_ITEMS = [
  { id: "book", title: "How to book appointment", duration: "10 mins" },
  { id: "labs", title: "How to view lab results", duration: "10 mins" },
  { id: "bill", title: "How to pay bill", duration: "10 mins" },
];

const HelpTraining = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Help & Training</Text>
          <View style={styles.headerSpacer} />
        </View>

        {HELP_ITEMS.map((item) => (
          <NeumorphicCard key={item.id} outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
            <NeumorphicInnerShadowCard darkShadowColor={"#C1D5EE"} darkShadowBlur={40} contentStyle={{ padding: 2 }} borderRadius={12}>
              <Image source={AppointmentDummyImage} style={styles.bannerImage} />
            </NeumorphicInnerShadowCard>
            <View style={styles.cardBottom}>
              <View style={styles.textCol}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.duration}</Text>
              </View>
              <AppButton
                text="Watch Video"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                width={120}
                height={38}
                borderRadius={19}
                textStyle={styles.watchText}
                onPress={() => { }}
              />
            </View>
          </NeumorphicCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 18 },
  header: {
    marginTop: Platform.OS === "ios" ? 0 : 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  cardOuter: { width: "100%", marginBottom: 16 },
  cardInner: { paddingVertical: 12, paddingHorizontal: 12 },
  bannerImage: { width: "100%", height: 128, borderRadius: 12, resizeMode: "cover" },
  cardBottom: { marginTop: 12, flexDirection: "row", alignItems: "center", gap: 8 },
  textCol: { flex: 1 },
  cardTitle: { fontSize: 31 / 2, fontWeight: "500", color: COLORS.TEXT_PRIMARY },
  cardSub: { marginTop: 2, fontSize: 13, fontWeight: "400", color: COLORS.TEXT_PRIMARY_70 },
  watchText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "500" },
});

export default HelpTraining;
