import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Str } from "../../common/strings";
import Header from "../../components/header/header";
import * as Animatable from "react-native-animatable";
import { FlatList } from "react-native-gesture-handler";
import LoaderView from "../../components/header/loaderView";
import { CS } from "../../common/commonStyles";
import BlogMainCard from "../../components/header/blogMainCard";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderModalVisible: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props?.searchData?.getBlogByUniqueKeySuccess &&
        !prevProps?.searchData?.getBlogByUniqueKeySuccess) ||
      (this.props?.searchData?.getBlogByQrCodeSuccess &&
        !prevProps?.searchData?.getBlogByQrCodeSuccess)
    ) {
      this.setState({
        loaderModalVisible: false,
      });
      this.props?.navigation?.navigate("ListBlog");
    }

    if (
      (this.props?.searchData?.gettingBlogByUniqueKey &&
        !prevProps?.searchData?.gettingBlogByUniqueKey) ||
      (this.props?.searchData?.gettingBlogByQrCode &&
        !prevProps?.searchData?.gettingBlogByQrCode)
    ) {
      this.setState({
        loaderModalVisible: true,
      });
    }
  }

  renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.getBlogByQrCode({ qrCode: item?.qrCodePublicKey })
        }
        key={item?._id}
        // style={[CS.shadow, CS.cardStyle, CS.row]}
      >
        <BlogMainCard
          t1="Support"
          t2="Support date"
          t3="Location"
          t4={item?.charityName}
          v1={item?.token + " YNT"}
          v2={item?.fundsReceivingDate}
          v3={item?.location}
          description={item?.description}
          mainTitle={item?.title}
        />
      </TouchableOpacity>
    );
  };

  toggleLoader = () => {
    this.setState({
      loaderModalVisible: !this.state.loaderModalVisible,
    });
  };

  render() {
    const { loaderModalVisible } = this.state;
    return (
      <View style={[CS.container, CS.whiteBackgound]}>
        <Header
          title={Str.headerTitle}
          heading={Str.historyTitle}
          description={Str.historyDesc}
          logo={false}
        />
        <FlatList
          data={this.props?.searchData?.blogHistory}
          renderItem={this.renderCard}
          keyExtractor={(item) => item?._id}
          contentContainerStyle={[CS.contentContainer]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Animatable.View
              animation={"slideInLeft"}
              iterationCount={1}
              duration={2000}
              style={CS.screenCenter}
            >
              <Text style={CS.descPurple}> No search history</Text>
            </Animatable.View>
          }
        />
        {loaderModalVisible && (
          <LoaderView
            OkPress={this.toggleLoader}
            error={this.props?.searchData?.getBlogError}
            errorMessage={this.props?.searchData?.getBlogErrorMessage}
          />
        )}
      </View>
    );
  }
}
export default History;
