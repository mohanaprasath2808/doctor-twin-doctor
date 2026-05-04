import { Modal, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Router from "./src/router/Router";
import { useAuthStore } from "./src/store/useAuthStore";
import { COLORS } from "./src/constants/theme";
import OfflineMode from "./src/screens/Auth/OfflineMode";
import { useFonts } from "expo-font";
import NeomorphicToast from "./src/neomorphism/NeomorphicToast";

const App = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isOfflineDismissed, setIsOfflineDismissed] = useState(false);
  const [sessionHydrated, setSessionHydrated] = useState(false);
  const hydrateFromStorage = useAuthStore((s) => s.hydrateFromStorage);

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

  useEffect(() => {
    let fallbackInterval: ReturnType<typeof setInterval> | null = null;
    let inFlight = false;

    const applyConnectionState = (disconnected: boolean) => {
      setIsOffline(disconnected);
      if (!disconnected) {
        setIsOfflineDismissed(false);
      }
    };

    const probeUrls = [
      "https://clients3.google.com/generate_204",
      "https://www.gstatic.com/generate_204",
      "https://www.apple.com/library/test/success.html",
    ];

    const probeOnline = async (url: string) => {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 3000),
      );
      const response = (await Promise.race([
        fetch(url, { method: "GET" }),
        timeoutPromise,
      ])) as Response;
      return response.status >= 200 && response.status < 500;
    };

    const checkConnection = async () => {
      if (inFlight) return;
      inFlight = true;
      let isOnline = false;
      for (const url of probeUrls) {
        try {
          isOnline = await probeOnline(url);
          if (isOnline) break;
        } catch {
          // try next probe URL
        }
      }
      applyConnectionState(!isOnline);
      inFlight = false;
    };

    checkConnection();
    fallbackInterval = setInterval(checkConnection, 3000);

    return () => {
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, []);

  useEffect(() => {
    void hydrateFromStorage().finally(() => setSessionHydrated(true));
  }, [hydrateFromStorage]);

  if (!fontLoaded || !sessionHydrated) {
    return null;
  }

  const shouldShowOfflineMode = isOffline && !isOfflineDismissed;

  return (
    <ToastProvider
      placement="top"
      offsetTop={Platform.OS === "android" ? 40 : 0}
      renderType={{
        success: (toast) => <NeomorphicToast toast={toast} variant="success" />,
        warning: (toast) => <NeomorphicToast toast={toast} variant="warning" />,
        danger: (toast) => <NeomorphicToast toast={toast} variant="danger" />,
      }}
    >
      <StatusBar style="light" backgroundColor={COLORS.PRIMARY} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Router />
            <Modal
              visible={shouldShowOfflineMode}
              animationType="fade"
              presentationStyle="fullScreen"
            >
              <OfflineMode onClose={() => setIsOfflineDismissed(true)} />
            </Modal>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ToastProvider>
  );
};

export default App;
