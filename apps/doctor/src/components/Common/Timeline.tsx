import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/theme";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import SelectedIcon from "../../assets/icon/selectedIcon.svg";

type TimelineBaseItem = {
  id: string;
  title?: string;
  time?: string;
  isCompleted?: boolean;
};

type TimelineProps<T extends TimelineBaseItem> = {
  data: T[];
  rowSpacing?: number;
  columnWidth?: number;
  connectorColor?: string;
  connectorWidth?: number;
  connectorMinHeight?: number;
  connectorTopOffset?: number;
  connectorBottomOffset?: number;
  nodeSize?: number;
  contentGap?: number;
  rowStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  timeStyle?: StyleProp<TextStyle>;
  renderNode?: (item: T, index: number, isLast: boolean) => React.ReactNode;
  renderTitle?: (item: T, index: number) => React.ReactNode;
  renderTime?: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
};

const Timeline = <T extends TimelineBaseItem>({
  data,
  rowSpacing = 20,
  columnWidth = 30,
  connectorColor = "#D0D4DB",
  connectorWidth = 1.5,
  connectorMinHeight = 26,
  connectorTopOffset = 2,
  connectorBottomOffset = 2,
  nodeSize = 30,
  contentGap = 12,
  rowStyle,
  contentStyle,
  titleStyle,
  timeStyle,
  renderNode,
  renderTitle,
  renderTime,
  keyExtractor,
}: TimelineProps<T>) => {
  return (
    <>
      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        const key = keyExtractor?.(item, index) ?? item.id ?? String(index);
        return (
          <View key={key} style={[styles.rowWrap, rowStyle]}>
            <View style={[styles.timelineColumn, { width: columnWidth }]}>
              {renderNode ? (
                renderNode(item, index, isLast)
              ) : item.isCompleted ? (
                <SelectedIcon width={nodeSize} height={nodeSize} />
              ) : (
                <InnerShadowIcon size={nodeSize} icon={<View style={styles.emptyDot} />} />
              )}
              {!isLast && (
                <View
                  style={{
                    width: connectorWidth,
                    flex: 1,
                    minHeight: connectorMinHeight,
                    backgroundColor: connectorColor,
                    marginTop: connectorTopOffset,
                    marginBottom: connectorBottomOffset,
                  }}
                />
              )}
            </View>
            <View style={[styles.rowContent, { marginLeft: contentGap, paddingBottom: isLast ? 0 : rowSpacing }, contentStyle]}>
              {renderTitle ? (
                renderTitle(item, index)
              ) : (
                <Text style={[styles.rowTitle, titleStyle]}>{item.title ?? ""}</Text>
              )}
              {renderTime ? (
                renderTime(item, index)
              ) : (
                <Text style={[styles.rowTime, timeStyle]}>{item.time ?? ""}</Text>
              )}
            </View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  rowWrap: { flexDirection: "row", alignItems: "center" },
  timelineColumn: { alignItems: "center" },
  rowContent: {
    // paddingTop: 7,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  rowTitle: { flex: 1, color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  rowTime: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400", flexShrink: 0 },
  emptyDot: { width: 1, height: 1 },
});

export default Timeline;

