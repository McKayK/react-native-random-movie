import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";

const Popup = ({ popupMessage, handlePopupStatus }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePopupStatus();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        handlePopupStatus();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>{popupMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  popupText: {
    fontSize: 16,
    color: "#009572",
    textAlign: "center",
  },
});
