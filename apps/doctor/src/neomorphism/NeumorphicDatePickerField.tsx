import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import InputField from "./InputField";
import ReusableButton from "./ReusableButton";
import { NeumorphicCalendar } from "./NeumorphicCalendar";
import { COLORS } from "../constants/theme";

type NeumorphicDatePickerFieldProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
};

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const NeumorphicDatePickerField: React.FC<NeumorphicDatePickerFieldProps> = ({
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
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [draftDate, setDraftDate] = useState<Date>(value ?? new Date());

  useEffect(() => {
    if (value) {
      setDraftDate(value);
    }
  }, [value]);

  const openCalendar = () => {
    setDraftDate(value ?? new Date());
    setIsCalendarVisible(true);
  };

  const handleDone = () => {
    onChange?.(draftDate);
    setIsCalendarVisible(false);
  };

  const handleCancel = () => {
    setDraftDate(value ?? new Date());
    setIsCalendarVisible(false);
  };

  return (
    <View>
      <Pressable onPress={openCalendar}>
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

      <Modal
        visible={isCalendarVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.calendarOverlay}>
          <Pressable style={styles.backdrop} onPress={handleCancel} />
          <View style={styles.calendarContainer}>
            <NeumorphicCalendar
              initialDate={draftDate}
              onDateChange={setDraftDate}
              {...(maximumDate ? { maxDate: maximumDate } : {})}
            />
            <ReusableButton
              title="Done"
              onPress={handleDone}
              containerStyle={styles.calendarDoneBtn}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NeumorphicDatePickerField;

const styles = StyleSheet.create({
  inputContainer: { marginTop: 0 },
  placeholder: {
    color: "#ABABAB",
  },
  calendarOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  backdrop: {
    flex: 1,
  },
  calendarContainer: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  calendarDoneBtn: {
    marginTop: 16,
    height: 48,
    borderRadius: 24,
  },
});
