import { Platform, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import Router from './src/router/Router';
import AuthContextProvider from './src/context/AuthContext';
import AppContextProvider from './src/context/AppContext';
import { COLORS } from './src/constants/theme';

const App = () => {
  return (
    <ToastProvider
      placement="top"
      offsetTop={Platform.OS === 'android' ? 40 : 0}
      renderType={{
        success: toast => (
          <View pointerEvents="box-none" style={styles.toastContainer}>
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        ),
        danger: toast => (
          <View pointerEvents="box-none" style={styles.toastContainer}>
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        ),
        warning: toast => (
          <View pointerEvents="box-none" style={styles.toastContainer}>
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        ),
      }}
    >
      <StatusBar style="light" backgroundColor={COLORS.PRIMARY} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <AppContextProvider>
              <AuthContextProvider>
                <Router />
              </AuthContextProvider>
            </AppContextProvider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ToastProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#22c55e',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
  },
});
