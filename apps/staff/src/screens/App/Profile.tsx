import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../constants/theme";

const Profile = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Profile must be used within AuthContextProvider");
  }

  const { setIsLogin } = authContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.button} onPress={() => setIsLogin(false)}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 999,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
});
