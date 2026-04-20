import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";

interface DoctorAvatarProps {
  source: ImageSourcePropType;
  imageSize?: number;
  containerSize?: number;
  outerRingExtra?: number;
  middleRingGap?: number;
}

const DoctorAvatar: React.FC<DoctorAvatarProps> = ({
  source,
  imageSize = 38,
  containerSize = 44,
  outerRingExtra = 8,
  middleRingGap = 3,
}) => {
  const outerSize = containerSize + outerRingExtra;
  const middleSize = containerSize + middleRingGap;

  return (
    <View
      style={[
        styles.outerRing,
        {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
        },
      ]}
    >
      <LinearGradient
        colors={["#D6E3F3", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.outerRingShell, { borderRadius: outerSize / 2 }]}
      >
        <View
          style={[
            styles.middleRing,
            {
              width: middleSize,
              height: middleSize,
              borderRadius: middleSize / 2,
            },
          ]}
        >
          <View
            style={[
              styles.avatarRing,
              {
                width: containerSize,
                height: containerSize,
                borderRadius: containerSize / 2,
              },
            ]}
          >
            <Image
              source={source}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: "transparent",
  },
  outerRingShell: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  middleRing: {
    backgroundColor: "#F3F7FB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  avatarRing: {
    backgroundColor: COLORS.SURFACE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#728EAB",
    shadowOffset: { width: 1.05, height: 1.05 },
    shadowOpacity: 0.1,
    shadowRadius: 2.11,
  },
});

export default DoctorAvatar;
