import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
// import { SvgXml } from "react-native-svg";
// import TMDBlogo from "../images/TMDBlogo.svg";
// import TMDBLogo from "./TMDBLogo";

const About = ({ handleBackAbout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Text>
      {/* <TMDBLogo svgFile={TMDBlogo} /> */}
      <TouchableOpacity style={styles.button} onPress={handleBackAbout}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;

const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 80;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#009572",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 20,
    width: (screenWidth * buttonWidthPercentage) / 100,
    elevation: 3,
    shadowColor: "#10495C",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    paddingBottom: 20,
  },
});
