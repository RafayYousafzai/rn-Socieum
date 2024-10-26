import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/home";
import AboutUs from "../../screens/aboutUs";
import ScanScreen from "../../screens/scan";
import History from "../../screens/history";
import BottomTab from "./bottomTab";
import { GetOptimalHeight } from "../../common/helperFunc";
import { navigationRef } from "./navigationHelpers";
import ListBlog from "../../screens/listBlog";
import DetailScreen from "../../screens/DetailScreen";
import childBlogScreen from "../../screens/childScreen";
import PlayScreen from "../../screens/playerScreen/playScreen";
import ScanCameraScreen from "../../screens/scan/scan-camera/scan-camera";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "react-native-splash-screen";

const AppStack = createBottomTabNavigator();
const StackNav = createStackNavigator();

function BottomTabs() {
  return (
    <AppStack.Navigator
      headerMode="none"
      initialRouteName="Home"
      tabBar={(props) => <BottomTab {...props} />}
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Scan" component={ScanScreen} />
      <AppStack.Screen name="History" component={History} />
      <AppStack.Screen name="AboutUs" component={AboutUs} />
      <AppStack.Screen
        options={{
          tabBarVisible: false,
        }}
        name="ListBlog"
        component={ListBlog}
      />
      <AppStack.Screen
        options={{
          tabBarVisible: false,
        }}
        name="DetailScreen"
        component={DetailScreen}
      />
    </AppStack.Navigator>
  );
}

export default class RootNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <StackNav.Navigator initialRouteName="BottomTabs">
          <StackNav.Screen
            options={{ headerShown: false }}
            name="BottomTabs"
            component={BottomTabs}
          />
          <StackNav.Screen
            options={{ headerShown: false }}
            name="ChildBlogScreen"
            component={childBlogScreen}
          />
          <StackNav.Screen
            options={{ headerShown: false }}
            name="PlayScreen"
            component={PlayScreen}
          />
          <StackNav.Screen
            options={{ headerShown: false }}
            name="ScanCameraScreen"
            component={ScanCameraScreen}
          />
        </StackNav.Navigator>
      </NavigationContainer>
    );
  }
}
