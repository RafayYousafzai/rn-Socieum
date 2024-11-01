import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = ({ text, desc, logo }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>
          {text}
          {logo && (
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
            />
          )}
        </Text>
        <Text style={styles.descriptionText}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 200,
    width: "100%",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    display: "flex",
  },
  descriptionText: {
    fontSize: 16,
    color: "#90cdf4",
    textAlign: "center",
    marginTop: 4,
  },
  logo: {
    height: 40,
    width: 50,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default Header;
