import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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
import { getRoleDisplayName, type StaffFilter } from "./staffTypes";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppContext } from "../../../context/AppContext";
import type { FetchStaffParams } from "../../../context/AppContext";
import { formatDateOfBirth } from "../../../constants/constant";

const STAFF_PAGE_SIZE = 10;

const Staff = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<StaffFilter>("all");
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("AppContext not found");
  }

  const { staffData, loadingStaff, loadingMoreStaff, fetchStaff, refetchStaffList } = appContext;
  const { staffs = [], total, page, limit } = staffData ?? {};

  const listParams = useCallback(
    (pageNum: number): FetchStaffParams => ({
      page: pageNum,
      limit: STAFF_PAGE_SIZE,
      search_key: search,
      ...(selectedFilter !== "all" ? { roles: [selectedFilter] } : {}),
    }),
    [search, selectedFilter],
  );

  const hasMore = useMemo(() => {
    const list = staffs ?? [];
    if (list.length === 0) {
      return false;
    }
    if (typeof total === "number") {
      return list.length < total;
    }
    const pageSize = limit ?? STAFF_PAGE_SIZE;
    const lastPageCount = incomingPageCount(list, page ?? 1, pageSize);
    return lastPageCount >= pageSize;
  }, [staffs, total, page, limit]);

  useEffect(() => {
    fetchStaff(listParams(1));
  }, [fetchStaff, listParams]);

  const isFirstFocus = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
      refetchStaffList();
    }, [refetchStaffList]),
  );

  const endReachedDuringMomentum = useRef(true);

  const loadMore = useCallback(() => {
    if (loadingStaff || loadingMoreStaff || !hasMore || (staffs?.length ?? 0) === 0) {
      return;
    }
    fetchStaff(listParams((page ?? 1) + 1), { append: true });
  }, [loadingStaff, loadingMoreStaff, hasMore, staffs?.length, page, fetchStaff, listParams]);

  const handleEndReached = useCallback(() => {
    if (endReachedDuringMomentum.current) {
      return;
    }
    loadMore();
  }, [loadMore]);

  const renderStaffItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <NeumorphicCard
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
                {item.first_name} {item.last_name}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.staffMetaLine} numberOfLines={1}>
                  {item.phone}
                </Text>
                <View style={styles.metaDot} />
                <Text style={styles.staffMetaLine} numberOfLines={1}>
                  {formatDateOfBirth(item.date_of_birth)}
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
                <Text style={styles.rolePillText}>{getRoleDisplayName(item.role)}</Text>
              </NeumorphicInnerShadowCard>
            </View>
          </View>
        </View>
      </NeumorphicCard>
    ),
    [navigation],
  );

  const listHeader = useMemo(
    () => (
      <>
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
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersScrollContent}
        >
          <FilterChip
            title="All"
            chipWidth={52}
            selected={selectedFilter === "all"}
            onPress={() => setSelectedFilter("all")}
          />
          <FilterChip
            title="MA/Nurse"
            chipWidth={118}
            selected={selectedFilter === "nurse"}
            onPress={() => setSelectedFilter("nurse")}
          />
          <FilterChip
            title="Billing"
            chipWidth={78}
            selected={selectedFilter === "biller"}
            onPress={() => setSelectedFilter("biller")}
          />
          <FilterChip
            title="Front Desk"
            chipWidth={104}
            selected={selectedFilter === "front_desk"}
            onPress={() => setSelectedFilter("front_desk")}
          />
          <FilterChip
            title="Office Manager"
            chipWidth={148}
            selected={selectedFilter === "office_manager"}
            onPress={() => setSelectedFilter("office_manager")}
          />
        </ScrollView>
      </>
    ),
    [navigation, search, selectedFilter],
  );

  const listEmpty = useMemo(() => {
    if (loadingStaff) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      );
    }
    return (
      <View style={styles.noStaffContainer}>
        <Text style={styles.noStaffText}>No staff found</Text>
      </View>
    );
  }, [loadingStaff]);

  const listFooter = useMemo(() => {
    if (!loadingMoreStaff) {
      return null;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.PRIMARY} />
      </View>
    );
  }, [loadingMoreStaff]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.screen}>
        <FlatList
          data={staffs}
          keyExtractor={(item, index) =>
            String(item.user_id ?? index)
          }
          renderItem={renderStaffItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          ListFooterComponent={listFooter}
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          onMomentumScrollBegin={() => {
            endReachedDuringMomentum.current = false;
          }}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />

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

/** Items returned on the last loaded page (used when API omits `total`). */
function incomingPageCount(
  list: unknown[],
  currentPage: number,
  pageSize: number,
): number {
  if (currentPage <= 1) {
    return list.length;
  }
  const start = (currentPage - 1) * pageSize;
  return list.length - start;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 16, flexGrow: 1 },
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
    marginHorizontal: -16,
    flexGrow: 0,
  },
  filtersScrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 18,
    paddingBottom: 26,
    paddingHorizontal: 16,
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
  itemSeparator: { height: 14 },
  noStaffContainer: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  noStaffText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400" },
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
  loadingContainer: {
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
