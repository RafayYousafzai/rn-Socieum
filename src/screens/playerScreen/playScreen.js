import React, { Component } from "react";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { GetOptimalHeight, GetOptimalWidth } from "../../common/helperFunc";
import { Images } from "../../common/images";
import { COLORS } from "../../common/theme";
import SoundPlayer from "react-native-sound-player";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Platform } from "react-native";
import { IMAGES, SERVER_URL } from "../../common/routes";
import Toast from "react-native-simple-toast";
var counter;
export default class PlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound_url: "",
      loadingFile: true,
      songInfo: {
        duration: 0,
        current: 0,
      },
    };

    this._onFinishedPlayingSubscription = null;
    this._onFinishedLoadingSubscription = null;
    this._onFinishedLoadingFileSubscription = null;
    this._onFinishedLoadingURLSubscription = null;
  }

  // Subscribe to event(s) you want when component mounted
  componentDidMount() {
    const { data } = this.props?.route.params;
    this.setState({
      sound_url: data?.voicePath,
    });
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      "FinishedPlaying",
      ({ success }) => {
        console.log("finished playing", success);
      }
    );
    this._onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      "FinishedLoading",
      ({ success }) => {
        // this.setState({
        //   loadingFile: false,
        // });
        console.log("finished loading", success);
      }
    );
    this._onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      "FinishedLoadingFile",
      ({ success, name, type }) => {
        console.log("finished loading file", success, name, type);
      }
    );
    this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      "FinishedLoadingURL",
      ({ success, url }) => {
        this.setState({
          loadingFile: false,
        });
        console.log("finished loading url", success, url);
      }
    );
    // -------------- for testing  ---------

    // SoundPlayer.loadUrl(
    //   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    // );

    SoundPlayer.loadUrl(SERVER_URL + IMAGES + data?.voicePath);
  }

  // Remove all the subscriptions when component will unmount
  componentWillUnmount() {
    clearInterval(counter);
    SoundPlayer.stop();
    this._onFinishedPlayingSubscription.remove();
    this._onFinishedLoadingSubscription.remove();
    this._onFinishedLoadingURLSubscription.remove();
    this._onFinishedLoadingFileSubscription.remove();
  }

  async getInfo() {
    // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      this.setState({
        songInfo: {
          duration: info?.duration,
          current: info?.currentTime,
        },
      });
      console.log("getInfo", info); // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log("There is no song playing", e);
    }
  }

  playSound = () => {
    try {
      if (this.state.loadingFile) {
        Toast.show("Loading file please wait");
      } else {
        counter = setInterval(() => {
          this.getInfo();
        }, 1000);
        Toast.show("Playing Audio");
        SoundPlayer.play();
      }
    } catch (e) {
      Toast.show("Cannot play this file.");
    }
  };

  pauseSound = () => {
    Toast.show("Pause");
    SoundPlayer.pause();
  };

  format = (time) => {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  render() {
    const { songInfo } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.Black,
        }}
      >
        <Image
          source={Images.music}
          style={{
            width: "100%",
            position: "absolute",
            height: GetOptimalHeight(600),
            top: GetOptimalHeight(50),
          }}
        />
        <TouchableOpacity onPress={() => this.props?.navigation?.goBack()}>
          <Icon
            style={{
              marginTop:
                Platform.OS === "ios"
                  ? GetOptimalHeight(30)
                  : GetOptimalHeight(15),
              alignSelf: "flex-start",
              marginLeft: GetOptimalWidth(20),
              padding: GetOptimalWidth(10),
            }}
            size={GetOptimalHeight(25)}
            name={"arrowleft"}
            type={"antdesign"}
            color={COLORS.Grey}
          />
        </TouchableOpacity>
        <View
          style={{
            padding: GetOptimalHeight(20),
            backgroundColor: null,
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.Black,
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: GetOptimalHeight(20),
            }}
          >
            <Text style={{ color: COLORS.White,fontFamily:"Roboto-Regular" }}>
              {this.format(songInfo.current)}
            </Text>
            <View
              style={{
                color: COLORS.White,
                borderColor: COLORS.White,
                borderWidth: 1,
                height: 1,

                marginHorizontal: GetOptimalWidth(5),

                width: GetOptimalWidth(280),
              }}
            />
            <Text style={{ color: COLORS.White,fontFamily:"Roboto-Regular" }}>
              {this.format(songInfo.duration)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: GetOptimalHeight(70),
              padding: 10,
              width: GetOptimalWidth(200),
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ backgroundColor: COLORS.Black }}
              onPress={() => this.playSound()}
            >
              <Icon
                size={GetOptimalHeight(50)}
                name={"play"}
                type={"antdesign"}
                color={COLORS.White}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: COLORS.Black }}
              onPress={() => this.pauseSound()}
            >
              <Icon
                size={GetOptimalHeight(60)}
                name={"pause-circle"}
                type={"font-awesome"}
                color={COLORS.White}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
