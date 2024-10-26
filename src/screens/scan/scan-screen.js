import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { maxQrLength } from "../../common/globalConstants";
import { Images } from "../../common/images";
import { Str } from "../../common/strings";
import { COLORS } from "../../common/theme";
import Header from "../../components/header/header";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ScanCameraScreen } from "./scan-camera/scan-camera";

import { styles } from "./style";
import {
  GetOptimalHeight,
  GetOptimalWidth,
  scaledFontSize,
} from "../../common/helperFunc";
import LoaderView from "../../components/header/loaderView";
import { ScrollView } from "react-native";

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      loaderModalVisible: false,
      Loading: false,
      QrCode: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props?.searchData?.scanSuccess &&
      !prevProps?.searchData?.scanSuccess
    ) {
      this.setState({
        loaderModalVisible: false,
      });
      // alert(this.props?.searchData?.ScannedQrCode);
      if (this.props?.searchData?.ScannedQrCode) {
        this.props.getBlogByQrCode(this.props?.searchData?.ScannedQrCode);
      }
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

  onChange = (text) => {
    this.setState({
      code: text,
    });
  };

  search = () => {
    if (this.state.code.trim().length === maxQrLength) {
      this.props.getBlogByUnique({ key: this.state.code });
    } else {
      Toast.show("Please enter " + maxQrLength + " letter code");
    }
  };
  toggleLoader = () => {
    this.setState({
      loaderModalVisible: !this.state.loaderModalVisible,
    });
  };

  onQrCodeScan = (QrData) => {
   
    this.setState({
      ScanCamera: false,
    });
  };
  render() {
    const { code, Loading, loaderModalVisible, ScanCamera } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={Str.headerTitle}
          heading={Str.scanTitle}
          description={Str.scanDesc}
          logo={false}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
        >
          <View style={styles.bottomContainer}>
            <View style={styles.qrImage}>
              <Image source={Images.Scan_icon} style={styles.Qr} />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.scanQR();
                this.props.navigation.navigate("ScanCameraScreen");
              }}
            >
              <Image source={Images.QrScan} style={styles.QrScanIcon} />
              <Text style={styles.scan}>{"SCAN"}</Text>
            </TouchableOpacity>
            <View style={styles.codeArea}>
              <TextInput
                placeholder={"Or enter your " + maxQrLength + " digit code"}
                placeholderTextColor={COLORS.Black}
                style={styles.inputStyle}
                value={code}
                maxLength={maxQrLength}
                onChangeText={this.onChange}
              />
              <TouchableOpacity onPress={this.search} style={styles.btnStyle}>
                <Image source={Images.Search} style={styles.btnImage} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
export default ScanScreen;
