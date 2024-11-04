import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = ({ text, desc, desc2, logo, light }) => {
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
        {desc && (
          <Text
            style={[
              styles.descriptionText,
              { color: light ? "#fff" : "#fff" },
            ]}
          >
            {desc}
          </Text>
        )}
        {desc2 && (
          <Text
            style={[
              styles.descriptionText,
              { color: light ? "#fff" : "#fff" },
            ]}
          >
            {desc2}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 160,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 20,
    // justifyContent: "center",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
  },
  innerContainer: {
    paddingBottom: 10,
    paddingTop: 30,
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
