import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowView from "../../../components/neomorphism/InnerShadowView";
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

const Cancellation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(CANDIDATES[0]?.id ?? "");
  const [slotInputW, setSlotInputW] = useState(0);

  const onSlotLayout = useCallback((e: LayoutChangeEvent) => {
    setSlotInputW(e.nativeEvent.layout.width);
  }, []);

  const selectedPatient = useMemo(
    () => CANDIDATES.find((c) => c.id === selectedId) ?? CANDIDATES[0],
    [selectedId],
  );

  const renderCandidate = useCallback(
    ({ item }: { item: Candidate }) => (
      <Pressable style={styles.rowPress} onPress={() => setSelectedId(item.id)}>
        <View style={styles.patientRow}>
          <NeumorphicRadioMark selected={selectedId === item.id} />
          <Image source={DoctorTempImage} style={styles.avatar} />
          <View style={styles.patientCenter}>
            <Text style={styles.patientName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.reason} numberOfLines={2}>
              {`Reason: ${item.reason}`}
            </Text>
          </View>
        </View>
      </Pressable>
    ),
    [selectedId],
  );

  const bottomPad = Math.max(insets.bottom, 12) + 10;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Cancellation</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          borderRadius={12}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.sectionOuter}
          innerStyle={styles.sectionInner}
        >
          <Text style={styles.sectionTitle}>Slot Available</Text>
          <View style={styles.slotInputWrap} onLayout={onSlotLayout}>
            {slotInputW > 0 ? (
              <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <InnerShadowView
                  width={slotInputW}
                  height={40}
                  borderRadius={10}
                  color={COLORS.INNER_SURFACE}
                />
              </View>
            ) : null}
            <Text style={styles.slotValue}>23</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          borderRadius={12}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.sectionOuter}
          innerStyle={styles.sectionInner}
        >
          <Text style={styles.sectionTitle}>Suggested Patients</Text>
          <FlatList
            data={CANDIDATES}
            keyExtractor={(item) => item.id}
            renderItem={renderCandidate}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        </NeumorphicCard>
      </View>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title={selectedPatient ? "Book Replacement" : "Book Replacement"}
          height={50}
          borderRadius={25}
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() => navigation.navigate(navigationStrings.SCHEDULING)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cancellation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
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
  headerSpacer: {
    width: 40,
    height: 40,
  },
  sectionOuter: {
    marginBottom: 16,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 32 / 2,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
  },
  slotInputWrap: {
    position: "relative",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  slotValue: {
    fontSize: 24 / 2,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    zIndex: 1,
  },
  listContent: {
    paddingTop: 2,
  },
  rowPress: {
    paddingVertical: 8,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientCenter: {
    flex: 1,
    minWidth: 0,
  },
  patientName: {
    fontSize: 30 / 2,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  reason: {
    marginTop: 2,
    fontSize: 24 / 2,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
});
