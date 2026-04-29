import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContextProvider from "./src/context/AuthContext";
import Router from "./src/router/Router";
import { useFonts } from "expo-font";

const App = () => {
  const [fontLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("./src/assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Medium": require("./src/assets/fonts/SF-Pro-Display-Medium.otf"),
    SFMonoHeavy: require("./src/assets/fonts/SFMonoHeavy.otf"),
    "SF-Pro-Text-BoldItalic": require("./src/assets/fonts/SF-Pro-Text-BoldItalic.otf"),
    SFMonoSemibold: require("./src/assets/fonts/SFMonoSemibold.otf"),
    "SF-Pro-Display-Semibold": require("./src/assets/fonts/SF-Pro-Display-Semibold.otf"),
    "SF-Pro-Display-Heavy": require("./src/assets/fonts/SF-Pro-Display-Heavy.otf"),
    SFMonoSemiboldItalic: require("./src/assets/fonts/SFMonoSemiboldItalic.otf"),
    "SF-Pro-Text-BlackItalic": require("./src/assets/fonts/SF-Pro-Text-BlackItalic.otf"),
    "SF-Pro-Text-Bold": require("./src/assets/fonts/SF-Pro-Text-Bold.otf"),
    "SF-Pro-Display-HeavyItalic": require("./src/assets/fonts/SF-Pro-Display-HeavyItalic.otf"),
    SFMonoMedium: require("./src/assets/fonts/SFMonoMedium.otf"),
    SFMonoLight: require("./src/assets/fonts/SFMonoLight.otf"),
    "SF-Pro-Display-SemiboldItalic": require("./src/assets/fonts/SF-Pro-Display-SemiboldItalic.otf"),
    "SF-Pro-Display-Bold": require("./src/assets/fonts/SF-Pro-Display-Bold.otf"),
    "SF-Pro-Display-RegularItalic": require("./src/assets/fonts/SF-Pro-Display-RegularItalic.otf"),
    "SF-Pro-Display-MediumItalic": require("./src/assets/fonts/SF-Pro-Display-MediumItalic.otf"),
    SFMonoRegularItalic: require("./src/assets/fonts/SFMonoRegularItalic.otf"),
    "SF-Pro-Text-Heavy": require("./src/assets/fonts/SF-Pro-Text-Heavy.otf"),
    SFMonoMediumItalic: require("./src/assets/fonts/SFMonoMediumItalic.otf"),
    "SF-Pro-Display-ThinItalic": require("./src/assets/fonts/SF-Pro-Display-ThinItalic.otf"),
    "SF-Pro-Display-BoldItalic": require("./src/assets/fonts/SF-Pro-Display-BoldItalic.otf"),
    "SF-Pro-Display-Light": require("./src/assets/fonts/SF-Pro-Display-Light.otf"),
    "SF-Pro-Display-Ultralight": require("./src/assets/fonts/SF-Pro-Display-Ultralight.otf"),
    "SF-Pro-Text-Black": require("./src/assets/fonts/SF-Pro-Text-Black.otf"),
    "SF-Pro-Display-Thin": require("./src/assets/fonts/SF-Pro-Display-Thin.otf"),
    SFMonoLightItalic: require("./src/assets/fonts/SFMonoLightItalic.otf"),
    SFMonoHeavyItalic: require("./src/assets/fonts/SFMonoHeavyItalic.otf"),
    "SF-Pro-Display-Black": require("./src/assets/fonts/SF-Pro-Display-Black.otf"),
    SFMonoRegular: require("./src/assets/fonts/SFMonoRegular.otf"),
    "SF-Pro-Display-LightItalic": require("./src/assets/fonts/SF-Pro-Display-LightItalic.otf"),
    SFMonoBold: require("./src/assets/fonts/SFMonoBold.otf"),
    "SF-Pro-Display-UltralightItalic": require("./src/assets/fonts/SF-Pro-Display-UltralightItalic.otf"),
    SFMonoBoldItalic: require("./src/assets/fonts/SFMonoBoldItalic.otf"),
    "SF-Pro-Display-BlackItalic": require("./src/assets/fonts/SF-Pro-Display-BlackItalic.otf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <AuthContextProvider>
              <Router />
            </AuthContextProvider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
