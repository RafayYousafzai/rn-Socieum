import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const LoadingScreen = ({ message = "Fetching..." }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ActivityIndicator animating={true} size="large" color="#000" />
      {/* <Text style={styles.text}>{message}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 12,
    color: "#000",
  },
});

export default LoadingScreen;
