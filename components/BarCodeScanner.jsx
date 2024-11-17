import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { useBlogContext } from "@/context/BlogContext";
import { showToast } from "@/helper/endpoints";
import { router } from "expo-router";

export default function BarcodeScanner() {
  const { setPage, blogs, setViewBlog } = useBlogContext();
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [isScannerModalVisible, setIsScannerModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  // Handling permission status and request
  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to access the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  
  const handleScanButtonPress = async (barcodeType, barcodeData) => {
    const baseUrl = "https://socieum.vercel.app/";

    try {
      let code = barcodeData;

      if (barcodeData.startsWith(baseUrl)) {
        const parsedUrl = new URL(barcodeData);
        code = parsedUrl.pathname.slice(1);
      }

      const response = blogs.find((blog) => blog.qrCodeUniqueString === code);

      if (!response) {
        showToast("No Contribution found against this QR code.");
        return;
      }

      setViewBlog(response._id);
      setPage("Details");
      router.navigate("listBlog");
    } catch (error) {
      console.error("Failed to fetch blog by QR Code:", error);
      showToast("An error occurred while scanning QR Code.");
    }
  };

  // Callback function when barcode is scanned
  const handleBarcodeScanned = ({ type, data }) => {
    handleScanButtonPress(type, data);
    setIsBarcodeScanned(true);
    setIsScannerModalVisible(false);
  };

  const resetScanner = () => {
    setIsBarcodeScanned(false);
  };

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
          <CameraView
            style={styles.camera}
            onBarcodeScanned={
              isBarcodeScanned ? undefined : handleBarcodeScanned
            }
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsScannerModalVisible(false)}
          >
            <MaterialIcons name="close" size={40} color="#000" />
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
    marginBottom: 100,
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
});
