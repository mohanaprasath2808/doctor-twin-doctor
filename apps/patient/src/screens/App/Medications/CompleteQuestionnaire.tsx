import React, { useCallback, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicCheckbox from "../../../components/Common/NeumorphicCheckbox";
import StepProgressRow from "../../../components/Common/StepProgressRow";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import MessageWithQuestionIcon from "../../../assets/icons/messageWithQuestion.svg";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];
type NotificationChannel = "email" | "app" | "sms";

type QuestionnaireStep = {
  id: number;
  question: string;
  answerType: "text" | "chips" | "checkbox";
  chipOptions?: string[];
  checkboxOptions?: { id: NotificationChannel; label: string }[];
};

const QUESTIONNAIRE_STEPS: QuestionnaireStep[] = [
  {
    id: 1,
    question: "Have you signed the HIPAA consent form?",
    answerType: "text",
  },
  {
    id: 2,
    question: "Have you received prior authorization for this medication before?",
    answerType: "chips",
    chipOptions: ["Yes", "No"],
  },
  {
    id: 3,
    question: "Would you like to receive authorization updates via SMS, Email or App?",
    answerType: "checkbox",
    checkboxOptions: [
      { id: "email", label: "Email" },
      { id: "app", label: "App" },
      { id: "sms", label: "SMS" },
    ],
  },
];

const CompleteQuestionnaire = () => {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState(1);
  const [textAnswer, setTextAnswer] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<NotificationChannel[]>(["email"]);

  const totalSteps = QUESTIONNAIRE_STEPS.length;
  const stepConfig = QUESTIONNAIRE_STEPS[currentStep - 1];
  const isLastStep = currentStep === totalSteps;

  const toggleChannel = useCallback((id: NotificationChannel) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const onFooterPress = useCallback(() => {
    if (isLastStep) {
      navigation.goBack();
      return;
    }
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  }, [isLastStep, navigation, totalSteps]);

  const renderAnswer = () => {
    if (stepConfig.answerType === "text") {
      return (
        <InputField
          value={textAnswer}
          onChangeText={setTextAnswer}
          placeholder="Enter the answer"
          multiline
          borderRadius={10}
          minHeight={120}
          containerStyle={styles.textInput}
        />
      );
    }

    if (stepConfig.answerType === "chips" && stepConfig.chipOptions) {
      return (
        <View style={styles.chipRow}>
          {stepConfig.chipOptions.map((option) => (
            <FilterChip
              key={option}
              title={option}
              selected={selectedChip === option}
              onPress={() => setSelectedChip(option)}
              style={{ width: "48%" }}
              height={40}
              borderRadius={20}
            />
          ))}
        </View>
      );
    }

    if (stepConfig.answerType === "checkbox" && stepConfig.checkboxOptions) {
      return (
        <>
          {stepConfig.checkboxOptions.map((option, index) => (
            <View key={option.id}>
              <NeumorphicCheckbox
                label={option.label}
                selected={selectedChannels.includes(option.id)}
                onPress={() => toggleChannel(option.id)}
              />
              {index < stepConfig.checkboxOptions!.length - 1 ? (
                <View style={styles.divider} />
              ) : null}
            </View>
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Complete questionnaire</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StepProgressRow
          variant="continuous"
          totalSteps={totalSteps}
          currentStep={currentStep}
          containerStyle={styles.progressRow}
          segmentHeight={12}
          segmentBorderRadius={12}
          activeGradientColors={["#14B8D4", "#0E7490"]}
          inactiveBackgroundColor="#F7FBFF"
          activeShadowColor="#C1D5EE"
          activeShadowOpacity={0.3}
          activeShadowRadius={4}
          activeShadowOffset={{ width: 2, height: 2 }}
          inactiveDarkShadowColor="#C8CBCC"
          inactiveLightShadowColor={COLORS.LIGHT_SHADOW}
          inactiveDarkShadowDx={2}
          inactiveDarkShadowDy={2}
          inactiveDarkShadowBlur={6}
          inactiveLightShadowDx={-2}
          inactiveLightShadowDy={-2}
          inactiveLightShadowBlur={6}
        />

        <Text style={styles.stepLabel}>Step {currentStep}</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.questionInner} borderRadius={10}>
          <Text style={styles.cardLabel}>Question</Text>
          <View style={styles.questionRow}>
            <InnerShadowIcon
              icon={<MessageWithQuestionIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.questionText}>{stepConfig.question}</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.answerInner}
          borderRadius={10}
        >
          <Text style={styles.cardLabel}>Answer</Text>
          {renderAnswer()}
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title={isLastStep ? "Submit" : "Next"}
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={styles.footerBtn}
          onPress={onFooterPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompleteQuestionnaire;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  progressRow: {
    width: "100%",
    marginBottom: 12,
  },
  stepLabel: {
    marginBottom: 14,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  cardOuter: {
    width: "100%",
  },
  cardGap: {
    marginTop: 14,
  },
  questionInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  answerInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardLabel: {
    marginBottom: 12,
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  questionText: {
    flex: 1,
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 22,
  },
  textInput: {
    width: "100%",
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 12 : 8,
    backgroundColor: COLORS.SURFACE,
  },
  footerBtn: {
    alignSelf: "stretch",
  },
});
