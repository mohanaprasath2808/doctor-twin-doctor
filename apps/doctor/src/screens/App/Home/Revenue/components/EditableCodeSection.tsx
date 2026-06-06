import React from "react";
import { StyleSheet, Text, View } from "react-native";

import PlusIcon from "../../../../../assets/icon/plusIcon.svg";
import SearchIcon from "../../../../../assets/icon/searchIcon.svg";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../../constants/theme";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InputField from "../../../../../neomorphism/InputField";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";

export type CodeEntry = {
  id: string;
  code: string;
  description: string;
};

export type EditableCodeSectionProps = {
  sectionLabel: string;
  fieldLabel: string;
  entries: CodeEntry[];
  onCodeChange: (id: string, value: string) => void;
  onRemove?: (id: string) => void;
  onAdd?: () => void;
  showRemove?: boolean;
};

const EditableCodeSection = ({
  sectionLabel,
  fieldLabel,
  entries,
  onCodeChange,
  onRemove,
  onAdd,
  showRemove = true,
}: EditableCodeSectionProps) => (
  <View style={styles.wrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{sectionLabel}</Text>
      <IconComponent
        icon={<PlusIcon width={16} height={16} />}
        width={32}
        height={32}
        radius={16}
        onPress={onAdd ?? (() => {})}
      />
    </View>
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
      {entries.map((entry, index) => (
        <View key={entry.id}>
          <Text style={styles.fieldLabel}>{fieldLabel}</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputWrap}>
              <InputField
                value={entry.code}
                onChangeText={(value) => onCodeChange(entry.id, value)}
                containerStyle={styles.input}
                minHeight={46}
                borderRadius={114}
              />
            </View>
            <View style={styles.inputActions}>
              <IconComponent
                icon={<SearchIcon width={14} height={14} />}
                width={30}
                height={30}
                radius={14}
                onPress={() => {}}
              />
              {showRemove && onRemove ? (
                <IconComponent
                  icon={<Text style={styles.closeIcon}>×</Text>}
                  width={30}
                  height={30}
                  radius={14}
                  onPress={() => onRemove(entry.id)}
                />
              ) : null}
            </View>
          </View>

          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.insetOuter}
            contentStyle={styles.insetInner}
          >
            <Text style={styles.insetText}>{entry.description}</Text>
          </NeumorphicInnerShadowCard>
          {index < entries.length - 1 ? <View style={styles.divider} /> : null}
        </View>
      ))}
    </NeumorphicCard>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
    marginTop: 5,
    marginBottom: 6,
  },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  inputWrap: {
    flex: 1,
    minWidth: 0,
  },
  input: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0,
  },
  inputActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.ALERT,
    lineHeight: 22,
  },
  insetOuter: {
    width: "100%",
    marginTop: 15,
    marginBottom: 12,
  },
  insetInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  insetText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 12,
  },
});

export default EditableCodeSection;
