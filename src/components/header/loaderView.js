import React, { Component } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "../../common/helperFunc";
import { COLORS } from "../../common/theme";

export default class LoaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { error } = this.props;
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "#00000070",
          // elevation:100,
          // zIndex:100,
        }}
      >
        {!error ? (
          <View
            style={{
              width: "80%",
              minHeight: "12%",
              backgroundColor: COLORS.White,
              borderRadius: GetOptimalHeight(10),
              padding: GetOptimalHeight(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={"orange"} />
          </View>
        ) : (
          <View
            style={{
              width: "80%",
              minHeight: "25%",
              backgroundColor: COLORS.White,
              borderRadius: GetOptimalHeight(10),
              padding: GetOptimalHeight(20),
              alignItems: "center",
            }}
          >
            <Icon
              size={60}
              name={"closecircleo"}
              type={"antdesign"}
              color={"red"}
            />
            <Text
              style={{
                fontSize: scaledFontSize(16),
                color: COLORS.Black,
                fontFamily: "Roboto-Regular",
                marginTop: GetOptimalHeight(5),
              }}
            >
              {"Oops"}
            </Text>
            <Text
              style={{
                fontSize: scaledFontSize(12),
                color: COLORS.Grey,
                fontFamily: "Roboto-Regular",
                marginTop: GetOptimalHeight(10),
              }}
            >
              {this.props?.errorMessage}
            </Text>
            <TouchableOpacity
              onPress={this.props.OkPress}
              style={{
                width: GetOptimalWidth(80),
                borderRadius: GetOptimalHeight(6),
                justifyContent: "center",
                alignItems: "center",
                height: GetOptimalHeight(40),
                backgroundColor: "orange",
                marginTop: GetOptimalHeight(15),
              }}
            >
              <Text
                style={{
                  fontSize: scaledFontSize(12),
                  fontFamily: "Roboto-Regular",
                  color: COLORS.White,
                }}
              >
                {"Ok"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
