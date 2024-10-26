import { StyleSheet } from "react-native";
import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "./helperFunc";
import { COLORS, ElevatedShadow } from "./theme";

export const CS = StyleSheet.create({
  h1: {
    color: COLORS.DarkBlue,
    fontSize: scaledFontSize(18),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
    marginBottom: GetOptimalHeight(6),
  },
  h2: {
    color: COLORS.DarkBlue,
    fontSize: scaledFontSize(16),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
    marginBottom: GetOptimalHeight(6),
  },
  h3: {
    color: COLORS.DarkBlue,
    fontSize: scaledFontSize(14),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
    marginVertical: GetOptimalHeight(4),
  },
  h4: {
    color: COLORS.DarkBlue,
    fontSize: scaledFontSize(12),
    fontWeight: "700",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
    marginVertical: GetOptimalHeight(4),
  },
  descBlack: {
    color: COLORS.Black,
    fontSize: scaledFontSize(11),
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
  },
  descPurple: {
    color: COLORS.DarkBlue,
    fontSize: scaledFontSize(12),
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
  },
  paragraph: {
    color: COLORS.DarkBlue,
    fontSize: scaledFontSize(14),
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  cardStyle: {
    padding: GetOptimalHeight(20),
    marginBottom: GetOptimalHeight(15),
    borderRadius: GetOptimalHeight(5),
    backgroundColor: COLORS.White,
    borderColor: COLORS.Grey,
  },
  newCardStyle: {
    padding: GetOptimalHeight(10),
    marginBottom: GetOptimalHeight(15),
    borderRadius: GetOptimalHeight(15),
    backgroundColor: COLORS.White,
    borderColor: COLORS.Grey,
  },
  row: {
    flexDirection: "row",
  },
  shadow: {
    ...ElevatedShadow,
  },
  container: {
    flex: 1,
  },
  whiteBackgound: {
    backgroundColor: COLORS.White,
  },
  whiteFont: {
    color: COLORS.White,
    fontFamily: "Roboto-Regular",
  },
  contentContainer: {
    padding: GetOptimalHeight(20),
    paddingBottom: GetOptimalHeight(100),
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  screenCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: GetOptimalHeight(5),
  },
  padding20: {
    padding: GetOptimalHeight(20),
  },
  alignItemsCenter: { alignItems: "center" },
  imageCoin: {
    width: GetOptimalWidth(45),
    height: GetOptimalHeight(45),
    resizeMode: "contain",
  },
  blueBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.DarkBlue,
    padding: GetOptimalHeight(10),
    borderRadius: GetOptimalHeight(0),
    ...ElevatedShadow,
  },
  backBtn: {
    alignSelf: "center",
    margin: GetOptimalHeight(10),
    borderColor: COLORS.DarkBlue,
    borderBottomWidth: 1,
  },
  marginZero: {
    marginVertical: 0,
  },

  cardImage: {
    width: GetOptimalWidth(30),
    height: GetOptimalHeight(30),
    resizeMode: "contain",
    marginRight: GetOptimalWidth(15),
    borderRadius: GetOptimalHeight(150),
  },
  newImageCardStyle: {
    width: "100%",
    height: GetOptimalHeight(180),
    borderRadius: GetOptimalHeight(10),
    marginBottom: GetOptimalHeight(8),
  },
  newCardBackgroundImage: {
    width: "100%",
    height: GetOptimalHeight(180),

    borderRadius: GetOptimalHeight(10),
  },
  horizontalPadding: {
    paddingHorizontal: GetOptimalWidth(10),
  },
  floatingBlueButton: {
    backgroundColor: COLORS.DarkBlue,
    alignSelf: "flex-start",
    paddingVertical: GetOptimalHeight(4),
    paddingHorizontal: GetOptimalWidth(8),
    borderRadius: GetOptimalHeight(10),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: GetOptimalHeight(15),
    left: GetOptimalHeight(10),
  },
  rightFloatingButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.DarkBlue,
    borderRadius: GetOptimalHeight(10),
    paddingVertical: GetOptimalHeight(4),
    paddingHorizontal: GetOptimalWidth(8),
  },
  blackColor: {
    alignSelf: "flex-start",
    color: COLORS.Black,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  justCenter: {
    justifyContent: "center",
  },
  iconView: {
    width: GetOptimalWidth(300),
    backgroundColor: null,
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
  },
  whiteFontSmall: {
    color: COLORS.White,
    fontSize: scaledFontSize(10),
    fontFamily: "Roboto-Regular",
  },
  darkShade: {
    backgroundColor: "#00000020",
    borderRadius: GetOptimalHeight(10),
    position: "absolute",
    width: "100%",
    height: GetOptimalHeight(180),
    padding: GetOptimalHeight(10),
  },
  boldFont: {
    fontWeight: "600",
    fontFamily: "Roboto-Regular",
  },
  normal: {
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
  },
  whiteCircle: {
    backgroundColor: COLORS.White,
    padding: GetOptimalHeight(8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: GetOptimalHeight(20),
    marginVertical: GetOptimalHeight(5),
  },
  readBlogIcon: {
    width: GetOptimalWidth(21),
    height: GetOptimalHeight(21),
    marginRight: GetOptimalWidth(5),
    resizeMode: "contain",
  },
  thirdWidth: {
    width: GetOptimalWidth(80),
    textAlign: "center",
  },
  outlineBox: {
    backgroundColor: "#ffffff",
    borderRadius: GetOptimalHeight(25),
    borderColor: COLORS.DarkBlue,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  donorName: {
    width: GetOptimalWidth(250),
  },
  rightButtonStyle: {
    width: GetOptimalWidth(230),
  },
  LeftBackButton: {
    width: GetOptimalWidth(80),
    height: GetOptimalHeight(46),
  },
  childImage: {
    width: "100%",
    height: GetOptimalHeight(300),
    resizeMode: "cover",
  },
  fontSize: {
    fontSize: scaledFontSize(10),
    fontFamily: "Roboto-Regular",
  },
});
