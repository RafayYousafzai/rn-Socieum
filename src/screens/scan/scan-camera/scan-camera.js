import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Dimensions
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { GetOptimalHeight } from "../../../common/helperFunc";
import { searchBlogConnect } from "../../../modules/redux/connect";
import { COLORS } from "../../../common/theme";
const size = Dimensions.get('screen')

class ScanCameraScreen extends Component {
  readQr = (qr) => {
    // this.props.scanQRSuccess({
    //   qrCode: "GC7CQVT3AJBBNWO46ZSOYZYTKJV33QGGX7DKLTZ4HPIRJ3X5KDCO3S2A",
    // });
    var n = qr?.data.lastIndexOf('/');
    var result = qr?.data.substring(n + 1);



    if (result.length <= 6) {
      this.props.getBlogByUnique({ key: result });
    }
    else {
      this.props.scanQRSuccess({ qrCode: result });
    }



    this.props.navigation.goBack();
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.readQr}
        flashMode={RNCamera.Constants.FlashMode.auto}
        cameraTimeout={8000}
        bottomContent={
         
          <Text
              style={{
                fontWeight: "bold",
                color: COLORS.White,
                fontFamily: "Roboto-Regular",
                marginBottom: GetOptimalHeight(90),
                width:size.width,
                textAlign:'center',
                height:GetOptimalHeight(90)
               }}
              onPress={() => this.props.navigation.goBack()}
            >
              Go Back
            </Text>


         

        }
        cameraStyle={{ width: "100%", height: "100%" }}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
    fontFamily: "Roboto-Regular",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
    fontFamily: "Roboto-Regular",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
    fontFamily: "Roboto-Regular",
  },
  buttonTouchable: {
    padding: 16,
  },
});
export default searchBlogConnect()(ScanCameraScreen);
