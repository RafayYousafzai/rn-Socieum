import React, { Component } from "react";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { CS } from "../../common/commonStyles";
import { Icon } from "react-native-elements";
import { COLORS } from "../../common/theme";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  GetOptimalHeight,
  GetOptimalWidth
} from "../../common/helperFunc";

export class BlogTerCard extends Component {
  render() {
    const { t1, about, approved } = this.props;



    return (
      <View style={[CS.newCardStyle, CS.shadow]}>
        {/* ------------------------------Bottom Part ------------------------ */}
        <View style={CS.horizontalPadding}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{
              flex: 30, backgroundColor: "#ffffff",
              borderRadius: 20,
              borderColor: "#000000",
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'row',
              paddingHorizontal: GetOptimalWidth(10),
              alignSelf: 'center',
              marginRight: 4,

              borderWidth: 1

            }}>
              <Text style={[CS.h4, CS.normal]}>
                {"Supporter"}
              </Text>
            </View>
            <View style={{ flex: 70 }}><Text style={[
              CS.h4,
              CS.blackColor,
              CS.horizontalPadding,
              CS.normal,

            ]}>{t1?.length <= 50 ? t1 : t1?.substring(0, 50) + "..."}</Text></View>
          </View>

          <Text style={[CS.h4, CS.normal, CS.marginBottom]}>
            {"About Supporter : "}
            <Text style={[CS.h4, CS.normal, CS.blackColor, CS.marginBottom]}>
              {about}
            </Text>
          </Text>
          {approved && (
            <TouchableOpacity style={[CS.blueBtn]} onPress={this.props.onDetailPress}>
              <Text style={CS.whiteFont}>{"See Details"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default BlogTerCard;
