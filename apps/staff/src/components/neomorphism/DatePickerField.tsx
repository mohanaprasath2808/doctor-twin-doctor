import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import InputField from "./InputField";
import { COLORS } from "../../constants/theme";

interface Props {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

const DatePickerField: React.FC<Props> = ({
  leftIcon,
  rightIcon,
  placeholder = "Select date",
  value,
  onChange,
  maximumDate,
  minimumDate,
  containerStyle,
  style,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleAndroidChange = (event: DateTimePickerEvent, selected?: Date) => {
    setShowPicker(false);
    if (event.type === "set" && selected) {
      onChange?.(selected);
    }
  };

  const handleIOSChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (selected) setTempDate(selected);
  };

  const handleIOSDone = () => {
    setShowPicker(false);
    onChange?.(tempDate);
  };

  const handleIOSCancel = () => {
    setShowPicker(false);
    setTempDate(value ?? new Date());
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setTempDate(value ?? new Date());
          setShowPicker(true);
        }}
      >
        <View pointerEvents="none">
          <InputField
            value={value ? formatDate(value) : ""}
            placeholder={placeholder}
            editable={false}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            containerStyle={[styles.inputContainer, containerStyle]}
            style={[!value && styles.placeholder, style]}
          />
        </View>
      </Pressable>

      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="calendar"
          onChange={handleAndroidChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleIOSCancel}
        >
          <Pressable style={styles.modalOverlay} onPress={handleIOSCancel} />
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosToolbar}>
              <Pressable onPress={handleIOSCancel}>
                <Text style={styles.iosCancelBtn}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleIOSDone}>
                <Text style={styles.iosDoneBtn}>Done</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={handleIOSChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              style={styles.iosPicker}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DatePickerField;

const styles = StyleSheet.create({
  inputContainer: { marginTop: 0 },
  placeholder: {
    color: COLORS.TEXT_40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  iosPickerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  iosToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
  },
  iosCancelBtn: {
    fontSize: 16,
    color: COLORS.TEXT_60,
  },
  iosDoneBtn: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  iosPicker: {
    width: "100%",
  },
});
