import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AppButton from "../../../components/Common/AppButton";
import DeltaGradientBadge from "../../../components/Common/DeltaGradientBadge";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../../constants/theme";
import PlusIcon from "../../../assets/icon/greenPlusIcon.svg";
import SearchIcon from "../../../assets/icon/searchIcon.svg";
import navigationStrings from "../../../constants/navigationStrings";
import type { AppStackParamList } from "../../../router/App/types";
import type { StaffFilter } from "./staffTypes";
import { FILTER_WIDTHS, STAFF_LIST } from "./staffMockData";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Staff = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<StaffFilter>("all");

  const visibleStaff = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = STAFF_LIST;
    if (selectedFilter !== "all") {
      rows = rows.filter((s) => s.role === selectedFilter);
    }
    if (q.length > 0) {
      rows = rows.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.dob.toLowerCase().includes(q) ||
          s.roleLabel.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [search, selectedFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={16} height={16} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Staff</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.searchContainer}>
            <InputField
              value={search}
              onChangeText={setSearch}
              placeholder="Search Staff"
              containerStyle={styles.searchInput}
              borderRadius={30}
              height={46}
              leftIcon={<SearchIcon width={18} height={18} />}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
            contentContainerStyle={styles.filtersScrollContent}
          >
            <FilterChip
              title="All"
              chipWidth={FILTER_WIDTHS.all}
              selected={selectedFilter === "all"}
              onPress={() => setSelectedFilter("all")}
            />
            <FilterChip
              title="MA/Nurse"
              chipWidth={FILTER_WIDTHS.ma}
              selected={selectedFilter === "ma"}
              onPress={() => setSelectedFilter("ma")}
            />
            <FilterChip
              title="Billing"
              chipWidth={FILTER_WIDTHS.billing}
              selected={selectedFilter === "billing"}
              onPress={() => setSelectedFilter("billing")}
            />
            <FilterChip
              title="Front Desk"
              chipWidth={FILTER_WIDTHS.front}
              selected={selectedFilter === "front"}
              onPress={() => setSelectedFilter("front")}
            />
            <FilterChip
              title="Office Manager"
              chipWidth={FILTER_WIDTHS.office}
              selected={selectedFilter === "office"}
              onPress={() => setSelectedFilter("office")}
            />
          </ScrollView>

          <View style={styles.list}>
            {visibleStaff.map((item) => (
              <NeumorphicCard
                key={item.id}
                outerStyle={styles.staffCardOuter}
                innerStyle={styles.staffCardInner}
                borderRadius={12}
                onPress={() =>
                  navigation.navigate(navigationStrings.STAFF_FORM, {
                    isEdit: true,
                    initial: item,
                  })
                }
              >
                <View style={styles.staffRow}>
                  <Image source={DoctorTempImage} style={styles.avatar} resizeMode="cover" />
                  <View style={styles.staffBody}>
                    <View style={styles.staffTextStack}>
                      <Text style={styles.staffName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <View style={styles.metaRow}>
                        <Text style={styles.staffMetaLine} numberOfLines={1}>
                          {item.phone}
                        </Text>
                        <View style={styles.metaDot} />
                        <Text style={styles.staffMetaLine} numberOfLines={1}>
                          {item.dob}
                        </Text>
                      </View>
                      <Text style={styles.staffEmail} numberOfLines={1}>
                        {item.email}
                      </Text>
                    </View>
                    <View style={styles.roleBadgeSlot} pointerEvents="box-none">
                      <NeumorphicInnerShadowCard
                        fullWidth={false}
                        borderRadius={114}
                        backgroundColor={COLORS.INNER_SURFACE}
                        containerStyle={styles.rolePill}
                        contentStyle={styles.rolePillContent}
                      >
                        <Text style={styles.rolePillText}>{item.roleLabel}</Text>
                      </NeumorphicInnerShadowCard>
                    </View>
                  </View>
                </View>
              </NeumorphicCard>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            text="Create New Staff"
            leftIcon={<PlusIcon width={18} height={18} fill={COLORS.WHITE} />}
            iconSize={18}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            borderRadius={60}
            height={52}
            textStyle={styles.createBtnText}
            onPress={() => navigation.navigate(navigationStrings.STAFF_FORM, { isEdit: false })}
            style={styles.createBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const FilterChip = ({
  title,
  chipWidth,
  selected,
  onPress,
}: {
  title: string;
  chipWidth: number;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={[styles.filterPress, { width: chipWidth }]}>
    {selected ? (
      <DeltaGradientBadge
        icon={null}
        value={title}
        width={chipWidth}
        height={40}
        radius={20}
        textStyle={styles.selectedFilterText}
      />
    ) : (
      <NeumorphicCard
        outerStyle={[styles.filterOuter, { width: chipWidth }]}
        innerStyle={styles.filterInner}
        borderRadius={64}
      >
        <Text style={styles.filterText} numberOfLines={1}>
          {title}
        </Text>
      </NeumorphicCard>
    )}
  </Pressable>
);

export default Staff;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 16 },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  searchContainer: { marginTop: 10 },
  searchInput: { marginTop: 8 },
  filtersScroll: {
    paddingTop: 18,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    flexGrow: 0,
    paddingBottom: 26,
  },
  filtersScrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 16,
  },
  filterPress: { flexShrink: 0 },
  filterOuter: {},
  filterInner: {
    paddingHorizontal: 14,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 64,
  },
  filterText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400" },
  selectedFilterText: { fontSize: 14, fontWeight: "500" },
  list: { gap: 14 },
  staffCardOuter: { width: "100%" },
  staffCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  staffRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.TEXT_10,
  },
  /** Text column + absolutely positioned role so name/meta/email keep equal `gap` (badge doesn’t stretch the row). */
  staffBody: {
    position: "relative",
    flex: 1,
    minWidth: 0,
  },
  staffTextStack: {
    gap: 4,
    paddingRight: 112,
  },
  staffName: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  roleBadgeSlot: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  rolePill: { flexShrink: 0 },
  rolePillContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 0,
  },
  rolePillText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 0,
  },
  staffMetaLine: {
    // flexShrink: 1,
    color: COLORS.TEXT_70,
    fontSize: 12,
    fontWeight: "400",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
    flexShrink: 0,
  },
  staffEmail: {
    color: COLORS.TEXT_70,
    fontSize: 12,
    fontWeight: "400",
  },
  createBtn: {
    width: "100%",
  },
  createBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
});
