import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { COLORS } from "../constants/theme";
import AppStack from "./App/AppStack";
import AuthStack from "./Auth/AuthStack";
import { useRoute } from "./useRoute";

const AuthBootstrapScreen = () => (
  <View style={styles.bootstrap} accessibilityLabel="Loading">
    <ActivityIndicator size="large" color={COLORS.PRIMARY} />
  </View>
);

const Router = () => {
  const route = useRoute();
  if (route === "loading") {
    return <AuthBootstrapScreen />;
  }
  return route === "app" ? <AppStack /> : <AuthStack />;
};

export default Router;

const styles = StyleSheet.create({
  bootstrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.INNER_SURFACE,
  },
});
