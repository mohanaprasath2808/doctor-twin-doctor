import React, { useCallback } from "react";
import { Alert, Image, Linking, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ProfileIcon from "../../../assets/icon/profileIcon.svg";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import { COLORS } from "../../../constants/theme";

const TILE_OUTER = 140;
const TILE_INNER = 120;

type StaffProfileUploadProps = {
  imageUri: string | null;
  onImageUriChange: (uri: string | null) => void;
};

const showOpenSettingsAlert = (message: string) => {
  Alert.alert("Permission required", message, [
    { text: "Cancel", style: "cancel" },
    { text: "Open Settings", onPress: () => Linking.openSettings() },
  ]);
};

const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (current.granted) {
    return true;
  }
  if (!current.canAskAgain) {
    showOpenSettingsAlert(
      "Photo library access is required to upload a profile picture. Enable it in Settings.",
    );
    return false;
  }

  const requested = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (requested.granted) {
    return true;
  }
  if (!requested.canAskAgain) {
    showOpenSettingsAlert(
      "Photo library access is required to upload a profile picture. Enable it in Settings.",
    );
  }
  return false;
};

const requestCameraPermission = async (): Promise<boolean> => {
  const current = await ImagePicker.getCameraPermissionsAsync();
  if (current.granted) {
    return true;
  }
  if (!current.canAskAgain) {
    showOpenSettingsAlert(
      "Camera access is required to take a profile picture. Enable it in Settings.",
    );
    return false;
  }

  const requested = await ImagePicker.requestCameraPermissionsAsync();
  if (requested.granted) {
    return true;
  }
  if (!requested.canAskAgain) {
    showOpenSettingsAlert(
      "Camera access is required to take a profile picture. Enable it in Settings.",
    );
  }
  return false;
};

const StaffProfileUpload: React.FC<StaffProfileUploadProps> = ({
  imageUri,
  onImageUriChange,
}) => {
  const applyPickerResult = useCallback(
    (result: ImagePicker.ImagePickerResult) => {
      if (!result.canceled && result.assets[0]?.uri) {
        onImageUriChange(result.assets[0].uri);
      }
    },
    [onImageUriChange],
  );

  const pickFromLibrary = useCallback(async () => {
    const granted = await requestMediaLibraryPermission();
    if (!granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    applyPickerResult(result);
  }, [applyPickerResult]);

  const pickFromCamera = useCallback(async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    applyPickerResult(result);
  }, [applyPickerResult]);

  const pickImage = useCallback(() => {
    Alert.alert("Upload photo", "Choose a source", [
      { text: "Photo library", onPress: () => void pickFromLibrary() },
      { text: "Camera", onPress: () => void pickFromCamera() },
      { text: "Cancel", style: "cancel" },
    ]);
  }, [pickFromLibrary, pickFromCamera]);

  const avatarIcon = imageUri ? (
    <Image
      source={{ uri: imageUri }}
      style={styles.avatarImage}
      resizeMode="cover"
    />
  ) : (
    <ProfileIcon width={40} height={40} />
  );

  return (
    <View style={styles.root}>
      <NeumorphicQuickActionTile
        onPress={pickImage}
        icon={avatarIcon}
        label=" "
        outerDiameter={TILE_OUTER}
        innerShadowDiameter={TILE_INNER}
        containerStyle={styles.tile}
        labelStyle={styles.hiddenLabel}
        labelNumberOfLines={1}
      />
      <AppButton
        text="Upload"
        onPress={pickImage}
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.INNER_SURFACE}
        width={120}
        height={40}
        borderRadius={20}
        textStyle={styles.uploadText}
        style={styles.uploadBtn}
      />
    </View>
  );
};

export default StaffProfileUpload;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  tile: {
    marginBottom: 0,
    width: "100%",
    alignItems: "center",
  },
  hiddenLabel: {
    height: 0,
    opacity: 0,
    margin: 0,
    padding: 0,
  },
  avatarImage: {
    width: TILE_INNER,
    height: TILE_INNER,
    borderRadius: TILE_INNER / 2,
  },
  uploadBtn: {
    marginTop: 14,
    alignSelf: "center",
  },
  uploadText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
});
