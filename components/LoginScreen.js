import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const LoginScreen = ({ handleLogin, handleBackLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = () => {
    handleLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleBackLogin}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, styles.inputWidth]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, styles.inputWidth]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      {/* <TouchableOpacity style={styles.button} onPress={handleBackLogin}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  inputWidth: {
    width: screen.width * 0.8,
  },
  loginButton: {
    backgroundColor: "#B28A28",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#B28A28",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default LoginScreen;
