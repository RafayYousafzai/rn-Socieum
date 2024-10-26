import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { GetOptimalHeight, scaledFontSize } from "../../common/helperFunc";
import { Images } from "../../common/images";
import { Str } from "../../common/strings";
import { COLORS } from "../../common/theme";
import Header from "../../components/header/header";
import Toast from "react-native-simple-toast";
import { navigate } from "../../modules/navigation/navigationHelpers";
import { CS } from "../../common/commonStyles";
import BlogMainCard from "../../components/header/blogMainCard";
import BlogSecondaryCard from "../../components/header/blogSecCard";
import { CHARITY, IMAGES, SERVER_URL } from "../../common/routes";
import Communications from "react-native-communications";

export default class ListBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Validate = () => {
    const data = this.props?.searchData?.searchedBlog;
    // navigate("DetailScreen", { data: data });
    if (
      data?.blogExist &&
      (data?.blogStatus == "CHARITY_PUBLISH_BLOG" ||
        data?.blogStatus == "APPROVED")
    ) {
      navigate("DetailScreen", { data: data });
    } else {
      Toast.show("The blog has not yet been stored on the blockchain");
    }
  };

  render() {
    const data = this.props?.searchData?.searchedBlog;
    return (
      <View style={[CS.container, CS.whiteBackgound]}>
        <Header heading={Str.track} description={Str.trackDesc} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[CS.container]}
          contentContainerStyle={{ paddingBottom: GetOptimalHeight(200),...CS.padding20 }}
        >
          <BlogMainCard
            t1="Support"
            t2="Support date"
            t3="Location"
            t4={data?.charityName}
            mainTitle={data?.title}
            v1={data?.token + " YNT"}
            v2={data?.fundsReceivingDate}
            v3={data?.location}
            img={SERVER_URL + IMAGES + CHARITY + data?.charityBanner}
            description={data?.description}
          />
          {/* ////////// Show in Case Token is transferred to Charity ////////// */}
          {data.tokenTranHash && (
            <BlogSecondaryCard
              t1={"View your support on the blockchain"}
              //token={data.tokenTranHash}
              detailPress={() => {
                Communications.web(data?.tokenTranHash);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              this.Validate();
            }}
            style={[
              CS.cardStyle,
              CS.shadow,
              CS.alignItemsCenter,
              CS.blueBtn,
              CS.row,
            ]}
          >
            <Image source={Images.writing} style={CS.readBlogIcon} />
            <Text style={[CS.h3, CS.whiteFont]}>{"Blog Overview"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
