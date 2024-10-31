import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera/legacy";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
// Removed unused import for WebBrowser
import { END_POINTS } from "../helper/endpoints";

export default function BarcodeScanner() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [isScannerModalVisible, setIsScannerModalVisible] = useState(false);
  const handleScanButtonPress = async (barcodeType, barcodeData) => {
    try {
      // Construct the URL using the barcode data
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode: barcodeData });
      const response = await fetch(url);

      // console.log(
      //   "barcodeType:",
      //   barcodeType,
      //   "barcodeData:",
      //   barcodeData,
      //   "response:",
      //   response,
      //   "url:",
      //   url
      // );

      if (!response.ok) {
        const errorResponse = await response.json();
        ToastAndroid.show(
          errorResponse.message ||
            "No Contribution found against this QR code.",
          ToastAndroid.SHORT
        );
        return;
      }

      const responseData = await response.json();

      if (
        responseData.success &&
        responseData.data &&
        responseData.data.length > 0
      ) {
        const contribution = responseData.data[0];
        // console.log("Contribution data:", contribution);

        ToastAndroid.show("Contribution found!", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "No Contribution found against this QR code.",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      ToastAndroid.show(
        "An error occurred while fetching data.",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  // Callback function when barcode is scanned
  const handleBarcodeScanned = ({ type, data }) => {
    handleScanButtonPress(type, data);
    setIsBarcodeScanned(true);
    setIsScannerModalVisible(false);
  };

  const resetScanner = () => {
    setIsBarcodeScanned(false);
  };

  if (cameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          resetScanner();
          setIsScannerModalVisible(true);
        }}
      >
        <View style={styles.buttonContainer}>
          <MaterialIcons name="qr-code-scanner" size={40} color="#000" />
          <Text style={styles.buttonText}>SCAN</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isScannerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsScannerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Camera
            style={styles.camera}
            onBarCodeScanned={
              isBarcodeScanned ? undefined : handleBarcodeScanned
            } // Updated to use meaningful variable
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsScannerModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close Scanner</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "70%",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 30,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});
