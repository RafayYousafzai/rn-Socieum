import { StyleSheet } from "react-native";
import { GetOptimalHeight } from "../../common/helperFunc";
import { COLORS } from "../../common/theme";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  bottomArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: GetOptimalHeight(300),
    height: GetOptimalHeight(330),
    resizeMode: "contain",
    marginBottom: GetOptimalHeight(70),
  },
});
