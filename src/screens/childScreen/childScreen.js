import React, { Component } from "react";
import { Image } from "react-native";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { CS } from "../../common/commonStyles";
import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "../../common/helperFunc";
import { SERVER_URL, IMAGES } from "../../common/routes";
import { COLORS } from "../../common/theme";
import BackHeader from "../../components/header/backHeader";
import LoaderView from "../../components/header/loaderView";
import ImageModal from "../../components/header/imageModal";
import UserAvatar from "react-native-user-avatar";
import { Platform } from "react-native";

var moment = require("moment"); // require

export default class ChildBlogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageVisible: false,
      ImageURL: "",
      isLoaderVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({
      imageVisible: !this.state.imageVisible,
    });
  };

  componentDidMount = () => {
    // this._unsubscribe = this.props?.navigation?.addListener("focus", () => {
    const data = this.props?.searchData?.blogDetails;
    if (data?.qrCode) {
      this.props.getBlogDetail({ qrCode: data?.qrCode });
    }
    // });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props?.searchData?.getBlogDetailsSuccess &&
      !prevProps?.searchData?.getBlogDetailsSuccess
    ) {
      this.setState({
        isLoaderVisible: false,
      });
    }

    if (
      this.props?.searchData?.gettingBlogDetails &&
      !prevProps?.searchData?.gettingBlogDetails
    ) {
      this.setState({
        isLoaderVisible: true,
      });
    }
  }

  toggleLoader = () => {
    this.setState({
      isLoaderVisible: !this.state.isLoaderVisible,
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderCard = ({ item }) => {
    
    return (
      <View
        style={[
          CS.cardStyle,
          {
            padding: 0,
            margin: 0,
            borderBottomWidth: 1,
            marginBottom: 20,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          <UserAvatar
            size={50}
            name={`${item?.title.split(" ")[0]} + ${item?.title.split(" ")[1]}`}
            bgColor={COLORS.lightPurple}
            style={{
              width:
                Platform.OS === "ios"
                  ? GetOptimalHeight(50)
                  : GetOptimalHeight(60),
              height:
                Platform.OS === "ios"
                  ? GetOptimalHeight(50)
                  : GetOptimalHeight(60),
              borderRadius: 50,
              marginRight: 10,
            }}
          />
          <Text
            numberOfLines={3}
            style={[
              CS.h2,
              { color: COLORS.Black, width: GetOptimalWidth(300) },
            ]}
          >
            {item?.title}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.Grey,
              // borderTopEndRadius: GetOptimalHeight(6),
              // borderTopStartRadius: GetOptimalHeight(6),
            }}
            onPress={() => {
              this.setState(
                {
                  ImageURL: item?.imagePath,
                },
                () => {
                  this.toggleModal();
                }
              );
            }}
          >
            <Image
              source={{ uri: SERVER_URL + IMAGES + item?.imagePath }}
              style={[CS.childImage, { resizeMode: "contain" }]}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: GetOptimalHeight(20) }}>
          {/* <Text style={CS.h4}>
            {"Recipient: "}
            <Text style={[CS.h4, { marginVertical: 0, color: COLORS.Black }]}>
              {item?.title}
            </Text>
          </Text> */}
          <Text style={[CS.descBlack, { textAlign: "justify", marginTop: 5 }]}>
            {item?.description}
          </Text>
          {item?.voicePath && item?.voicePath !== "null" && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PlayScreen", { data: item });
              }}
              style={{ flexDirection: "row", marginTop: GetOptimalHeight(10) }}
            >
              <Text style={CS.h4}>{"Listen To Voice Message  "}</Text>
              <Icon
                size={GetOptimalHeight(25)}
                name={"play"}
                type={"antdesign"}
                color={COLORS.lightPurple}
              />
            </TouchableOpacity>
          )}
          <Text style={CS.h4}>
            {/* {"Published: "} */}
            <Text style={[CS.h4, { marginVertical: 0, color: COLORS.Black }]}>
              {moment(new Date(item?.updatedAt)).fromNow()}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { isLoaderVisible, imageVisible, ImageURL } = this.state;
    const data = this.props?.searchData?.blogDetails?.childStory;
    return (
      <View style={[CS.container, CS.whiteBackgound]}>
        <BackHeader onBackPress={this.goBack} />
        <View style={CS.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item?._id}
            renderItem={this.renderCard}
            contentContainerStyle={[
              CS.contentContainer,
              { padding: 0, marginBottom: 20 },
            ]}
            refreshing={this.props?.searchData?.gettingBlogDetails}
            onRefresh={() => {
              const data = this.props?.searchData?.blogDetails;
              this.props.getBlogDetail({ qrCode: data?.qrCode });
            }}
          />
        </View>
        {isLoaderVisible && (
          <LoaderView
            OkPress={this.toggleLoader}
            error={this.props?.searchData?.getBlogDetailsError}
            errorMessage={this.props?.searchData?.getBlogDetailsErrorMessage}
          />
        )}
        <ImageModal
          toggleModal={this.toggleModal}
          isVisible={imageVisible}
          ImageURL={ImageURL}
        />
      </View>
    );
  }
}
