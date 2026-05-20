import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import type { ImageSourcePropType } from "react-native";

import ProfileAvatar from "../../../../components/neomorphism/ProfileAvatar";
import { COLORS } from "../../../../constants/theme";

export type OrbitClusterNode = {
  id: string;
  figmaLeft: number;
  figmaTop: number;
  figmaWrapW: number;
};

type OrbitClusterProps<T extends OrbitClusterNode> = {
  orbitH: number;
  sw: number;
  nodes: T[];
  renderNode: (args: { node: T; sx: number; sy: number; btnSize: number }) => React.ReactNode;
  centerLabel: string;
  centerImageSource: ImageSourcePropType;
  centerOverlaySource: ImageSourcePropType;
  centerLabelStyle?: StyleProp<TextStyle>;
};

const FW = 414;
const FOH = 410;
const RING_DIAMS = [298, 276, 254, 232, 210, 187, 165];

const OrbitCluster = <T extends OrbitClusterNode>({
  orbitH,
  sw,
  nodes,
  renderNode,
  centerLabel,
  centerImageSource,
  centerOverlaySource,
  centerLabelStyle,
}: OrbitClusterProps<T>) => {
  const sx = sw / FW;
  const sy = orbitH / FOH;

  const ringCx = sw / 2;
  const ringCy = Math.round(170 * sy);

  const docSize = Math.round(170 * sx);
  // Center doctor avatar within the rings for all device sizes.
  const docLeft = Math.round(ringCx - docSize / 2);
  const docTop = Math.round(ringCy - docSize / 2);
  const btnSize = Math.round(80 * sx);

  const imgSize = Math.round(docSize * 0.62);
  const overlayRadius = Math.round(docSize / 2);

  return (
    <View style={{ height: orbitH, position: "relative", display: "flex", alignItems: "center" }}>
      {RING_DIAMS.map((d, i) => {
        const sd = Math.round(d * sx);
        return (
          <View
            key={i}
            pointerEvents="none"
            style={{
              position: "absolute",
              width: sd,
              height: sd,
              borderRadius: sd / 2,
              borderWidth: 1,
              borderColor: "#C8DCF0",
              opacity: 0.25 + i * 0.08,
              left: ringCx - sd / 2,
              top: ringCy - sd / 2,
            }}
          />
        );
      })}

      <View
        style={{
          position: "absolute",
          left: docLeft,
          top: docTop,
          width: docSize,
          alignItems: "center",
        }}
      >
        <ProfileAvatar
          overlaySource={centerOverlaySource}
          imageSource={centerImageSource}
          containerStyle={{ alignItems: "center" }}
          wrapperStyle={{ width: docSize, height: docSize }}
          overlayStyle={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            position: "absolute",
            borderRadius: overlayRadius,
          }}
          imageStyle={{
            width: imgSize,
            height: imgSize,
            borderRadius: imgSize / 2,
            resizeMode: "cover",
          }}
        />
        <Text style={[styles.centerLabel, centerLabelStyle, { fontSize: 14 }]}>
          {centerLabel}
        </Text>
      </View>

      {nodes.map((node) => {
        const wrapW = Math.round(node.figmaWrapW * sx);
        const left = Math.round(node.figmaLeft * sx);
        const top = Math.round(node.figmaTop * sy);

        return (
          <View key={node.id} style={{ position: "absolute", left, top, width: wrapW, alignItems: "center" }}>
            {renderNode({ node, sx, sy, btnSize })}
          </View>
        );
      })}
    </View>
  );
};

export default OrbitCluster;

const styles = StyleSheet.create({
  centerLabel: {
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
});
