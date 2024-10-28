import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ text, desc }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>{text}</Text>
        <Text style={styles.descriptionText}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: "25%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: "#90cdf4",
    textAlign: "center",
    marginTop: 4,
  },
});

export default Header;
