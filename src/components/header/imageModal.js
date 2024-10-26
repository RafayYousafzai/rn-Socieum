import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { GetOptimalWidth, GetOptimalHeight } from "../../common/helperFunc";
import { IMAGES, SERVER_URL } from "../../common/routes";
import { COLORS } from "../../common/theme";
import { Icon } from "react-native-elements";
import { Platform } from "react-native";

export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { ImageURL, isVisible } = this.props;

    return (
      <View>
        <Modal
          animationIn="fadeInUp"
          animationInTiming={500}
          animationOutTiming={500}
          hasBackdrop={true}
          backdropColor={COLORS.PRIMARY_BLUE}
          backdropOpacity={0.95}
          isVisible={isVisible}
          onSwipeComplete={this.props.toggleModal}
          swipeDirection={["down", "left", "right"]}
          style={styles.container}
        >
          <View style={styles.imageStyle}>
            <TouchableOpacity onPress={this.props.toggleModal}>
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
            {this.state.loading && (
              <ActivityIndicator
                style={{ marginTop: GetOptimalHeight(700) * 0.4 }}
                size={"large"}
                color={COLORS.White}
              />
            )}

            <Image
              style={styles.imageStyle}
              source={{ uri: SERVER_URL + IMAGES + ImageURL }}
              onLoadStart={() => this.setState({ loading: true })}
              onLoadEnd={() => {
                this.setState({ loading: false });
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BLACK,
  },
  imageStyle: {
    height: "100%",
    backgroundColor: COLORS.BLACK,
    width: "100%",
    resizeMode: "contain",
    paddingTop: "5%",
    paddingBottom: "15%",
    paddingHorizontal: 0,
  },
});
