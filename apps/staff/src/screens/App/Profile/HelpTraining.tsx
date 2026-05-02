import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import BookWithQuestionMarkIcon from "../../../assets/icon/bookWithQuestionMark.svg";
import BookWithInfoIcon from "../../../assets/icon/bookWithInfo.svg";
import VideoWorkflowIcon from "../../../assets/icon/videoWorkflow.svg";
import NotepadIcon from "../../../assets/icon/notepadIcon.svg";
import NeumorphicSwitch from "../../../components/Common/NeumorphicSwitch";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type HelpItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const HELP_ITEMS: HelpItem[] = [
  {
    id: "getting-started",
    title: "Getting Started Guide",
    icon: <BookWithInfoIcon width={20} height={20} />,
  },
  {
    id: "tutorials",
    title: "Workflow Tutorials",
    icon: <VideoWorkflowIcon width={20} height={20} />,
  },
  {
    id: "docs",
    title: "Documentation Library",
    icon: <NotepadIcon width={20} height={20} />,
  },
];

const H_PADDING = 16;
const TAB_BAR_CLEARANCE = 110;

const HelpTraining = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [guidedMode, setGuidedMode] = useState(true);
  const bottomPad = Math.max(insets.bottom, 12) + TAB_BAR_CLEARANCE;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Help & Training</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatarContainer}
            wrapperStyle={styles.heroAvatarWrap}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />
          <Text style={styles.heroSubtitle}>I'm here to guide you.</Text>

          <NeumorphicCard borderRadius={12} innerStyle={styles.guidedCardInner} outerStyle={styles.guidedCard}>
            <View style={styles.guidedRow}>
              <InnerShadowIcon
                size={42}
                icon={<BookWithQuestionMarkIcon width={20} height={20} />}
              />
              <View style={styles.guidedTextWrap}>
                <Text style={styles.guidedTitle}>Guided Mode</Text>
                <Text style={styles.guidedSubtitle}>Learn step-by-step workflows</Text>
              </View>
              <NeumorphicSwitch value={guidedMode} onValueChange={setGuidedMode} />
            </View>
          </NeumorphicCard>

          <View style={styles.helpList}>
            {HELP_ITEMS.map((item) => (
              <NeumorphicCard key={item.id} borderRadius={12} innerStyle={styles.helpCardInner} outerStyle={styles.helpCard}>
                <View style={styles.helpRow}>
                  <InnerShadowIcon size={40} icon={item.icon} />
                  <Text style={styles.helpTitle}>{item.title}</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={COLORS.TEXT_60}
                    style={styles.helpChevron}
                  />
                </View>
              </NeumorphicCard>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HelpTraining;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: H_PADDING,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  heroAvatarContainer: {
    marginTop: 20,
  },
  heroAvatarWrap: {
    width: 188,
    height: 188,
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  heroImage: {
    width: 116,
    height: 116,
    borderRadius: 100,
    resizeMode: "cover",
  },
  heroSubtitle: {
    marginTop: 6,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 32 / 2,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
  guidedCard: {
    marginTop: 8,
  },
  guidedCardInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  guidedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  guidedTextWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  guidedTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  guidedSubtitle: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  helpList: {
    // marginTop: 20,
  },
  helpCard: {
    marginTop: 20,
  },
  helpCardInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  helpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  helpTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  helpChevron: {
    marginLeft: 8,
  },
});
