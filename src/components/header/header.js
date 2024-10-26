import React, { Component } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "../../common/helperFunc";
import { Images } from "../../common/images";
import { COLORS } from "../../common/theme";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, heading, description, logo } = this.props;
    return (


      heading && description ?
        <LinearGradient
          colors={[COLORS.DarkBlue, COLORS.DarkBlue]}
          style={styles.container}
        >

          {logo && (
            <Image source={Images.AppLogoWhiteNew} style={styles.imageStyle} />
          )}


          {heading && description && (
          <View style={styles.bottom}>
            <Text style={styles.heading}>{heading}</Text>
            
            <Text style={styles.description}>{description}</Text>
          </View>
        )}
        </LinearGradient>
        :
        <LinearGradient
          colors={[COLORS.DarkBlue, COLORS.DarkBlue]}
          style={styles.container1}
        >
        {logo && (
          <Image source={Images.AppLogoWhiteNew} style={styles.imageStyle1} />
        )}
        </LinearGradient>
        
        




    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DarkBlue,
    paddingTop:
      Platform.OS == "ios" ? GetOptimalHeight(35) : GetOptimalHeight(30),
    paddingBottom: GetOptimalHeight(10),
    paddingHorizontal: GetOptimalWidth(20),
    borderBottomLeftRadius: GetOptimalHeight(30),
    borderBottomRightRadius: GetOptimalHeight(30),
    minHeight: GetOptimalHeight(110),
    justifyContent: "space-between",
  },
  container1: {
    backgroundColor: COLORS.DarkBlue,
    paddingTop:
      Platform.OS == "ios" ? GetOptimalHeight(35) : GetOptimalHeight(30),
    paddingBottom: GetOptimalHeight(10),
    paddingHorizontal: GetOptimalWidth(20),
    borderBottomLeftRadius: GetOptimalHeight(30),
    borderBottomRightRadius: GetOptimalHeight(30),
    minHeight: GetOptimalHeight(10),
    justifyContent: "space-between",
  },

  heading: {
    color: COLORS.White,
    fontSize: scaledFontSize(20),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
    marginTop: GetOptimalHeight(10),
  },

  headingHomeText: {
    color: COLORS.White,
    fontSize: scaledFontSize(25),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
  },

  description: {
    color: COLORS.White,
    fontSize: scaledFontSize(12),
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
    marginTop: GetOptimalHeight(5),
  },
  bottom: {
    //minHeight: GetOptimalHeight(10),
    justifyContent: "flex-end",
  },
  imageStyle: {
    width: GetOptimalHeight(200),
    height: GetOptimalHeight(90),
    resizeMode: "contain",
    alignSelf: "center"
  },

  imageStyle1: {
    width: GetOptimalHeight(200),
    height: GetOptimalHeight(50),
    resizeMode: "contain",
    alignSelf: "center"
  },
});
