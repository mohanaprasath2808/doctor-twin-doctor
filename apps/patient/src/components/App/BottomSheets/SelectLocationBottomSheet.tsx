import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal as GorhomBottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheetModal from "./BottomSheetModal";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/theme";
import InnerShadowView from "../../../neomorphism/InnerShadowView";
import TickIcon from "../../../assets/icons/tick.svg";
import SearchIcon from "../../../assets/icons/search.svg";

const LOCATIONS = [
  { id: "1", name: "Torrance Imaging Center" },
  { id: "2", name: "Torrance Imaging Center" },
  { id: "3", name: "Torrance Imaging Center" },
];

const RADIO_INNER = {
  darkShadowDx: 4,
  darkShadowDy: 4,
  darkShadowBlur: 8,
  darkShadowColor: "#C8CBCC66",
  lightShadowDx: -4,
  lightShadowDy: -4,
  lightShadowBlur: 6,
  lightShadowColor: "#FFFFFFAA",
} as const;

export type SelectLocationBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (locationName: string) => void;
};

const SelectLocationBottomSheet = ({
  visible,
  onClose,
  onConfirm,
}: SelectLocationBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<GorhomBottomSheetModal>(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(LOCATIONS[1].id);

  const snapPoints = useMemo(() => ["50%"], []);

  useEffect(() => {
    const sheet = bottomSheetRef.current;
    if (!sheet) return;
    if (visible) {
      sheet.present();
    } else {
      sheet.dismiss();
    }
  }, [visible]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATIONS;
    return LOCATIONS.filter((item) => item.name.toLowerCase().includes(q));
  }, [query]);

  const handleDismiss = () => {
    onClose();
  };

  const handleDone = () => {
    const item = LOCATIONS.find((l) => l.id === selectedId);
    if (item) onConfirm?.(item.name);
    bottomSheetRef.current?.dismiss();
  };

  const handleCancel = () => {
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={handleDismiss}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.sheetContent}>
        <Text style={styles.sheetTitle}>Select Location</Text>

        <View style={styles.searchWrap}>
          <SearchIcon width={18} height={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search location"
            placeholderTextColor={COLORS.TEXT_PRIMARY_40}
            style={styles.searchInput}
            allowFontScaling={false}
          />
        </View>

        <View style={styles.list}>
          {filtered.length === 0 ? (
            <Text style={styles.emptyText}>No locations found</Text>
          ) : (
            filtered.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.listRow}
                    activeOpacity={0.85}
                    onPress={() => setSelectedId(item.id)}
                  >
                    {isSelected ? (
                      <LinearGradient
                        colors={["#14B8D4", "#0E7490"]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.radioSelected}
                      >
                        <TickIcon width={14} height={11} />
                      </LinearGradient>
                    ) : (
                      <View style={styles.radioUnselectedWrap}>
                        <InnerShadowView
                          width={30}
                          height={30}
                          borderRadius={15}
                          color={COLORS.SURFACE}
                          {...RADIO_INNER}
                        />
                      </View>
                    )}
                    <Text style={styles.locationName}>{item.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              );
            })
          )}
        </View>

        <View style={[styles.footerRow, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cancelTouchable}
            onPress={handleCancel}
          >
            <View style={styles.cancelInner}>
              <Text style={styles.cancelText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.doneTouchable} onPress={handleDone}>
            <LinearGradient
              colors={["#14B8D4", "#0E7490"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.doneGradient}
            >
              <Text style={styles.doneText}>Done</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleIndicator: {
    backgroundColor: COLORS.TEXT_PRIMARY_20,
    width: 40,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sheetTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  searchWrap: {
    marginTop: 20,
    height: 46,
    borderRadius: 64,
    backgroundColor: "#F7FBFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
    paddingVertical: 0,
  },
  list: {
    marginTop: 12,
    flex: 1,
  },
  emptyText: {
    paddingVertical: 24,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "center",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  radioUnselectedWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  radioSelected: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#34718D",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
  },
  locationName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginLeft: 0,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingTop: 24,
  },
  cancelTouchable: {
    flex: 1,
    borderRadius: 60,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },
  cancelInner: {
    width: "100%",
    height: 48,
    borderRadius: 60,
    backgroundColor: COLORS.SURFACE,
    borderWidth: 1,
    borderColor: "#0E7490",
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#0E7490",
    textAlign: "center",
  },
  doneTouchable: {
    flex: 1,
    borderRadius: 60,
    /* Figma: 4px 4px 20px rgba(52,113,141,0.8) (+ soft highlights); shadow on wrapper so LinearGradient does not clip */
    shadowColor: "#34718D",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 6 },
    }),
  },
  doneGradient: {
    width: "100%",
    height: 48,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  doneText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.WHITE,
    textAlign: "center",
  },
});

export default SelectLocationBottomSheet;
