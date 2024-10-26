import React, { Component } from "react";
import { Image } from "react-native";
import { Text, View, ImageBackground } from "react-native";
import { CS } from "../../common/commonStyles";
import { Icon } from "react-native-elements";
import { COLORS } from "../../common/theme";
import LinearGradient from "react-native-linear-gradient";
import { Images } from "../../common/images";

export class BlogMainCard extends Component {
  render() {
    const { t1, t2, t3, t4, v1, v2, v3, description, img, mainTitle } =
      this.props;
    return (
      <View style={[CS.newCardStyle, CS.shadow]}>
        {/* --------------------------Image Part ------------------------------ */}
        <View style={CS.newImageCardStyle}>
          <ImageBackground
            style={CS.newCardBackgroundImage}
            imageStyle={CS.newCardBackgroundImage}
            source={{
              uri: img
                ? img
                : "https://www.trainingzone.co.uk/sites/default/files/styles/inline_banner/public/istock-1154876579.jpg?itok=HpKxPzMn",
            }}
          >
            <LinearGradient
              colors={["#00000001", "#000000ff"]}
              style={CS.darkShade}
            >
              {t4 !== "" && (
                <View style={[CS.rightFloatingButton]}>
                  <Text numberOfLines={1} style={CS.whiteFontSmall}>
                    {t4}
                  </Text>
                </View>
              )}

              <View style={[CS.row, CS.spaceBetween, CS.iconView]}>
                <View style={[CS.blackColor, CS.screenCenter]}>
                  <Text
                    style={[
                      CS.whiteFontSmall,
                      CS.boldFont,
                      { fontWeight: "700" },
                    ]}
                  >
                    {t1}
                  </Text>
                  <View style={CS.whiteCircle}>
                    <Image source={Images.user} />
                  </View>
                  <Text
                    numberOfLines={2}
                    style={[
                      CS.whiteFont,
                      CS.boldFont,
                      CS.thirdWidth,
                      CS.fontSize,
                    ]}
                  >
                    {v1}
                  </Text>
                </View>
                <View style={[CS.blackColor, CS.screenCenter]}>
                  <Text
                    style={[
                      CS.whiteFontSmall,
                      CS.boldFont,
                      { fontWeight: "700" },
                    ]}
                  >
                    {t2}
                  </Text>
                  <View style={CS.whiteCircle}>
                    <Image source={Images.steps} />
                  </View>

                  <Text
                    numberOfLines={2}
                    style={[
                      CS.whiteFont,
                      CS.boldFont,
                      CS.thirdWidth,
                      CS.fontSize,
                    ]}
                  >
                    {v2}
                  </Text>
                </View>
                <View style={[CS.blackColor, CS.screenCenter]}>
                  <Text
                    style={[
                      CS.whiteFontSmall,
                      CS.boldFont,
                      { fontWeight: "700" },
                    ]}
                  >
                    {t3}
                  </Text>
                  <View style={CS.whiteCircle}>
                    <Image source={Images.map} />
                  </View>
                  <Text
                    numberOfLines={2}
                    style={[
                      CS.whiteFont,
                      CS.boldFont,
                      CS.thirdWidth,
                      CS.fontSize,
                    ]}
                  >
                    {v3}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        {/* ------------------------------Bottom Part ------------------------ */}
        <View style={CS.horizontalPadding}>
          <Text style={CS.h3}>{mainTitle}</Text>
          <Text style={[CS.descBlack, { textAlign: "justify" }]}>
            {description}
          </Text>
        </View>
      </View>
    );
  }
}

export default BlogMainCard;
