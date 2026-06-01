import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import PatientTempImage from "../../../../assets/image/tempImage/fakeID.png";
import { COLORS } from "../../../../constants/theme";
import AppButton from "../../../../components/Common/AppButton";
import FilterChip from "../../../../components/Common/FilterChip";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";

type VisitFilter = "active" | "unread" | "trash";

type VisitItem = {
  id: string;
  name: string;
  dateLabel: string;
  durationMins: number;
  category: VisitFilter;
  status?: "paused";
  note?: string;
};

const INITIAL_VISITS: VisitItem[] = [
  {
    id: "v-1",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    status: "paused",
  },
  {
    id: "v-2",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-3",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    status: "paused",
  },
  {
    id: "v-4",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-5",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    status: "paused",
  },
  {
    id: "v-6",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-7",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    status: "paused",
  },
  {
    id: "v-8",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "active",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-9",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    status: "paused",
  },
  {
    id: "v-10",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-11",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    status: "paused",
  },
  {
    id: "v-12",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-13",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    status: "paused",
  },
  {
    id: "v-14",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-15",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "unread",
    status: "paused",
  },
  {
    id: "v-16",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "trash",
    note: "Cholesterol and prostate concerns",
  },
  {
    id: "v-17",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "trash",
    status: "paused",
  },
  {
    id: "v-18",
    name: "Mrs. Barsoum",
    dateLabel: "02/1/2025 02:30 PM",
    durationMins: 54,
    category: "trash",
    note: "Cholesterol and prostate concerns",
  },
];

function PauseIcon() {
  return (
    <View style={styles.pauseIcon}>
      <View style={styles.pauseBar} />
      <View style={styles.pauseBar} />
    </View>
  );
}

type StartVisitListItemProps = {
  item: VisitItem;
  selected: boolean;
  onToggleSelect: () => void;
};

function StartVisitListItem({
  item,
  selected,
  onToggleSelect,
}: StartVisitListItemProps) {
  const metaLine = `${item.dateLabel} (${item.durationMins} mins)`;
  const showPause = item.status === "paused";

  return (
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
      <Pressable style={styles.checkboxHit} onPress={onToggleSelect} hitSlop={6}>
        <NeumorphicCheckboxMark selected={selected} />
      </Pressable>

      <Image source={PatientTempImage} style={styles.avatar} resizeMode="cover" />

      <View style={styles.textCol}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.metaText}>{metaLine}</Text>
        {showPause ? (
          <Text style={styles.statusText}>PAUSED</Text>
        ) : item.note ? (
          <Text style={styles.noteText} numberOfLines={2}>
            {item.note}
          </Text>
        ) : null}
      </View>

      {showPause ? (
        <IconComponent
          icon={<PauseIcon />}
          width={36}
          height={36}
          radius={18}
          onPress={() => {}}
        />
      ) : (
        <View style={styles.pauseSpacer} />
      )}
    </NeumorphicCard>
  );
}

const StartVisit = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<VisitFilter>("active");
  const [visits, setVisits] = useState<VisitItem[]>(INITIAL_VISITS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const counts = useMemo(
    () => ({
      active: visits.filter((v) => v.category === "active").length,
      unread: visits.filter((v) => v.category === "unread").length,
      trash: visits.filter((v) => v.category === "trash").length,
    }),
    [visits],
  );

  const filteredVisits = useMemo(() => {
    const q = search.trim().toLowerCase();
    return visits.filter((v) => {
      if (v.category !== filter) return false;
      if (!q) return true;
      return v.name.toLowerCase().includes(q);
    });
  }, [visits, filter, search]);

  const allVisibleSelected =
    filteredVisits.length > 0 &&
    filteredVisits.every((v) => selectedIds.has(v.id));

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectToggle = useCallback(() => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredVisits.forEach((v) => next.delete(v.id));
        return next;
      });
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      filteredVisits.forEach((v) => next.add(v.id));
      return next;
    });
  }, [allVisibleSelected, filteredVisits]);

  const handleTrash = useCallback(() => {
    if (selectedIds.size === 0) return;
    setVisits((prev) =>
      prev.map((v) =>
        selectedIds.has(v.id) ? { ...v, category: "trash" as const } : v,
      ),
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleRestore = useCallback(() => {
    if (selectedIds.size === 0) return;
    setVisits((prev) =>
      prev.map((v) =>
        selectedIds.has(v.id) ? { ...v, category: "active" as const } : v,
      ),
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleFilterChange = useCallback((next: VisitFilter) => {
    setFilter(next);
    setSelectedIds(new Set());
  }, []);

  const renderItem: ListRenderItem<VisitItem> = useCallback(
    ({ item }) => (
      <StartVisitListItem
        item={item}
        selected={selectedIds.has(item.id)}
        onToggleSelect={() => toggleSelect(item.id)}
      />
    ),
    [selectedIds, toggleSelect],
  );

  const renderHeader = () => (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Start Visit</Text>
        <View style={styles.headerSpacer} />
      </View>

      <InputField
        value={search}
        onChangeText={setSearch}
        placeholder="Search or select a patient"
        leftIcon={<SearchIcon width={18} height={18} />}
        containerStyle={styles.searchInput}
        borderRadius={64}
        minHeight={46}
      />

      <View style={styles.filtersRow}>
        <FilterChip
          title={`Active visits (${counts.active})`}
          selected={filter === "active"}
          onPress={() => handleFilterChange("active")}
          textStyle={styles.filterText}
          selectedTextStyle={styles.filterTextSelected}
        />
        <FilterChip
          title={`Unread (${counts.unread})`}
          selected={filter === "unread"}
          onPress={() => handleFilterChange("unread")}
          textStyle={styles.filterText}
          selectedTextStyle={styles.filterTextSelected}
        />
        <FilterChip
          title={`Trash (${counts.trash})`}
          selected={filter === "trash"}
          onPress={() => handleFilterChange("trash")}
          textStyle={styles.filterText}
          selectedTextStyle={styles.filterTextSelected}
        />
      </View>

      <View style={styles.actionsRow}>
        <Pressable onPress={handleSelectToggle}>
          <NeumorphicCard
            outerStyle={styles.selectAllOuter}
            innerStyle={styles.selectAllInner}
            borderRadius={10}
          >
            <Text style={styles.selectAllText}>
              {allVisibleSelected ? "Deselect all" : "Select all"}
            </Text>
          </NeumorphicCard>
        </Pressable>

        {filter === "trash" ? (
          <AppButton
            activeOpacity={0.8}
            fullWidth={false}
            style={styles.actionBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.WHITE}
            text="Restore"
            textStyle={styles.restoreBtnText}
            onPress={handleRestore}
            disabled={selectedIds.size === 0}
          />
        ) : (
          <AppButton
            activeOpacity={0.8}
            fullWidth={false}
            style={styles.actionBtn}
            bgColor={COLORS.ALERT_LIGHT}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            text="Trash"
            textStyle={styles.trashBtnText}
            onPress={handleTrash}
            disabled={selectedIds.size === 0}
          />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        style={styles.list}
        data={filteredVisits}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={renderHeader}
      />
      <View style={styles.footer}>
        <ReusableButton
          title="Start new conversation"
          height={48}
          borderRadius={24}
          containerStyle={styles.newConversationBtn}
          textStyle={styles.newConversationBtnText}
          onPress={() => navigation.navigate(navigationStrings.AI_SCRIBE)}
        />
      </View>
    </SafeAreaView>
  );
};

export default StartVisit;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerWrap: {
    paddingTop: 6,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  searchInput: {
    paddingHorizontal: 0,
  },
  filtersRow: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Medium",
  },
  filterTextSelected: {
    fontFamily: "SF-Pro-Display-Medium",
  },
  actionsRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  selectAllOuter: {
    minWidth: 108,
  },
  selectAllInner: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectAllText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  actionBtn: {
    minWidth: 96,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
  },
  trashBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.ALERT,
    fontFamily: "SF-Pro-Text-Medium",
  },
  restoreBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  separator: {
    height: 12,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkboxHit: {
    paddingVertical: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  statusText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    letterSpacing: 0.4,
    fontFamily: "SF-Pro-Display-Medium",
  },
  noteText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 16,
    fontFamily: "SF-Pro-Display-Regular",
  },
  pauseSpacer: {
    width: 36,
    height: 36,
  },
  pauseIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pauseBar: {
    width: 3,
    height: 12,
    borderRadius: 1.5,
    backgroundColor: COLORS.TEXT_70,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.SURFACE,
  },
  newConversationBtn: {
    width: "100%",
  },
  newConversationBtnText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
