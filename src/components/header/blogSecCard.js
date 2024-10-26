import React, { Component } from "react";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { CS } from "../../common/commonStyles";
import { Icon } from "react-native-elements";
import { COLORS } from "../../common/theme";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

export class BlogSecondaryCard extends Component {
  render() {
    const { t1, token } = this.props;
    return (
      <View style={[CS.newCardStyle, CS.shadow]}>
        {/* ------------------------------Bottom Part ------------------------ */}
        <View style={CS.horizontalPadding}>
          <Text style={CS.h2}>{t1}</Text>
          <Text style={[CS.descBlack, CS.marginBottom]}>{token}</Text>
          <TouchableOpacity
            style={[CS.blueBtn]}
            onPress={this.props?.detailPress}
          >
            <Text style={CS.whiteFont}>{"View Blockchain"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default BlogSecondaryCard;
