import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import InputField from "../../../../neomorphism/InputField";
import DatePickerField from "../../../../neomorphism/DatePickerField";
import TimePickerField from "../../../../components/Common/TimePickerField";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import MinusIcon from "../../../../assets/icon/minus.svg";
import PlusIcon from "../../../../assets/icon/plus.svg";
import WarningIcon from "../../../../assets/icon/warningIcon.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import PharmacyIcon from "../../../../assets/icon/pharmacyIcon.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import TimerIcon from "../../../../assets/icon/timerIcon.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import navigationStrings from "../../../../constants/navigationStrings";

type CounterRow = {
  id: "qty" | "refills";
  title: string;
  subTitle: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const SendRefill = () => {
  const navigation = useNavigation<any>();
  const [qtyCount, setQtyCount] = useState(1);
  const [refillCount, setRefillCount] = useState(1);
  const [dose, setDose] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const counterRows: CounterRow[] = [
    {
      id: "qty",
      title: "Qty",
      subTitle: "#90 tablets",
      value: qtyCount,
      onDecrement: () => setQtyCount((v) => Math.max(0, v - 1)),
      onIncrement: () => setQtyCount((v) => v + 1),
    },
    {
      id: "refills",
      title: "Refills",
      subTitle: "3 remaining",
      value: refillCount,
      onDecrement: () => setRefillCount((v) => Math.max(0, v - 1)),
      onIncrement: () => setRefillCount((v) => v + 1),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Send Refill</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={10}>
          <View style={styles.patientRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={60} containerSize={60} middleRingGap={0} outerRingExtra={0} />
            <View>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.rxOuter} innerStyle={styles.rxInner} borderRadius={10}>
          <View style={styles.medRow}>
            <InnerShadowIcon icon={<CapsuleIcon width={18} height={18} />} size={36} />
            <View>
              <Text style={styles.medTitle}>Lipitor</Text>
              <Text style={styles.medSub}>20 mg</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <FlatList
            data={counterRows}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.counterSeparator} />}
            renderItem={({ item }) => (
              <View style={styles.metricRow}>
                <View style={styles.metricInfo}>
                  <Text style={styles.metricTitle}>{item.title}</Text>
                  <Text style={styles.metricSub}>{item.subTitle}</Text>
                </View>
                <View style={styles.counterWrap}>
                  <IconComponent icon={<MinusIcon width={14} height={14} />} width={32} height={32} radius={62} onPress={item.onDecrement} />
                  <Text style={styles.counterValue}>{item.value}</Text>
                  <IconComponent icon={<PlusIcon width={14} height={14} />} width={32} height={32} radius={62} onPress={item.onIncrement} />
                </View>
              </View>
            )}
            contentContainerStyle={styles.counterList}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.formOuter} innerStyle={styles.formInner} borderRadius={10}>
          <Text style={styles.fieldLabel}>Dose</Text>
          <InputField
            value={dose}
            onChangeText={setDose}
            placeholder="Enter dose"
            minHeight={46}
            borderRadius={64}
            containerStyle={styles.singleField}
          />

          <View style={styles.dateTimeRow}>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>Date</Text>
              <DatePickerField
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Enter date"
                leftIcon={<CalendarIcon width={18} height={18} />}
                rightIcon={<DownArrowIcon width={10} height={10} />}
                containerStyle={styles.halfField}
              />
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>Available Time Slots</Text>
              <TimePickerField
                value={selectedTime}
                onChange={setSelectedTime}
                placeholder="hr:mm"
                leftIcon={<TimerIcon width={18} height={18} />}
                // rightIcon={<DownArrowIcon width={10} height={10} />}
                containerStyle={styles.halfField}
              />
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.pharmacyOuter} innerStyle={styles.pharmacyInner} borderRadius={10}>
          <View style={styles.pharmacyLeft}>
            <InnerShadowIcon icon={<PharmacyIcon width={18} height={18} />} size={40} radius={114} />
            <View>
              <Text style={styles.pharmacyName}>CVS Pharmacy</Text>
              <Text style={styles.pharmacySub}>Torrance Crossroads</Text>
            </View>
          </View>
          <AppButton
            activeOpacity={0.85}
            style={styles.changeBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Change"
            textStyle={styles.changeBtnText}
            onPress={() => { }}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.alertOuter} innerStyle={styles.alertInner} borderRadius={10} backgroundColor="#FFF6E5">
          <View style={styles.alertRow}>
            <InnerShadowIcon icon={<WarningIcon width={14} height={14} />} size={28} />
            <Text style={styles.alertText}>
              <Text style={styles.alertTextBold}>Lab overdue:</Text> BMP and eGFR are 10 overdue
            </Text>
          </View>
        </NeumorphicCard>

        <ReusableButton title="Send to Pharmacy" containerStyle={styles.sendBtn} onPress={() => navigation.navigate(navigationStrings.REFILL_SENT)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  patientOuter: { marginTop: 30 },
  patientInner: { borderRadius: 10, padding: 10 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  patientMeta: { color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400", marginTop: 2 },
  rxOuter: { marginTop: 20 },
  rxInner: { borderRadius: 10 },
  medRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10, paddingTop: 10 },
  medTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  medSub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 1 },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 14 },
  counterList: { paddingHorizontal: 10, paddingBottom: 10 },
  counterSeparator: { paddingVertical: 10 },
  metricRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  metricInfo: { flex: 1 },
  metricTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  metricSub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 1 },
  counterWrap: { flexDirection: "row", alignItems: "center", gap: 12 },
  counterValue: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  formOuter: { marginTop: 20 },
  formInner: { borderRadius: 10, padding: 10 },
  fieldLabel: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
  singleField: { marginTop: 6 },
  dateTimeRow: { marginTop: 14, flexDirection: "row", justifyContent: "space-between", gap: 16. },
  fieldHalf: { width: "48%" },
  halfField: { marginTop: 6 },
  pharmacyOuter: { marginTop: 20 },
  pharmacyInner: { borderRadius: 10, padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pharmacyLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  pharmacyName: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  pharmacySub: { color: COLORS.TEXT_80, fontSize: 12, fontWeight: "400" },
  changeBtn: { width: 65, height: 28, borderRadius: 17 },
  changeBtnText: { color: COLORS.PRIMARY, fontSize: 12, fontWeight: "500" },
  alertOuter: { marginTop: 14 },
  alertInner: { borderRadius: 10, padding: 10 },
  alertRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  alertText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400", flex: 1 },
  alertTextBold: { color: COLORS.PRIMARY_DARK, fontSize: 14, fontWeight: "500" },
  sendBtn: { marginTop: 16, height: 48, borderRadius: 24 },
});

export default SendRefill;
