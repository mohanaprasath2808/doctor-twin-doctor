import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../assets/icon/searchIcon.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type StaffDoctorMessage = {
  id: string;
  name: string;
  role: string;
  subText: string;
  message: string;
  when: string;
  avatar: ImageSourcePropType;
};

const STAFF_DOCTOR_MESSAGES: StaffDoctorMessage[] = [
  {
    id: "1",
    name: "Seffesa",
    role: "MA",
    subText: "Patient passes",
    message: "Could you clarify the dosage for Ganesh Kumar's insulin?",
    when: "Now",
    avatar: DoctorTempImage,
  },
  {
    id: "2",
    name: "Jess Hall",
    role: "Nurse",
    subText: "Escalation",
    message: "Can we schedule follow-up?",
    when: "Now",
    avatar: DoctorTempImage,
  },
  {
    id: "3",
    name: "Ashley Thompson",
    role: "RN",
    subText: "Patient passes",
    message: "Can patient restart medication?",
    when: "Now",
    avatar: DoctorTempImage,
  },
];

const StaffDoctorChannel = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const bottomPad = Math.max(insets.bottom, 12) + 16;

  const visibleMessages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return STAFF_DOCTOR_MESSAGES;
    return STAFF_DOCTOR_MESSAGES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.subText.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q),
    );
  }, [search]);

  const openDetail = useCallback(() => {
    navigation.navigate(navigationStrings.STAFF_DOCTOR_MESSAGE_DETAIL);
  }, [navigation]);

  const renderMessage = useCallback(
    ({ item }: { item: StaffDoctorMessage }) => (
      <NeumorphicCard
        borderRadius={10}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={styles.cardOuter}
        innerStyle={styles.cardInner}
        onPress={openDetail}
        activeOpacity={0.88}
      >
        <View style={styles.cardTopRow}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.cardTopCenter}>
            <Text style={styles.senderName} numberOfLines={1}>
              {item.name} <Text style={styles.roleText}>({item.role})</Text>
            </Text>
            <Text style={styles.subText} numberOfLines={1}>
              {item.subText}
            </Text>
          </View>
          <Text style={styles.whenText}>{item.when}</Text>
        </View>
        <NeumorphicInnerShadowCard
          borderRadius={10}
          containerStyle={styles.messageShadowOuter}
          contentStyle={styles.messageShadowInner}
          darkShadowColor="#C8CBCC99"
          lightShadowColor="#FFFFFFCC"
        >
          <Text style={styles.messagePreview}>{item.message}</Text>
        </NeumorphicInnerShadowCard>
      </NeumorphicCard>
    ),
    [openDetail],
  );

  const listHeader = useMemo(
    () => (
      <>
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Staff - Doctor Channel</Text>
          <View style={styles.headerSpacer} />
        </View>
        <InputField
          value={search}
          onChangeText={setSearch}
          placeholder="Search staff/message"
          containerStyle={styles.searchInput}
          borderRadius={30}
          height={46}
          leftIcon={<SearchIcon width={18} height={18} />}
        />
      </>
    ),
    [navigation, search],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={visibleMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        ListHeaderComponent={listHeader}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default StaffDoctorChannel;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  searchInput: {
    marginBottom: 20,
  },
  separator: {
    height: 16,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardTopCenter: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Medium",
  },
  subText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  whenText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  messageShadowOuter: {
    width: "100%",
  },
  messageShadowInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  messagePreview: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
  },
});
