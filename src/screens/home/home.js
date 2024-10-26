import React, { Component } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { AboutData, AboutDataDesc, Str } from "../../common/strings";
import Header from "../../components/header/header";
import * as Animatable from "react-native-animatable";
import { navigate } from "../../modules/navigation/navigationHelpers";

import { styles } from "./style";
import { Images } from "../../common/images";
import { CS } from "../../common/commonStyles";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderCard = ({ item }) => {
    return (
      <View style={[CS.cardStyle, CS.shadow]}>
        <Text style={CS.h2}>{item.title}</Text>
        {
          item.title === "We Are Y" ? <React.Fragment>
            <Text style={CS.descBlack} >{item.desc}</Text>
            {/* <Text style={[CS.descBlack, { alignSelf: "center" }]}>Individually We Are One Drop, Together We Are An Ocean.</Text> */}
          </React.Fragment> : <Text style={CS.descBlack}>{item.desc}</Text>
        }

      </View>
    );
  };
  footer = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate("Scan", null);
        }}
      >
        {/* <Text style={[CS.h2, CS.alignSelfCenter]}>
          {"Let's Get Scanning !"}
        </Text> */}
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Str.headerTitle}
          //heading={Str.aboutTitle}
          description={Str.aboutDesc}
          logo={true}
        />
        <FlatList
          data={AboutData}
          ListHeaderComponent={
            <View>
              {/* {AboutDataDesc.map((item, index) => {
                return (
                  <Text
                    style={{ marginVertical: 10, paddingHorizontal: 10, color: "black" }}
                    key={index}
                  >
                    {item}
                  </Text>
                );
              })} */}
            </View>
          }
          renderItem={this.renderCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={CS.contentContainer}
          keyExtractor={(item) => item?.title}
          ListFooterComponent={this.footer}
        />
        {/* <Animatable.View
          animation={"slideInLeft"}
          iterationCount={1}
          duration={2000}
          style={CS.screenCenter}
        >
          <Image source={Images.ComingSoon} style={styles.imageStyle} />
        </Animatable.View> */}
      </View>
    );
  }
}
export default Home;
