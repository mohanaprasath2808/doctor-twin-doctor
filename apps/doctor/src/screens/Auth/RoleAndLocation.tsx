import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal as BSModal } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import IconComponent from '../../neomorphism/IconComponent';
import InputField from '../../neomorphism/InputField';
import ReusableButton from '../../neomorphism/ReusableButton';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import NeumorphicCard from '../../components/Common/NeumorphicCard';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import LocationBottomSheetModal from '../../components/BottomSheets/LocationBottomSheetModal';
import BackIcon from '../../assets/icon/backArrow.svg';
import DownArrowIcon from '../../assets/icon/downArrow.svg';
import SelectedIcon from '../../assets/icon/selectedIcon.svg';
import PrimaryDoctorIcon from '../../assets/icon/primaryDocIcon.svg';
import CoveringMdIcon from '../../assets/icon/coveringMDIcon.svg';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';

const CLINIC_OPTIONS = [
  'Soliman Clinic',
  'Downtown Medical Center',
  'City Specialty Care',
];

type RoleOptionId = 'primaryDoctor' | 'coveringMd';

const ROLE_OPTIONS: Array<{
  id: RoleOptionId;
  label: string;
  icon: React.ReactNode;
}> = [
    {
      id: 'primaryDoctor',
      label: 'Primary Doctor',
      icon: <PrimaryDoctorIcon width={18} height={18} />,
    },
    {
      id: 'coveringMd',
      label: 'Covering MD',
      icon: <CoveringMdIcon width={18} height={18} />,
    },
  ];

const RoleAndLocation = () => {
  const navigation = useNavigation<any>();
  const locationSheetRef = useRef<BSModal>(null);
  const [selectedClinic, setSelectedClinic] = useState(CLINIC_OPTIONS[0]);
  const [selectedRoleId, setSelectedRoleId] =
    useState<RoleOptionId>('primaryDoctor');

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
        <Text style={styles.headerTitle}>Role & Location</Text>
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

      <Text style={styles.welcomeText}>Welcome Back Dr.Twin</Text>

      <Pressable
        style={styles.locationFieldWrap}
        onPress={() => locationSheetRef.current?.present()}
      >
        <View pointerEvents="none">
          <InputField
            value={selectedClinic}
            editable={false}
            rightIcon={<DownArrowIcon width={14} height={14} />}
            containerStyle={styles.locationInput}
            minHeight={46}
            borderRadius={64}
            isFocused={false}
          />
        </View>
      </Pressable>

      <NeumorphicCard
        outerStyle={styles.rolesOuter}
        innerStyle={styles.rolesInner}
        borderRadius={12}
      >
        <Text style={styles.roleHeading}>Select role</Text>

        {ROLE_OPTIONS.map((role, idx) => {
          const isSelected = role.id === selectedRoleId;
          return (
            <Pressable
              key={role.id}
              style={[
                styles.roleRow,
                idx !== ROLE_OPTIONS.length - 1 && styles.roleDivider,
              ]}
              onPress={() => setSelectedRoleId(role.id)}
            >
              {isSelected ? (
                <SelectedIcon width={30} height={30} />
              ) : (
                <InnerShadowIcon
                  size={30}
                  icon={<View style={styles.emptyDot} />}
                  radius={46}
                />
              )}
              <InnerShadowIcon size={40} icon={role.icon} />
              <Text style={styles.roleText}>{role.label}</Text>
            </Pressable>
          );
        })}
      </NeumorphicCard>

      <ReusableButton
        title="Confirm"
        onPress={() => navigation.navigate(navigationStrings.START_SHIFT_COVERAGE)}
        containerStyle={styles.confirmBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      <LocationBottomSheetModal
        ref={locationSheetRef}
        options={CLINIC_OPTIONS}
        selectedValue={selectedClinic}
        onSelectDone={setSelectedClinic}
      />
    </SafeAreaView>
  );
};

export default RoleAndLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
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
  welcomeText: {
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '600',
  },
  locationFieldWrap: {
    marginTop: 30,
  },
  locationInput: {
    marginTop: 0,
  },
  rolesOuter: {
    marginTop: 20,
  },
  rolesInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  roleHeading: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  roleDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_10,
  },
  roleText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyDot: {
    width: 1,
    height: 1,
  },
  confirmBtn: {
    marginTop: 30,
  },
});
