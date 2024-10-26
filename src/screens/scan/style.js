import { StyleSheet } from "react-native";
import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "../../common/helperFunc";
import { COLORS, ElevatedShadow } from "../../common/theme";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
  },
  qrImage: {
    height: GetOptimalHeight(250),
    width: GetOptimalWidth(250),
    backgroundColor: COLORS.White,
    marginTop: GetOptimalHeight(40),
    justifyContent: "center",
    alignItems: "center",
    ...ElevatedShadow,
  },
  Qr: {
    height: GetOptimalHeight(200),
    width: GetOptimalWidth(200),
    resizeMode: "contain",
  },
  QrScanIcon: {
    marginTop: GetOptimalHeight(30),
    height: GetOptimalHeight(40),
    width: GetOptimalWidth(40),
    resizeMode: "contain",
    alignSelf: "center",
  },
  scan: {
    alignSelf: "center",
    fontSize: scaledFontSize(16),
    marginTop: GetOptimalHeight(5),
    fontWeight: "bold",
    fontFamily: "Roboto-Regular",
  },
  codeArea: {
    flexDirection: "row",
    marginTop: GetOptimalHeight(20),
  },
  inputStyle: {
    backgroundColor: COLORS.White,
    padding: GetOptimalHeight(10),
    borderRadius: GetOptimalHeight(6),
    width: GetOptimalWidth(300),
    height: GetOptimalHeight(40),
  },
  btnStyle: {
    width: GetOptimalWidth(40),
    height: GetOptimalHeight(40),
    backgroundColor: COLORS.White,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: GetOptimalHeight(5),
    borderRadius: GetOptimalHeight(6),
  },
  btnImage: {
    width: GetOptimalWidth(15),
    height: GetOptimalHeight(15),
    resizeMode: "contain",
  },
});
