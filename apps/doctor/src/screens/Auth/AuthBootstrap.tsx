import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import { hasAuthSession } from "../../utils/authStorage";

/**
 * Decides initial auth flow: returning users (local session) → Secure Login for Face ID;
 * new installs → SSO onboarding.
 */
const AuthBootstrap = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const returning = await hasAuthSession();
        if (cancelled) return;
        navigation.replace(
          returning ? navigationStrings.SECURE_LOGIN : navigationStrings.SSO_SIGN_IN,
        );
      } catch {
        if (!cancelled) {
          navigation.replace(navigationStrings.SSO_SIGN_IN);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY_DARK} />
    </View>
  );
};

export default AuthBootstrap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    alignItems: "center",
    justifyContent: "center",
  },
});
