import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import InputField from "../../../../neomorphism/InputField";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";

const RequestReviewSent = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Request Review</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          wrapperStyle={styles.avatarWrapper}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>Scheduling Request Sent</Text>

        <NeumorphicCard outerStyle={styles.infoOuter} innerStyle={styles.infoInner} borderRadius={10}>
          <View style={styles.infoRow}>
            <InnerShadowIcon icon={<MessageIcon width={15} height={15} />} size={28} />
            <View>
              <Text style={styles.infoTitle}>Scheduling request sent to Megan (MA)</Text>
              <Text style={styles.infoSub}>Megan will call Sarah Williams ASAP to book.</Text>
            </View>
          </View>

          <Text style={styles.messageTitle}>Message sent to Sarah Williams</Text>
          <InputField
            value={"We're scheduling you for a follow-up visit.\nExpect a call soon"}
            editable={false}
            multiline
            minHeight={72}
            borderRadius={10}
            containerStyle={styles.messageField}
            style={styles.messageBody}
          />
        </NeumorphicCard>

        <ReusableButton
          title="Done"
          containerStyle={styles.doneBtn}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 170, height: 170, marginTop: 18 },
  avatarImage: { width: 86, height: 86, borderRadius: 43 },
  title: { marginTop: 0, textAlign: "center", color: COLORS.TEXT_DARK, fontSize: 24, fontWeight: "500" },
  infoOuter: { marginTop: 18 },
  infoInner: { borderRadius: 10, padding: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoTitle: { color: COLORS.TEXT_DARK, fontSize: 11, fontWeight: "500" },
  infoSub: { color: COLORS.TEXT_60, fontSize: 9, fontWeight: "400", marginTop: 1 },
  messageTitle: { color: COLORS.TEXT_DARK, fontSize: 11, fontWeight: "500", marginTop: 14 },
  messageField: { marginTop: 10 },
  messageBody: { color: COLORS.TEXT_60, fontSize: 11, fontWeight: "400", lineHeight: 16 },
  doneBtn: { marginTop: 28, height: 44, borderRadius: 22 },
});

export default RequestReviewSent;
