import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Home must be used within AuthContextProvider");
  }

  const { setIsLogin } = authContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Home</Text>
      <Text style={styles.subtitle}>You are logged in.</Text>
      <Pressable style={styles.button} onPress={() => setIsLogin(false)}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f9fafb",
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
    backgroundColor: "#dc2626",
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
