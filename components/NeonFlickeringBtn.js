import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const NeonFlickeringButton = ({ label, onPress }) => {
  const [isFlickering, setIsFlickering] = useState(false);

  const flickerValue = new Animated.Value(0);

  useEffect(() => {
    // Toggle the opacity value between 0 and 1 in a loop
    const flickerInterval = setInterval(() => {
      Animated.timing(flickerValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(flickerValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      });
    }, 500);

    return () => {
      clearInterval(flickerInterval);
    };
  }, [isFlickering]);

  const buttonStyles = {
    backgroundColor: flickerValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#00FF00", "#00AA00"], // Neon green to a slightly darker green
    }),
    borderColor: "#00FF00", // Neon green border
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles]}
      onPress={onPress}
      onPressIn={() => setIsFlickering(true)}
      onPressOut={() => setIsFlickering(false)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 2,
  },
  buttonText: {
    color: "#00FF00", // Neon green text
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NeonFlickeringButton;
