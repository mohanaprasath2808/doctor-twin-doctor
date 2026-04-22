import React, { useMemo, useState } from "react";
import { FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type Candidate = {
  id: string;
  name: string;
  reason: string;
};

const CANDIDATES: Candidate[] = [
  { id: "annie-1", name: "Annie", reason: "Lymme panel screening issued" },
  { id: "eva", name: "Eva", reason: "I summarize due need for hypothyridism medication schedules medication" },
  { id: "nathan", name: "Nathan Adams", reason: "Lymme panel screening issued" },
  { id: "sarah", name: "Sarah Williams", reason: "Lymme panel screening issued" },
  { id: "michelle", name: "Michelle Lewis", reason: "Lymme panel screening issued" },
  { id: "annie-2", name: "Annie", reason: "Lymme panel screening issued" },
];

const FillSlot = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(CANDIDATES[0].id);

  const selectedPatient = useMemo(
    () => CANDIDATES.find((c) => c.id === selectedId) ?? CANDIDATES[0],
    [selectedId],
  );

  const bottomPad = Math.max(insets.bottom, 12) + 8;

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
          <Text style={styles.headerTitle}>Fill slot</Text>
          <View style={styles.headerSpacer} />
        </View>

          <FlatList
            data={CANDIDATES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <Pressable onPress={() => setSelectedId(item.id)}>
                <NeumorphicCard
                  borderRadius={12}
                  backgroundColor={COLORS.INNER_SURFACE}
                  outerStyle={styles.cardOuter}
                  innerStyle={styles.cardInner}
                >
                  <View style={styles.row}>
                    <NeumorphicRadioMark selected={selectedId === item.id} />
                    <Image source={DoctorTempImage} style={styles.avatar} />
                    <View style={styles.textWrap}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.reason} numberOfLines={2}>
                        {`Reason: ${item.reason}`}
                      </Text>
                    </View>
                  </View>
                </NeumorphicCard>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title={selectedPatient ? "Book Now" : "Book Now"}
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() => navigation.navigate(navigationStrings.SCHEDULING_ASSIGN_TASK)}
        />
      </View>
    </SafeAreaView>
  );
};

export default FillSlot;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
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
  listContent: { paddingBottom: 8, paddingHorizontal: 16 },
  separator: { height: 12 },
  cardOuter: { width: "100%" },
  cardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  textWrap: { flex: 1, minWidth: 0 },
  name: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  reason: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70, lineHeight: 18 },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.INNER_SURFACE },
});
