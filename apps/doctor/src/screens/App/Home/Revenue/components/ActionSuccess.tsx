import React from "react";
import { StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionSuccessScreen from "../../../../../components/Common/ActionSuccessScreen";
import navigationStrings from "../../../../../constants/navigationStrings";
import { COLORS } from "../../../../../constants/theme";

export type ActionSuccessResetRoute = {
  name: string;
  params?: object;
};

export type ActionSuccessParams = {
  title: string;
  subtitle?: string;
  buttonTitle?: string;
  layout?: "single" | "dualActions";
  secondaryButtonTitle?: string;
  primaryButtonTitle?: string;
  trackRouteName?: string;
  /** @deprecated Prefer resetRoutes — pops stack to this screen when it exists in history */
  returnRouteName?: string;
  /** Replaces stack so back does not return to success or screens opened after the target */
  resetRoutes?: ActionSuccessResetRoute[];
};

const ActionSuccess = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ ActionSuccess: ActionSuccessParams }, "ActionSuccess">>();
  const params = route.params;

  const handleConfirm = () => {
    if (params.resetRoutes?.length) {
      navigation.reset({
        index: params.resetRoutes.length - 1,
        routes: params.resetRoutes,
      });
      return;
    }

    const destination = params.returnRouteName;
    if (!destination) {
      navigation.goBack();
      return;
    }

    const routes = navigation.getState()?.routes ?? [];
    const canPopTo = routes.some((route: { name: string }) => route.name === destination);

    if (canPopTo && typeof navigation.popTo === "function") {
      navigation.popTo(destination);
      return;
    }

    navigation.reset({
      index: 1,
      routes: [
        { name: navigationStrings.HOME },
        { name: destination },
      ],
    });
  };

  const handleTrackStatus = () => {
    if (params.trackRouteName) {
      navigation.navigate(params.trackRouteName);
    }
  };

  const isDual = params.layout === "dualActions";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ActionSuccessScreen
        title={params.title}
        subtitle={params.subtitle}
        buttonTitle={params.buttonTitle ?? "Confirm & Close"}
        layout={params.layout}
        secondaryButtonTitle={params.secondaryButtonTitle ?? "Track Status"}
        primaryButtonTitle={params.primaryButtonTitle ?? "Back to Dashboard"}
        onBackPress={() => navigation.goBack()}
        onConfirmPress={handleConfirm}
        onSecondaryPress={isDual ? handleTrackStatus : undefined}
      />
    </SafeAreaView>
  );
};

export default ActionSuccess;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
});
