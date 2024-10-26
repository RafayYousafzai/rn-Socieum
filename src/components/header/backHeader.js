import React, { Component } from "react";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "../../common/helperFunc";
import { Images } from "../../common/images";
import { COLORS } from "../../common/theme";

export default class BackHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, heading, description } = this.props;
    return (
      <LinearGradient
        colors={[COLORS.DarkBlue, COLORS.DarkBlue]} // if you will comment color map app will cause Exception
        style={styles.container}
      >
        <TouchableOpacity
          onPress={this.props.onBackPress}
          style={styles.backBtn}
        >
          <Icon
            size={GetOptimalHeight(20)}
            name={"arrowleft"}
            type={"antdesign"}
            color={COLORS.Grey}
          />
          <Text style={styles.backBtnText}>{"Back"}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DarkBlue,
    paddingTop:
      Platform.OS === "ios" ? GetOptimalHeight(60) : GetOptimalHeight(30),
    paddingBottom: GetOptimalHeight(10),
    paddingHorizontal: GetOptimalWidth(20),
    minHeight:
      Platform.OS === "ios" ? GetOptimalHeight(100) : GetOptimalHeight(70),
    flexDirection: "row",
  },
  heading: {
    color: COLORS.White,
    fontSize: scaledFontSize(20),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
    marginTop: GetOptimalHeight(10),
  },
  description: {
    color: COLORS.White,
    fontSize: scaledFontSize(12),
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
    marginTop: GetOptimalHeight(5),
  },
  bottom: {
    minHeight: GetOptimalHeight(70),
    justifyContent: "flex-end",
  },
  imageStyle: {
    width: GetOptimalHeight(110),
    height: GetOptimalHeight(50),
    resizeMode: "contain",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: GetOptimalWidth(65),
  },
  backBtnText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: scaledFontSize(15),
    fontFamily: "Roboto-Regular",
  },
});
