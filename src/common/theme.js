import { Platform } from "react-native";
const lighten = (value) => {
  const MAX_HEX_VALUE = 255;
  const hexValue = Math.floor(MAX_HEX_VALUE * Math.min(value, 1)).toString(16);
  return hexValue.length < 2 ? `0${hexValue}` : hexValue;
};
const SHADOW_SIZE = Platform.select({ ios: 2, android: 10 });
const alpha = (color, value) =>
  color.startsWith("#") ? `${color}${lighten(value)}` : color;

const COLORS = {
  //DarkBlue: "#800080",
  White: "#FFFFFF",
  Blue: "#4c669f",
  //DarkBlue: "#492062",
  DarkBlue: "#000000",

  Black: "#000000",
  Grey: "#9D9D9D",
  //lightPurple: "#672684",
  //lightPurple: "#BC53E6",
  lightPurple: "#000000",
  
};

export const ElevatedShadow = {
  shadowColor: alpha(COLORS.Black, 0.4),
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 6,
  elevation: SHADOW_SIZE,
};
export { COLORS };
