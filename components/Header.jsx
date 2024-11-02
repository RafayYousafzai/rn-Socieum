import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = ({ text, desc, logo, light }) => {
  // Insert a line break after commas
  const formattedText = text.replace(/, /g, ",\n");
  const formattedDesc = desc.replace(/, /g, ",\n");

  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>
          {formattedText}
          {logo && (
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
            />
          )}
        </Text>
        <Text
          style={[
            styles.descriptionText,
            { color: light ? "#fff" : "#90cdf4" },
          ]}
        >
          {formattedDesc}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 170,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    textAlign: "center",
    maxWidth: "90%",
    flexShrink: 1,
    lineHeight: 22,
    marginTop: 4,
  },
  logo: {
    height: 35,
    width: 30,
    resizeMode: "cover",
  },
});

export default Header;
