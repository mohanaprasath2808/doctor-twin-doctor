import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContextProvider from "./src/context/AuthContext";
import Router from "./src/router/Router";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
