import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Str } from "../../common/strings";
import Header from "../../components/header/header";
import LoaderView from "../../components/header/loaderView";
import Toast from "react-native-simple-toast";
import { CS } from "../../common/commonStyles";
import BlogMainCard from "../../components/header/blogMainCard";
import { IMAGES, SERVER_URL } from "../../common/routes";
import BlogTerCard from "../../components/header/blogTerCard";
import { Images } from "../../common/images";
import { Icon } from "react-native-elements";
import { GetOptimalHeight } from "../../common/helperFunc";
import { COLORS } from "../../common/theme";
import Communications from "react-native-communications";

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaderVisible: false };
  }

  componentDidMount = () => {
    this._unsubscribe = this.props?.navigation?.addListener("focus", () => {
      const { data } = this.props?.route?.params;
      this.props.getBlogDetail({ qrCode: data?.qrCodePublicKey });
    });
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

  gotoChilds = () => {
    const data = this.props?.searchData?.blogDetails;
    if (data?.childStory && data?.childStory?.length > 0) {
      this.props.navigation.navigate("ChildBlogScreen");
    } else {
      Toast.show("No further details available.");
    }
  };

  render() {
    const { isLoaderVisible } = this.state;
    const data = this.props?.searchData?.blogDetails;
    return (
      <View style={[CS.container, CS.whiteBackgound]}>
        <Header heading={Str.blogOverview} description={Str.blogDecs} />
        <ScrollView
          style={[CS.container]}
          contentContainerStyle={CS.padding20}
        >
          <BlogMainCard
            t1="Supporter Name"
            t2="6 Digit Code"
            t3="Location"
            t4={""}
            mainTitle={data?.title}
            v1={data?.donorName}
            v2={data?.qrCodeUniqueString}
            v3={data?.merchandiseDetails?.location}
            img={SERVER_URL + IMAGES + data?.imagePath}
            description={data?.description}
          />
          <BlogTerCard
            t1={data?.donorName}
            about={data?.donorDescription}
            approved={data?.blogStatus === "APPROVED" ? true : false}
            onDetailPress={() => {
              Communications.web(data?.transactionHash);
            }}
          />
          {/* <TouchableOpacity onPress={this.gotoChilds} style={[CS.blueBtn]}>
            <Text style={[CS.h4, CS.whiteFont]}>{"READ the BLOG"}</Text>
          </TouchableOpacity> */}
          <View style={[CS.row, CS.spaceBetween]}>
            <TouchableOpacity
              onPress={this.goBack}
              style={[
                CS.cardStyle,
                CS.shadow,
                CS.alignItemsCenter,
                CS.blueBtn,
                CS.row,
                CS.LeftBackButton,
              ]}
            >
              <Icon
                size={GetOptimalHeight(25)}
                name={"arrowleft"}
                type={"antdesign"}
                color={COLORS.White}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.gotoChilds}
              style={[
                CS.cardStyle,
                CS.shadow,
                CS.alignItemsCenter,
                CS.blueBtn,
                CS.row,
                CS.rightButtonStyle,
                { height: GetOptimalHeight(46) },
              ]}
            >
              <Image source={Images.writing} style={CS.readBlogIcon} />
              <Text style={[CS.h3, CS.whiteFont]}>{"Read The Blog"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {isLoaderVisible && (
          <LoaderView
            OkPress={this.toggleLoader}
            error={this.props?.searchData?.getBlogDetailsError}
            errorMessage={this.props?.searchData?.getBlogDetailsErrorMessage}
          />
        )}
      </View>
    );
  }
}
