import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { GetOptimalHeight } from "../../common/helperFunc";
import { Images } from "../../common/images";
import { COLORS, ElevatedShadow } from "../../common/theme";
import { navigate } from "./navigationHelpers";
import { Icon } from "react-native-elements";
import { Platform } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Home",
      visible: true,
    };
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this.keyboardEventListeners = [
        Keyboard.addListener("keyboardDidShow", this.visible(false)),
        Keyboard.addListener("keyboardDidHide", this.visible(true)),
      ];
    }
  }
  componentWillUnmount() {
    this.keyboardEventListeners?.forEach((eventListener) =>
      eventListener?.remove()
    );
  }
  handleNavigation = (routeKey) => {
    navigate(routeKey);
  };
  visible = (visible) => () => this.setState({ visible });
  render() {
    const { routeNames, index } = this?.props?.state;
    const activeTab = routeNames[index];
    if (!this.state.visible) return null;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.handleNavigation("Home")}
        >
          {activeTab === "Home" ? (
            <View style={styles.imageSelected}>
              <Entypo
                size={GetOptimalHeight(25)}
                color={COLORS.DarkBlue}
                name="home"
              />
            </View>
          ) : (
              <View style={styles.imageSelected}>
                <Entypo
                  size={GetOptimalHeight(23)}
                  color={COLORS.Grey}
                  name="home"
                />
              </View>
            )}
          <Text style={{fontFamily:"Roboto-Regular"}}> {"Home"} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.handleNavigation("Scan")}
        >
          {activeTab == "Scan" ? (
            <Image
              source={Images.Scan_active}
              style={[styles.imageStyle, styles.imageSelected]}
            />
          ) : (
              <View style={styles.imageSelected}>
                <Icon
                  size={GetOptimalHeight(26)}
                  name={"scanner"}
                  type={"MaterialIcons"}
                  color={COLORS.Grey}
                />
              </View>
            )}
          <Text style={{fontFamily:"Roboto-Regular"}}> {"Scan"} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.handleNavigation("History")}
        >
          {activeTab == "History" ? (
            <Image
              source={Images.History_Active}
              style={[styles.imageStyle, styles.imageSelected]}
            />
          ) : (
              <View style={styles.imageSelected}>
                <Image source={Images.History} style={styles.imageStyle} />
              </View>
            )}
          <Text style={{fontFamily:"Roboto-Regular"}}> {"History"} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => this.handleNavigation("AboutUs")}
        >
          {activeTab == "AboutUs" ? (
            <View style={styles.imageSelected}>
              <Entypo
                size={GetOptimalHeight(23)}
                color={COLORS.DarkBlue}
                name="info-with-circle"
              />
            </View>
          ) : (
              <View style={styles.imageSelected}>
                <Entypo
                  size={GetOptimalHeight(20)}
                  color={COLORS.Grey}
                  name="info-with-circle"
                />
              </View>
            )}
          <Text style={{fontFamily:"Roboto-Regular"}}> {"Blog Y"} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: GetOptimalHeight(23),
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: COLORS.White,
    elevation: 10,
    ...ElevatedShadow,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: GetOptimalHeight(20),
    borderTopRightRadius: GetOptimalHeight(20),
    paddingTop: GetOptimalHeight(20),
  },
  imageStyle: {
    width: GetOptimalHeight(20),
    height: GetOptimalHeight(20),
    resizeMode: "contain",
  },
  imageSelected: {
    width: GetOptimalHeight(25),
    height: GetOptimalHeight(25),
  },
  itemStyle: {
    alignItems: "center",
  },
});
