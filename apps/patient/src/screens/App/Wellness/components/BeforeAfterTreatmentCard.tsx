import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import { COLORS } from "../../../../constants/theme";
import appointmentDummy from "../../../../assets/images/tempImage/teachingImg.png";


type BeforeAfterTreatmentCardProps = {
  title: string;
  subtitle: string;
  showAction?: boolean;
  onPressAction?: () => void;
  onPressCard?: () => void;
  showLabels?: boolean;
};

const BeforeAfterTreatmentCard: React.FC<BeforeAfterTreatmentCardProps> = ({
  title,
  subtitle,
  showAction = true,
  onPressAction,
  onPressCard,
  showLabels = false,
}) => {
  return (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={12}
      onPress={onPressCard}
    >
      {showLabels ? (
        <View style={styles.labelsRow}>
          <Text style={styles.labelText}>Before</Text>
          <Text style={styles.labelText}>After</Text>
        </View>
      ) : null}

      <View style={styles.imageRow}>
        <Image source={appointmentDummy} style={styles.image} />
        <View style={styles.imageDivider} />
        <Image source={appointmentDummy} style={styles.image} />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {showAction ? (
          <AppButton
            text="View details"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            width={98}
            height={28}
            borderRadius={18}
            textStyle={styles.buttonText}
            onPress={onPressAction}
          />
        ) : null}
      </View>
    </NeumorphicCard>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 28 / 2,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  imageRow: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
  },
  image: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
  },
  imageDivider: {
    width: 2,
    backgroundColor: "#F0F2F5",
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  buttonText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default BeforeAfterTreatmentCard;
