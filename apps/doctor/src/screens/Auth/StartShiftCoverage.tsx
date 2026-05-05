import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal as BSModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import IconComponent from '../../neomorphism/IconComponent';
import BackIcon from '../../assets/icon/backArrow.svg';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';
import NeumorphicCard from '../../components/Common/NeumorphicCard';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import PrimaryDoctorIcon from '../../assets/icon/primaryDocIcon.svg';
import LabLocationIcon from '../../assets/icon/labLocationIcon.svg';
import DownArrowIcon from '../../assets/icon/downArrow.svg';
import SelectedIcon from '../../assets/icon/selectedIcon.svg';
import BottomSheetModal from '../../components/BottomSheets/BottomSheetModal';
import DeltaBadge from '../../components/Common/DeltaBadge';
import AppButton from '../../components/Common/AppButton';
import ReusableButton from '../../neomorphism/ReusableButton';
import navigationStrings from '../../constants/navigationStrings';
import { useAuthStore } from '../../store/useAuthStore';
import { setCompletedOnboarding } from '../../utils/authStorage';

type SelectType = 'role' | 'location' | null;

const ROLE_OPTIONS = ['Primary Doctor', 'Covering MD'];
const LOCATION_OPTIONS = ['Soliman Clinic', 'Downtown Medical Center', 'City Specialty Care'];

type StaffStatus = 'online' | 'offline';

type CoverageStaffItem = {
  id: string;
  name: string;
  status: StaffStatus;
  countdownSeconds?: number;
};

const COVERAGE_STAFF: CoverageStaffItem[] = [
  { id: 'emma', name: 'Emma Garcia', status: 'online' },
  { id: 'anna-online', name: 'Anna Anson', status: 'online' },
  { id: 'anna-time', name: 'Anna Anson', status: 'online', countdownSeconds: 202 },
];

const formatCountdown = (totalSeconds: number) => {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`;
};

const StartShiftCoverage = () => {
  const navigation = useNavigation<any>();
  const setIsLogin = useAuthStore((s) => s.setIsLogin);
  const pickerRef = useRef<BSModal>(null);
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0]);
  const [selectedLocation, setSelectedLocation] = useState(LOCATION_OPTIONS[0]);
  const [activeSelectType, setActiveSelectType] = useState<SelectType>(null);
  const [draftValue, setDraftValue] = useState(selectedRole);
  const [coverageStaff, setCoverageStaff] = useState(COVERAGE_STAFF);

  useEffect(() => {
    const hasCountdown = coverageStaff.some(
      (item) => typeof item.countdownSeconds === 'number' && item.countdownSeconds > 0,
    );
    if (!hasCountdown) return;

    const interval = setInterval(() => {
      setCoverageStaff((prev) =>
        prev.map((item) => {
          if (typeof item.countdownSeconds !== 'number') return item;
          if (item.countdownSeconds <= 1) {
            return {
              ...item,
              countdownSeconds: 0,
              status: 'offline',
            };
          }
          return {
            ...item,
            countdownSeconds: item.countdownSeconds - 1,
          };
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [coverageStaff]);

  const openPicker = (type: Exclude<SelectType, null>) => {
    setActiveSelectType(type);
    setDraftValue(type === 'role' ? selectedRole : selectedLocation);
    pickerRef.current?.present();
  };

  const pickerTitle = activeSelectType === 'role' ? 'Today is Role' : 'Location';
  const pickerOptions = activeSelectType === 'role' ? ROLE_OPTIONS : LOCATION_OPTIONS;

  const snapPoints = useMemo(() => ['38%'], []);

  const handleDone = () => {
    if (activeSelectType === 'role') setSelectedRole(draftValue);
    if (activeSelectType === 'location') setSelectedLocation(draftValue);
    pickerRef.current?.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={22} height={22} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Start Shift / Coverage</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.profileContainer}
        wrapperStyle={styles.profileWrapper}
        overlayStyle={styles.profileOverlay}
        imageStyle={styles.profileImage}
      />

      <Text style={styles.greeting}>Good Morning, Dr.Twin</Text>

      <Pressable onPress={() => openPicker('role')}>
        <NeumorphicCard
          outerStyle={styles.dropdownOuter}
          innerStyle={styles.dropdownInner}
          borderRadius={12}
        >
          <View style={styles.dropdownRow}>
            <View style={styles.dropdownLeft}>
              <InnerShadowIcon
                size={40}
                icon={<PrimaryDoctorIcon width={20} height={20} />}
              />
              <Text style={styles.dropdownLabel}>Today is Role</Text>
            </View>
            <View style={styles.dropdownRight}>
              <Text style={styles.dropdownValue}>{selectedRole}</Text>
              <DownArrowIcon width={12} height={12} />
            </View>
          </View>
        </NeumorphicCard>
      </Pressable>

      <Pressable onPress={() => openPicker('location')}>
        <NeumorphicCard
          outerStyle={styles.dropdownOuter}
          innerStyle={styles.dropdownInner}
          borderRadius={12}
        >
          <View style={styles.dropdownRow}>
            <View style={styles.dropdownLeft}>
              <InnerShadowIcon size={40} icon={<LabLocationIcon width={18} height={18} />} />
              <Text style={styles.dropdownLabel}>location</Text>
            </View>
            <View style={styles.dropdownRight}>
              <Text style={styles.dropdownValue}>{selectedLocation}</Text>
              <DownArrowIcon width={12} height={12} />
            </View>
          </View>
        </NeumorphicCard>
      </Pressable>

      <NeumorphicCard
        outerStyle={styles.staffOuter}
        innerStyle={styles.staffInner}
        borderRadius={12}
      >
        <FlatList
          data={coverageStaff}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.staffDivider} />}
          renderItem={({ item }) => (
            <View style={styles.staffRow}>
              <View style={styles.staffLeft}>
                <Image source={DoctorTempImage} style={styles.staffAvatar} />
                <Text style={styles.staffName}>{item.name}</Text>
              </View>
              {typeof item.countdownSeconds === 'number' && item.countdownSeconds > 0 ? (
                <Text style={styles.timeText}>{formatCountdown(item.countdownSeconds)}</Text>
              ) : item.status === 'online' ? (
                <DeltaBadge
                  value="Online"
                  bgColor={"#D3FFF1"}
                  darkShadowColor={COLORS.GREEN}
                  lightShadowColor={COLORS.WHITE}
                  textColor={COLORS.GREEN}
                  width={60}
                  height={28}
                  textStyle={styles.badgeText}
                />
              ) : (
                <DeltaBadge
                  value="Offline"
                  bgColor="#F2F4F8"
                  darkShadowColor="#D0D7E2"
                  lightShadowColor={COLORS.WHITE}
                  textColor={COLORS.TEXT_70}
                  width={66}
                  height={28}
                  textStyle={styles.badgeText}
                />
              )}
            </View>
          )}
        />
      </NeumorphicCard>

      <View style={styles.footerRow}>
        <AppButton
          text="End Coverage"
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.endCoverageText}
          style={styles.endCoverageBtn}
        />
        <ReusableButton
          title="Start Shift"
          containerStyle={styles.startShiftBtn}
          onPress={() => {
            void setCompletedOnboarding(true);
            setIsLogin(true);
          }}
        />
      </View>

      <BottomSheetModal
        ref={pickerRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        backgroundStyle={styles.sheet}
        onDismiss={() => setActiveSelectType(null)}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Select {pickerTitle}</Text>
          <FlatList
            data={pickerOptions}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              const isActive = item === draftValue;
              return (
                <Pressable
                  style={[
                    styles.sheetOptionRow,
                    index !== pickerOptions.length - 1 && styles.sheetOptionSeparator,
                  ]}
                  onPress={() => setDraftValue(item)}
                >
                  {isActive ? (
                    <SelectedIcon width={30} height={30} />
                  ) : (
                    <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />
                  )}
                  <Text style={styles.sheetOptionText}>{item}</Text>
                </Pressable>
              );
            }}
          />
          <View style={styles.sheetFooter}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.sheetCancelText}
              style={styles.sheetCancelBtn}
              onPress={() => pickerRef.current?.dismiss()}
            />
            <ReusableButton
              title="Done"
              containerStyle={styles.sheetDoneBtn}
              onPress={handleDone}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default StartShiftCoverage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
  },
  header: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  profileContainer: {
    marginTop: 20,
  },
  profileWrapper: {
    width: 190,
    height: 190,
  },
  profileOverlay: {
    borderRadius: 95,
  },
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 58,
  },
  greeting: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownOuter: {
    marginTop: 20,
  },
  dropdownInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownLabel: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
  },
  dropdownRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownValue: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: '400',
  },
  staffOuter: {
    marginTop: 20,
  },
  staffInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  staffDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 14,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  staffLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  staffAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  staffName: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeText: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: '500',
  },
  footerRow: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 12,
  },
  endCoverageBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  endCoverageText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  startShiftBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetContent: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sheetTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  sheetOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  sheetOptionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_10,
  },
  sheetOptionText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyDot: {
    width: 1,
    height: 1,
  },
  sheetFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  sheetCancelBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
  },
  sheetCancelText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  sheetDoneBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
  },
});
