import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import AppButton from "../../components/Common/AppButton";
import IconComponent from "../../neomorphism/IconComponent";
import NeumorphicRadioMark from "../../neomorphism/NeumorphicRadioMark";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

type TicketCategory = "billing" | "technical" | "medical";

const CATEGORIES: { id: TicketCategory; label: string }[] = [
  { id: "billing", label: "Billing Question" },
  { id: "technical", label: "Technical Issue" },
  { id: "medical", label: "Medical Question" },
];

const SupportTicket = () => {
  const navigation = useNavigation<any>();
  const [category, setCategory] = useState<TicketCategory>("billing");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Support Ticket</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeading}>Category</Text>
          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
            {CATEGORIES.map((item, index) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.categoryRow, pressed && styles.pressed]}
                onPress={() => setCategory(item.id)}
              >
                <NeumorphicRadioMark selected={category === item.id} />
                <Text style={styles.categoryText}>{item.label}</Text>
                {index < CATEGORIES.length - 1 ? <View style={styles.divider} /> : null}
              </Pressable>
            ))}
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.descOuter} innerStyle={styles.descInner} borderRadius={12}>
            <Text style={styles.sectionHeading}>Description</Text>
            <Text style={styles.inputLabel}>Description</Text>
            <InputField
              value={description}
              onChangeText={setDescription}
              placeholder="Briefly describe your issue"
              multiline
              numberOfLines={4}
              minHeight={120}
              borderRadius={10}
              containerStyle={styles.descInput}
            />
          </NeumorphicCard>

          <View style={styles.attachWrap}>
            <Text style={styles.inputLabel}>Attachments</Text>
            <AppButton
              text="+ Attach file"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              width="100%"
              height={44}
              borderRadius={22}
              textStyle={styles.attachText}
              onPress={() => { }}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton
            title="Submit Ticket"
            width="100%"
            height={48}
            borderRadius={24}
            onPress={() =>
              navigation.navigate(navigationStrings.TICKET_SUBMISSION, {
                title: "Ticket submission",
                message: "Ticket submitted",
                subtitle: "We'll get back within 24 hours",
                secondaryButtonLabel: "Back to Settings",
                secondaryButtonRoute: navigationStrings.SETTINGS,
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 },
  sectionHeading: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_PRIMARY, marginBottom: 10 },
  cardOuter: { width: "100%", marginTop: 14 },
  cardInner: { paddingVertical: 4, paddingHorizontal: 10 },
  categoryRow: { minHeight: 62, flexDirection: "row", alignItems: "center" },
  pressed: { opacity: 0.92 },
  categoryText: { marginLeft: 12, flex: 1, fontSize: 14, fontWeight: "500", color: COLORS.TEXT_PRIMARY },
  divider: { position: "absolute", left: 0, right: 0, bottom: 0, height: 1, backgroundColor: COLORS.TEXT_PRIMARY_10 },
  descOuter: { marginTop: 20 },
  descInner: { paddingVertical: 12, paddingHorizontal: 10 },
  inputLabel: { fontSize: 14, fontWeight: "400", color: COLORS.TEXT_PRIMARY_60, marginBottom: 6 },
  descInput: { marginTop: 0 },
  attachWrap: { marginTop: 20 },
  attachText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  footer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: Platform.OS === "ios" ? 20 : 16 },
});

export default SupportTicket;
