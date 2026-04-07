import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import LinearGradient from "react-native-linear-gradient";
import NeumorphicView from "./NeumorphicView";
import { COLORS } from "../constants/theme";

interface Props {
  leftIcon?: React.ReactNode;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}

const HEIGHT = 47;
const RADIUS = 64;

const DatePickerField: React.FC<Props> = ({
  leftIcon,
  placeholder = "Select date",
  value,
  onChange,
  maximumDate,
  minimumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

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
    <View style={styles.container} onLayout={onLayout}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setTempDate(value ?? new Date());
          setShowPicker(true);
        }}
      >
        <LinearGradient
          colors={["#D6E3F399", "#FFFFFFCC", "#FFFFFF80", "#FFFFFF00"]}
          locations={[0, 0.4, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientBorder, { borderRadius: RADIUS }]}
        >
          <View style={styles.innerWrapper}>
            {width > 0 && (
              <View style={styles.outerShadowWrapper}>
                <NeumorphicView
                  width={width}
                  height={HEIGHT}
                  borderRadius={RADIUS}
                  color="#F7FBFF"
                />
              </View>
            )}

            <View style={styles.surface}>
              <View style={styles.inputWrapper}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <Text style={[styles.text, !value && styles.placeholder]}>
                  {value ? formatDate(value) : placeholder}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Android: native dialog */}
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

      {/* iOS: modal with spinner + Done/Cancel */}
      {Platform.OS === "ios" && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleIOSCancel}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleIOSCancel}
          />
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosToolbar}>
              <TouchableOpacity onPress={handleIOSCancel}>
                <Text style={styles.iosCancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIOSDone}>
                <Text style={styles.iosDoneBtn}>Done</Text>
              </TouchableOpacity>
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
  container: {
    width: "100%",
    marginTop: 15,
  },
  gradientBorder: {
    borderRadius: RADIUS,
    padding: 0.6,
    overflow: "visible",
  },
  innerWrapper: {
    borderRadius: RADIUS,
    overflow: "visible",
  },
  outerShadowWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: HEIGHT + 24,
  },
  surface: {
    borderRadius: RADIUS,
    overflow: "hidden",
    backgroundColor: "#F7FBFF",
  },
  inputWrapper: {
    height: HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1,
    borderRadius: RADIUS,
  },
  leftIcon: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
  },
  placeholder: {
    color: "#ABABAB",
  },
  // iOS modal
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
    color: "#2E3A8C",
  },
  iosPicker: {
    width: "100%",
  },
});
