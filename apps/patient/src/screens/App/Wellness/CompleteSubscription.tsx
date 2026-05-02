import React, { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import NeumorphicCheckboxMark from "../../../components/Auth/NeumorphicCheckboxMark";
import InputField from "../../../neomorphism/InputField";
import DatePickerField from "../../../neomorphism/DatePickerField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import BirthIcon from "../../../assets/icons/birth.svg";
import NeumorphicRadioMark from "../../../neomorphism/NeumorphicRadioMark";

type PaymentMethod = "card" | "apple" | "google" | "phonepe";

const PAYMENT_METHODS: { id: PaymentMethod; label: string }[] = [
  { id: "card", label: "Card" },
  { id: "apple", label: "Apple Pay" },
  { id: "google", label: "Google Pay" },
  { id: "phonepe", label: "PhonePe" },
];

const CompleteSubscription = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [saveCard, setSaveCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState<Date | null>(null);
  const [cvv, setCvv] = useState("");

  const planTitle = useMemo(() => route?.params?.planTitle ?? "Glow Membership", [route?.params?.planTitle]);
  const planPrice = useMemo(() => route?.params?.planPrice ?? "$49/month", [route?.params?.planPrice]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Complete Subscription</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <NeumorphicCard outerStyle={styles.membershipCardOuter} innerStyle={styles.membershipCardInner} borderRadius={12}>
          <NeumorphicInnerShadowCard borderRadius={12} containerStyle={styles.planInsetOuter} contentStyle={styles.planInsetInner}>
            <Text style={styles.planTitle}>{planTitle}</Text>
            <Text style={styles.planLabel}>Plan</Text>
          </NeumorphicInnerShadowCard>

          <NeumorphicInnerShadowCard borderRadius={12} containerStyle={styles.planInsetOuter} contentStyle={styles.planInsetInner}>
            <Text style={styles.priceTitle}>{planPrice}</Text>
            <Text style={styles.planLabel}>Price</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.paymentOuter} innerStyle={styles.paymentInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>

          {PAYMENT_METHODS.map((item, index) => {
            const selected = paymentMethod === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setPaymentMethod(item.id)}
                style={({ pressed }) => [styles.methodRow, pressed && styles.rowPressed]}
              >
                <NeumorphicRadioMark selected={selected} />
                <Text style={styles.methodText}>{item.label}</Text>
                {index < PAYMENT_METHODS.length - 1 ? <View style={styles.rowDivider} /> : null}
              </Pressable>
            );
          })}
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardDetailsOuter} innerStyle={styles.cardDetailsInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Card Details</Text>

          <Text style={styles.inputLabel}>Card number</Text>
          <InputField
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="Enter Card number"
            keyboardType="number-pad"
            height={44}
            containerStyle={styles.inputField}
          />

          <View style={styles.row2}>
            <View style={styles.row2Item}>
              <Text style={styles.inputLabel}>Expiry date</Text>
              <DatePickerField
                value={expiry}
                onChange={setExpiry}
                placeholder="MM/YYYY"
                leftIcon={<BirthIcon width={16} height={16} />}
                containerStyle={styles.inputField}
              />
            </View>
            <View style={styles.row2Item}>
              <Text style={styles.inputLabel}>CVV</Text>
              <InputField
                value={cvv}
                onChangeText={setCvv}
                placeholder="Enter CVV"
                keyboardType="number-pad"
                height={44}
                containerStyle={styles.inputField}
              />
            </View>
          </View>

          <Pressable style={styles.saveRow} onPress={() => setSaveCard((v) => !v)}>
            <NeumorphicCheckboxMark selected={saveCard} />
            <Text style={styles.saveText}>Save for future</Text>
          </Pressable>
        </NeumorphicCard>

        <View style={styles.footer}>
          <ReusableButton
            title="Subscribe Now"
            height={48}
            borderRadius={24}
            width="100%"
            onPress={() =>
              navigation.navigate(navigationStrings.SUBSCRIPTION_COMPLETED, {
                title: "Subscription Completed",
                message: "You're now a member!",
                subtitle: "Benefits activated",
                primaryButtonLabel: "View Benefits",
                primaryButtonRoute: navigationStrings.MEMBERSHIP,
                secondaryButtonLabel: "Back to Wellness",
                secondaryButtonRoute: navigationStrings.WELLNESS_MEDSPA,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Platform.OS === "ios" ? 20 : 16 },
  avatarWrap: { alignItems: "center", marginTop: 12 },
  avatarWrapper: { width: 200, height: 200 },
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
  membershipCardOuter: { marginTop: 8, marginHorizontal: 16 },
  membershipCardInner: { padding: 10, borderRadius: 12 },
  planInsetOuter: { marginBottom: 10 },
  planInsetInner: { alignItems: "center", paddingVertical: 12, paddingHorizontal: 10 },
  planTitle: { fontSize: 20, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  priceTitle: { fontSize: 22, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  planLabel: { marginTop: 4, fontSize: 14, fontWeight: "500", color: COLORS.TEXT_PRIMARY_70 },
  sectionTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  paymentOuter: { marginTop: 20, marginHorizontal: 16 },
  paymentInner: { paddingVertical: 4, paddingHorizontal: 10 },
  methodRow: {
    minHeight: 56,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  rowPressed: { opacity: 0.92 },
  methodText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  rowDivider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  cardDetailsOuter: { marginTop: 20, marginHorizontal: 16 },
  cardDetailsInner: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  inputLabel: {
    marginTop: 10,
    marginLeft: 2,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_60,
    fontWeight: "400",
  },
  inputField: {
    marginTop: 6,
    height: 44,
  },
  row2: {
    marginTop: 2,
    flexDirection: "row",
    gap: 10,
  },
  row2Item: {
    flex: 1,
  },
  saveRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  saveText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  footer: {
    marginTop: 30,
    marginHorizontal: 16,
  },
});

export default CompleteSubscription;
