import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CS } from "../../common/commonStyles";
import { GetOptimalHeight } from "../../common/helperFunc";
import { IMAGES, SERVER_URL } from "../../common/routes";
import { Str, AboutData } from "../../common/strings";
import BlogMainCard from "../../components/header/blogMainCard";
import Header from "../../components/header/header";
import LoaderView from "../../components/header/loaderView";
import { navigate } from "../../modules/navigation/navigationHelpers";
import * as Animatable from "react-native-animatable";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderModalVisible: false,
      isLoaderVisible: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props?.searchData?.getAllBlogsSuccess &&
      !prevProps?.searchData?.getAllBlogsSuccess
    ) {
      this.setState({
        isLoaderVisible: false,
      });
    }

    if (
      this.props?.searchData?.getAllBlogsError &&
      !prevProps?.searchData?.getAllBlogsError
    ) {
      this.setState({
        isLoaderVisible: false,
      });
    }

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

  UNSAFE_componentWillMount = () => {
    this.setState({
      isLoaderVisible: true,
    });
    this.props.getAllListBlogs();
  };

  renderMainCard = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (item?.qrCodeUniqueString) {
            this.props.getBlogByUnique({ key: item?.qrCodeUniqueString });
          } else if (item?.qrCode) {
            this.props.getBlogByQrCode({ qrCode: item?.qrCode });
          }
        }}
      >
        <BlogMainCard
          t1="Supporter Name"
          t2="6 Digit Code"
          t3="Location"
          t4={""}
          mainTitle={item?.title}
          v1={item?.donorName}
          v2={item?.qrCodeUniqueString}
          v3={"UK"}
          img={SERVER_URL + IMAGES + item?.imagePath}
          description={item?.description}
          data={item}
        />
      </TouchableOpacity>
    );
  };

  renderCard = ({ item }) => {
    return (
      <View style={[CS.cardStyle, CS.shadow]}>
        <Text style={CS.h2}>{item.title}</Text>
        <Text style={CS.descBlack}>{item.desc}</Text>
      </View>
    );
  };

  toggleLoader = () => {
    this.setState({
      loaderModalVisible: !this.state.loaderModalVisible,
    });
  };

  footer = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate("Scan", null);
        }}
      >
        <Text style={[CS.h2, CS.alignSelfCenter]}>
          {"Let's Get Scanning !"}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { isLoaderVisible } = this.state;
    return (
      <View style={[CS.container, CS.whiteBackgound]}>
        <Header
          title={Str.headerTitle}
          heading={Str.introTitle}
          description={Str.introDesc}
          logo={false}
        />

        {!this.props?.searchData?.gettingAllBlogs && (
          <FlatList
            data={this.props?.searchData?.allBlogs}
            renderItem={this.renderMainCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={CS.contentContainer}
            keyExtractor={(item) => item?._id}
            ListEmptyComponent={
              <Animatable.View
                animation={"slideInLeft"}
                iterationCount={1}
                duration={2000}
                style={[CS.screenCenter, { marginTop: 20 }]}
              >
                <Text style={[CS.descPurple, CS.h3]}> Blogs Not Found</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isLoaderVisible: true,
                    });
                    this.props.getAllListBlogs();
                  }}
                >
                  <Text style={CS.descPurple}> Try Again</Text>
                </TouchableOpacity>
              </Animatable.View>
            }
          />
        )}
        {(this.state.loaderModalVisible || isLoaderVisible) && (
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
export default AboutUs;