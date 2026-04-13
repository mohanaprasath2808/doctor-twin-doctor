import React, { useMemo, useState } from "react";
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
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import InputField from "../../neomorphism/InputField";
import { COLORS } from "../../constants/theme";

type TimePickerFieldProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder: string;
  leftIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  is24Hour?: boolean;
};

const TimePickerField: React.FC<TimePickerFieldProps> = ({
  value,
  onChange,
  placeholder,
  leftIcon,
  containerStyle,
  textStyle,
  is24Hour = false,
}) => {
  const [showIosPicker, setShowIosPicker] = useState(false);
  const timeText = useMemo(
    () =>
      value
        ? value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : placeholder,
    [placeholder, value],
  );

  const onTimeChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selected) onChange(selected);
      return;
    }
    if (event.type === "set" && selected) onChange(selected);
  };

  const openPicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        mode: "time",
        value: value ?? new Date(),
        is24Hour,
        onChange: onTimeChange,
      });
      return;
    }
    setShowIosPicker(true);
  };

  return (
    <>
      <Pressable onPress={openPicker}>
        <View pointerEvents="none">
          <InputField
            placeholder={timeText}
            editable={false}
            leftIcon={leftIcon}
            containerStyle={containerStyle}
            style={textStyle}
          />
        </View>
      </Pressable>
      {showIosPicker && Platform.OS === "ios" && (
        <Modal
          transparent
          animationType="slide"
          onRequestClose={() => setShowIosPicker(false)}
        >
          <Pressable
            style={styles.backdrop}
            onPress={() => setShowIosPicker(false)}
          >
            <Pressable style={styles.sheet} onPress={() => {}}>
              <DateTimePicker
                mode="time"
                value={value ?? new Date()}
                display="spinner"
                themeVariant="light"
                textColor={COLORS.TEXT_DARK}
                style={styles.iosPicker}
                onChange={onTimeChange}
              />
              <Pressable
                style={styles.doneBtn}
                onPress={() => setShowIosPicker(false)}
              >
                <Text style={styles.doneText}>Done</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
  },
  iosPicker: {
    height: 216,
    alignSelf: "stretch",
    backgroundColor: COLORS.SURFACE,
  },
  doneBtn: {
    marginTop: 8,
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  doneText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TimePickerField;
