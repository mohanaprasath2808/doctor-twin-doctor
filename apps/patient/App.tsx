import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./src/context/AuthContext";
import AppContextProvider from "./src/context/AppContext";
import Router from "./src/router/Router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { COLORS } from "./src/constants/theme";
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="dark-content" />
      <NavigationContainer>
        <AuthContextProvider>
          <AppContextProvider>
            <BottomSheetModalProvider>
              <Router />
            </BottomSheetModalProvider>
          </AppContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
  },
});
