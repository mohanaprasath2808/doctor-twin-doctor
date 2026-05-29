import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal as BSModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { LOOK_UP_ROLE, type StaffRole } from "../../screens/App/Staff/staffTypes";
import { COLORS } from "../../constants/theme";
import SelectedIcon from "../../assets/icon/selectedIcon.svg";
import BillingIcon from "../../assets/icon/billingIcon.svg";
import DelegationIcon from "../../assets/icon/delegationIcon.svg";
import MessageIcon from "../../assets/icon/messageIcon.svg";
import ProfileGreenIcon from "../../assets/icon/profileGreenIcon.svg";
import AppButton from "../Common/AppButton";
import ReusableButton from "../neomorphism/ReusableButton";
import InnerShadowIcon from "../neomorphism/InnerShadowIcon";
import BottomSheetModal from "./BottomSheetModal";

const FOOTER_ACTION_HEIGHT = 52;

export const ROLE_OPTIONS: {
  role: StaffRole;
  label: string;
  Icon: React.ComponentType<{ width?: number; height?: number }>;
}[] = [
  { role: "office_manager", label: LOOK_UP_ROLE.office_manager, Icon: ProfileGreenIcon },
  { role: "nurse", label: LOOK_UP_ROLE.nurse, Icon: DelegationIcon },
  { role: "biller", label: LOOK_UP_ROLE.biller, Icon: BillingIcon },
  { role: "front_desk", label: LOOK_UP_ROLE.front_desk, Icon: MessageIcon },
];

type StaffRoleBottomSheetModalProps = {
  selectedRole: StaffRole | null;
  onSelectDone: (role: StaffRole) => void;
  onDismiss?: () => void;
};

const StaffRoleBottomSheetModal = forwardRef<BSModal, StaffRoleBottomSheetModalProps>(
  ({ selectedRole, onSelectDone, onDismiss }, ref) => {
    const [draftRole, setDraftRole] = useState<StaffRole | null>(selectedRole);
    const snapPoints = useMemo(() => ["45%"], []);

    useEffect(() => {
      setDraftRole(selectedRole);
    }, [selectedRole]);

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
          <Text style={styles.title}>Select role</Text>

          <FlatList
            data={ROLE_OPTIONS}
            keyExtractor={(item) => item.role}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              const isActive = draftRole !== null && item.role === draftRole;
              const RowIcon = item.Icon;
              return (
                <Pressable
                  style={[
                    styles.optionRow,
                    index !== ROLE_OPTIONS.length - 1 && styles.optionSeparator,
                  ]}
                  onPress={() => setDraftRole(item.role)}
                >
                  {isActive ? (
                    <SelectedIcon width={30} height={30} />
                  ) : (
                    <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />
                  )}
                  <InnerShadowIcon
                    size={40}
                    icon={<RowIcon width={18} height={18} />}
                    radius={20}
                  />
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              );
            }}
          />

          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                text="Cancel"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                textStyle={styles.cancelText}
                height={FOOTER_ACTION_HEIGHT}
                borderRadius={FOOTER_ACTION_HEIGHT / 2}
                style={styles.footerHalfInner}
                onPress={() => (ref as React.RefObject<BSModal>)?.current?.dismiss()}
              />
            </View>
            <View style={styles.footerHalf}>
              <ReusableButton
                title="Done"
                height={FOOTER_ACTION_HEIGHT}
                borderRadius={FOOTER_ACTION_HEIGHT / 2}
                containerStyle={styles.footerHalfInner}
                gradientColors={["#A7F3D0", "#166534"]}
                backgroundColor={COLORS.PRIMARY}
                onPress={() => {
                  const next = draftRole ?? selectedRole ?? ROLE_OPTIONS[0]?.role;
                  if (next) onSelectDone(next);
                  (ref as React.RefObject<BSModal>)?.current?.dismiss();
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  optionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_10,
  },
  optionText: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  emptyDot: { width: 1, height: 1 },
  footerRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
    alignItems: "stretch",
  },
  footerHalf: { flex: 1, minWidth: 0 },
  footerHalfInner: { width: "100%" },
  cancelText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
});

StaffRoleBottomSheetModal.displayName = "StaffRoleBottomSheetModal";

export default StaffRoleBottomSheetModal;
