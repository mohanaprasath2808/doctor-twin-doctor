import React, { useCallback } from "react";
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const PATIENT_NAME = "Sarah Williams";
const PATIENT_AGE = 45;
const PATIENT_ROOM = "5";

const NOTE_LINES = ["Chest pain on exertion", "Hypertension uncontrolled"];

const NOTE_SECTIONS = [
  { id: "1", title: "Callback summary" },
  { id: "2", title: "Symptoms discussed" },
  { id: "3", title: "Instructions given" },
  { id: "4", title: "Follow-up recommendations" },
] as const;

const FOOTER_ACTIONS = [
  { key: "follow-up", label: "Create follow-up task" },
  { key: "resolved", label: "Mark resolved" },
  { key: "escalate", label: "Escalate to doctor" },
  { key: "send", label: "Send patient" },
] as const;

const CallPatientAutoNote = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + 12;
  const noop = useCallback(() => {}, []);

  const listHeader = (
    <>
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Auto Note</Text>
        <View style={styles.headerSpacer} />
      </View>

      <NeumorphicCard
        borderRadius={12}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={styles.patientCardOuter}
        innerStyle={styles.patientCardInner}
      >
        <View style={styles.patientRow}>
          <Image source={DoctorTempImage} style={styles.patientAvatar} />
          <View style={styles.patientTextWrap}>
            <Text style={styles.patientName}>{PATIENT_NAME}</Text>
            <View style={styles.patientMetaRow}>
              <Text style={styles.patientMeta}>Age {PATIENT_AGE}</Text>
              <View style={styles.patientMetaSeparator} />
              <Text style={styles.patientMeta}>Room: {PATIENT_ROOM}</Text>
            </View>
          </View>
        </View>
      </NeumorphicCard>
    </>
  );

  const renderSection = useCallback(
    ({ item }: { item: (typeof NOTE_SECTIONS)[number] }) => (
      <NeumorphicCard
        borderRadius={12}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={styles.sectionOuter}
        innerStyle={styles.sectionInner}
      >
        <Text style={styles.sectionTitle}>{item.title}</Text>
        <NeumorphicInnerShadowCard
          borderRadius={10}
          containerStyle={styles.noteShadowOuter}
          contentStyle={styles.noteShadowInner}
          darkShadowColor="#C8CBCC99"
          lightShadowColor="#FFFFFFCC"
        >
          {NOTE_LINES.map((line, lineIndex) => (
            <Text
              key={`${item.id}-${line}`}
              style={[styles.noteLine, lineIndex === 0 && styles.noteLineFirst]}
            >
              {line}
            </Text>
          ))}
        </NeumorphicInnerShadowCard>
      </NeumorphicCard>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView style={styles.body}>
        <FlatList
          data={NOTE_SECTIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderSection}
          ListHeaderComponent={listHeader}
          contentContainerStyle={[styles.listContent, { paddingBottom: 16 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text={FOOTER_ACTIONS[0].label}
                textStyle={styles.outlineBtnText}
                onPress={noop}
              />
            </View>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text={FOOTER_ACTIONS[1].label}
                textStyle={styles.outlineBtnText}
                onPress={noop}
              />
            </View>
          </View>
          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text={FOOTER_ACTIONS[2].label}
                textStyle={styles.outlineBtnText}
                onPress={noop}
              />
            </View>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text={FOOTER_ACTIONS[3].label}
                textStyle={styles.outlineBtnText}
                onPress={noop}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CallPatientAutoNote;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flexGrow: 1,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  patientCardOuter: {
    width: "100%",
    marginBottom: 16,
    marginTop: 16,
  },
  patientCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  patientTextWrap: {
    flex: 1,
    marginLeft: 10,
    minWidth: 0,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  patientMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    flexWrap: "wrap",
    gap: 6,
  },
  patientMeta: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Text-Regular",
  },
  patientMetaSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
  },
  separator: {
    height: 0,
  },
  sectionOuter: {
    width: "100%",
    marginBottom: 16,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 10,
    fontFamily: "SF-Pro-Text-Medium",
  },
  noteShadowOuter: {
    width: "100%",
  },
  noteShadowInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  noteLine: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginTop: 4,
    fontFamily: "SF-Pro-Text-Medium",
  },
  noteLineFirst: {
    marginTop: 0,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
  },
  footerRow: {
    flexDirection: "row",
    gap: 10,
  },
  footerHalf: {
    flex: 1,
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
