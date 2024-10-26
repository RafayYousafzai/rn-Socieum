import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const { width: fullWidth, height: fullHeight } = Dimensions.get(
  "window"
);
const DESIGN_DIMENSIONS = { width: 375, height: 812 };

export const GetOptimalHeight = (height) => {
  return fullHeight * (height / DESIGN_DIMENSIONS.height);
};
export const GetOptimalWidth = (width) => {
  return fullWidth * (width / DESIGN_DIMENSIONS.width);
};

export const scaledFontSize = (fontSize) => {
  return RFValue(fontSize);
};
