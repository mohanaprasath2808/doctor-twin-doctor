import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InputField from "../../../neomorphism/InputField";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import ReusableButton from "../../../neomorphism/ReusableButton";
import NeumorphicRadioMark from "../../../neomorphism/NeumorphicRadioMark";

type RequestType = "mine" | "provider";

const RequestRecords = () => {
  const navigation = useNavigation<any>();
  const [requestType, setRequestType] = useState<RequestType>("mine");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [emailFax, setEmailFax] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Request Records</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.sectionTitle}>Request Type</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.requestTypeInner} borderRadius={10}>
          <Pressable style={styles.optionRow} onPress={() => setRequestType("mine")}>
            <NeumorphicRadioMark selected={requestType === "mine"} />
            <Text style={styles.optionLabel}>Request My Records</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.optionRow} onPress={() => setRequestType("provider")}>
            <NeumorphicRadioMark selected={requestType === "provider"} />
            <Text style={styles.optionLabel}>Send to Provider</Text>
          </Pressable>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.formCardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Provider Details</Text>
          <Text style={styles.fieldLabel}>Name</Text>
          <InputField
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            containerStyle={styles.fieldInput}
          />
          <Text style={styles.fieldLabel}>Clinic</Text>
          <InputField
            value={clinic}
            onChangeText={setClinic}
            placeholder="Enter clinic"
            containerStyle={styles.fieldInput}
          />
          <Text style={styles.fieldLabel}>Email / Fax</Text>
          <InputField
            value={emailFax}
            onChangeText={setEmailFax}
            placeholder="Enter email / fax"
            containerStyle={styles.fieldInput}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.formCardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.fieldLabel}>Notes</Text>
          <InputField
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter notes"
            multiline
            numberOfLines={5}
            minHeight={120}
            borderRadius={14}
            containerStyle={styles.fieldInput}
          />
        </NeumorphicCard>

        <ReusableButton
          title="Submit Request"
          containerStyle={styles.submitBtn}
          onPress={() => undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestRecords;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardOuter: {
    marginTop: 10,
    width: "100%",
  },
  cardGap: {
    marginTop: 16,
  },
  requestTypeInner: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginLeft: 50,
  },
  formCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 14,
  },
  fieldLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  fieldInput: {
    marginTop: 6,
  },
  submitBtn: {
    marginTop: 20,
    height: 48,
    borderRadius: 24,
  },
});
