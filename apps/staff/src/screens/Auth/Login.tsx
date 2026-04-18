import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Login must be used within AuthContextProvider");
  }

  const { setIsLogin } = authContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Login</Text>
      <Text style={styles.subtitle}>Tap below to continue to Home.</Text>
      <Pressable style={styles.button} onPress={() => setIsLogin(true)}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1d4ed8",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
