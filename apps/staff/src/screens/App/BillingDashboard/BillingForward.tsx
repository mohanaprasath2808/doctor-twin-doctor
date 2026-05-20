import React, { useMemo, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";

const BG = COLORS.INNER_SURFACE;

const STAFF = [
  { id: "eva", name: "Dr. Eva", subtitle: "" as string | undefined },
  { id: "jenn", name: "Jenn P", subtitle: "Office manager" },
  { id: "annie1", name: "Dr. Annie", subtitle: "" },
  { id: "annie2", name: "Annie", subtitle: "Medical Assistant" },
] as const;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.BILLING_FORWARD>;

const BillingForward = ({ route, navigation }: Props) => {
  const item = route.params.item;
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string>(STAFF[0].id);
  const [notes, setNotes] = useState("");

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Forward</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.column}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.content, { paddingBottom: 16 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {header}

            <PatientDetailCard item={item} outerStyle={styles.patientCardOuter} />

            <NeumorphicCard borderRadius={10} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.listInner}>
              <FlatList
                data={[...STAFF]}
                keyExtractor={(s) => s.id}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({ item: row }) => (
                  <Pressable style={styles.staffRow} onPress={() => setSelectedId(row.id)}>
                    <NeumorphicRadioMark selected={selectedId === row.id} />
                    <Image source={DoctorTempImage} style={styles.staffAvatar} />
                    <View style={styles.staffText}>
                      <Text style={styles.staffName}>{row.name}</Text>
                      {row.subtitle ? <Text style={styles.staffSubtitle}>{row.subtitle}</Text> : null}
                    </View>
                  </Pressable>
                )}
              />
            </NeumorphicCard>

            <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.sectionTitle}>Your Notes</Text>
              <InputField
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={5}
                minHeight={100}
                borderRadius={10}
                isFocused={false}
                containerStyle={styles.inputNoTop}
                placeholder="Enter notes"
              />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Forward"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigation.navigate(navigationStrings.BILLING_ACTION_COMPLETED, {
                  title: "Action completed",
                  description: "The task has been forwarded successfully",
                  buttonText: "Back to Billing",
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BillingForward;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  keyboardRoot: { flex: 1 },
  column: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, flexGrow: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: { marginTop: 20 },
  sectionOuter: { width: "100%", marginTop: 14 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 14 },
  listInner: { paddingHorizontal: 12, paddingVertical: 4 },
  sectionTitle: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  inputNoTop: { marginTop: 0 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginLeft: 52,
  },
  staffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  staffAvatar: { width: 40, height: 40, borderRadius: 20 },
  staffText: { flex: 1, minWidth: 0, gap: 2 },
  staffName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  staffSubtitle: { fontSize: 12, color: COLORS.TEXT_60, fontFamily: "SF-Pro-Display-Regular" },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
