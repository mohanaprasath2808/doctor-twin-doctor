import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BottomSheetModal as BSModal, BottomSheetView } from "@gorhom/bottom-sheet";

import SearchIcon from "../../assets/icon/searchIcon.svg";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../Common/AppButton";
import NeumorphicRadioMark from "../Common/NeumorphicRadioMark";
import InputField from "../neomorphism/InputField";
import ReusableButton from "../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import BottomSheetModal from "./BottomSheetModal";

export type CallPatientOption = {
  id: string;
  name: string;
  age: number;
  room: string;
  avatar: ImageSourcePropType;
};

const DEFAULT_PATIENTS: CallPatientOption[] = [
  { id: "1", name: "Sarah Williams", age: 45, room: "5", avatar: DoctorTempImage },
  { id: "2", name: "Lisa Shaw", age: 45, room: "5", avatar: DoctorTempImage },
];

type SelectAndCallPatientSheetProps = {
  patients?: CallPatientOption[];
  selectedPatientId: string;
  onSelectDone: (patient: CallPatientOption) => void;
  onDismiss?: () => void;
};

const SelectAndCallPatientSheet = forwardRef<BSModal, SelectAndCallPatientSheetProps>(
  ({ patients = DEFAULT_PATIENTS, selectedPatientId, onSelectDone, onDismiss }, ref) => {
    const [draftId, setDraftId] = useState(selectedPatientId);
    const [search, setSearch] = useState("");
    const snapPoints = useMemo(() => ["58%"], []);

    useEffect(() => {
      setDraftId(selectedPatientId);
    }, [selectedPatientId]);

    const visiblePatients = useMemo(() => {
      const q = search.trim().toLowerCase();
      if (!q) return patients;
      return patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.age).includes(q) ||
          p.room.toLowerCase().includes(q),
      );
    }, [patients, search]);

    const handleDone = () => {
      const selected = patients.find((p) => p.id === draftId) ?? patients[0];
      if (selected) onSelectDone(selected);
      (ref as React.RefObject<BSModal>)?.current?.dismiss();
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        onDismiss={onDismiss}
        backgroundStyle={styles.sheet}
      >
        <BottomSheetView style={styles.content}>
          <Text style={styles.title}>Select Patient</Text>

          <InputField
            value={search}
            onChangeText={setSearch}
            placeholder="Search patient"
            containerStyle={styles.searchInput}
            borderRadius={30}
            height={46}
            leftIcon={<SearchIcon width={18} height={18} />}
          />

          <FlatList
            data={visiblePatients}
            keyExtractor={(item) => item.id}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <Pressable
                style={[
                  styles.optionRow,
                  index !== visiblePatients.length - 1 && styles.optionSeparator,
                ]}
                onPress={() => setDraftId(item.id)}
              >
                <NeumorphicRadioMark selected={item.id === draftId} />
                <Image source={item.avatar} style={styles.avatar} />
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionName}>{item.name}</Text>
                  <Text style={styles.optionMeta}>
                    Age {item.age} • Room: {item.room}
                  </Text>
                </View>
              </Pressable>
            )}
          />

          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                text="Cancel"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                textStyle={styles.cancelText}
                style={styles.cancelBtn}
                onPress={() => (ref as React.RefObject<BSModal>)?.current?.dismiss()}
              />
            </View>
            <View style={styles.footerHalf}>
              <ReusableButton
                title="Done"
                containerStyle={styles.doneBtn}
                height={52}
                borderRadius={26}
                onPress={handleDone}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

SelectAndCallPatientSheet.displayName = "SelectAndCallPatientSheet";

export default SelectAndCallPatientSheet;

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.INNER_SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  searchInput: {
    marginBottom: 8,
  },
  list: {
    flexGrow: 0,
    maxHeight: 220,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  optionSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.TEXT_20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  optionTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  optionName: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    fontWeight: "600",
  },
  optionMeta: {
    marginTop: 2,
    color: COLORS.TEXT_60,
    fontSize: 13,
    fontWeight: "400",
  },
  footerRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  footerHalf: {
    flex: 1,
  },
  cancelBtn: {
    height: 52,
    borderRadius: 26,
  },
  cancelText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  doneBtn: {
    borderRadius: 26,
  },
});
