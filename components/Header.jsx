import React from "react";
import { useWindowDimensions } from "react-native";
import { View, Text, StyleSheet, Image, Platform } from "react-native";

const Header = ({ text, desc, desc2, logo, light }) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 800;

  return (
    <View
      style={[
        styles.headerContainer,
        isLargeScreen && styles.desktopHeader,
        Platform.OS === "web" &&
          !isLargeScreen && { height: 140, paddingHorizontal: 40 },
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          Platform.OS === "web" && styles.desktopInnerContainer,
        ]}
      >
        <Text
          style={[styles.headerText, isLargeScreen && styles.desktopHeaderText]}
        >
          {text}
          {logo && (
            <Image
              source={require("@/assets/images/icon.png")}
              style={[styles.logo, Platform.OS === "web" && styles.desktopLogo]}
            />
          )}
        </Text>
        {desc && (
          <Text
            style={[
              styles.descriptionText,
              { color: light ? "#fff" : "#fff" },
              isLargeScreen && styles.desktopDescriptionText,
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
              isLargeScreen && styles.desktopDescriptionText,
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
  },
  desktopHeader: {
    height: 100,
    paddingTop: 10,
    alignItems: "center",
    textAlign: "center",
  },
  innerContainer: {
    paddingBottom: 10,
    paddingTop: 30,
  },
  desktopInnerContainer: {
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    display: "flex",
  },
  desktopHeaderText: {
    fontSize: 20,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    flexShrink: 1,
    maxWidth: Platform.OS !== "web" ? "90%" : "100%",
    lineHeight: 22,
    marginTop: 4,
  },
  desktopDescriptionText: {
    fontSize: 14,
    lineHeight: 28,
  },
  logo: {
    height: 35,
    width: 30,
    resizeMode: "cover",
  },
  desktopLogo: {
    height: 50,
    width: 45,
  },
});

export default Header;
