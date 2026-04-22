import React from "react";
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type OpeningItem = {
  id: string;
  name: string;
  meta: string;
  status?: "Critical" | "Pending";
};

const OPENINGS: OpeningItem[] = [
  { id: "1", name: "Sarah Williams", meta: "Female • Age 45", status: "Critical" },
  { id: "2", name: "Sarah Williams", meta: "Female • Age 45", status: "Pending" },
  { id: "3", name: "Sarah Williams", meta: "Female • Age 45" },
  { id: "4", name: "Sarah Williams", meta: "Female • Age 45" },
];

const UrgentOpening = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const renderItem = ({ item }: { item: OpeningItem }) => {
    const isCritical = item.status === "Critical";
    const isPending = item.status === "Pending";

    return (
      <NeumorphicCard
        borderRadius={12}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={styles.cardOuter}
        innerStyle={styles.cardInner}
      >
        <View style={styles.topRow}>
          <View style={styles.personRow}>
            <Image source={DoctorTempImage} style={styles.avatar} />
            <View style={styles.textWrap}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.meta}</Text>
            </View>
          </View>
          {item.status ? (
            <DeltaBadge
              value={item.status}
              height={28}
              radius={14}
              bgColor={isCritical ? "#FDECEC" : "#FFFDF8"}
              darkShadowColor={isCritical ? "rgba(197, 48, 48, 0.35)" : "#EDE0BE"}
              lightShadowColor="#FFFFFFCC"
              textColor={isCritical ? "#C53030" : "#EEB621"}
              textStyle={styles.badgeText}
            />
          ) : null}
        </View>

        <View style={styles.divider} />

        <View style={styles.btnRow}>
          <View style={styles.halfBtn}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={42}
              borderRadius={21}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Call"
              textStyle={styles.callText}
              onPress={() => { }}
            />
          </View>
          <View style={styles.halfBtn}>
            <ReusableButton
              title="Book"
              height={42}
              borderRadius={21}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() => navigation.navigate(navigationStrings.SCHEDULING_FILL_SLOT)}
            />
          </View>
        </View>
      </NeumorphicCard>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Urgent Opening</Text>
            <View style={styles.headerSpacer} />
          </View>

          <FlatList
            data={OPENINGS}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UrgentOpening;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { paddingBottom: 12 },
  container: {},
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  listContent: { paddingBottom: 12, paddingHorizontal: 16 },
  separator: { height: 16 },
  cardOuter: { width: "100%" },
  cardInner: { paddingHorizontal: 10, paddingVertical: 10 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  personRow: { flexDirection: "row", alignItems: "center", flex: 1, minWidth: 0, gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  textWrap: { flex: 1, minWidth: 0 },
  name: { fontSize: 15, fontWeight: "500", color: COLORS.TEXT_DARK },
  meta: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20, marginVertical: 10 },
  btnRow: { flexDirection: "row", gap: 12 },
  halfBtn: { flex: 1, minWidth: 0 },
  callText: { color: COLORS.PRIMARY, fontSize: 15, fontWeight: "600" },
});
