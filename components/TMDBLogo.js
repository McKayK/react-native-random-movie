import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";

const TMDBLogo = ({ svgFile }) => {
  return (
    <View>
      <SvgXml xml={svgFile} />
    </View>
  );
};

export default TMDBLogo;

// const styles = StyleSheet.create({});
