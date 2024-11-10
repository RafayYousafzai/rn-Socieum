import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera/legacy";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useBlogContext } from "@/context/BlogContext";
import { showToast } from "@/helper/endpoints";

export default function BarcodeScanner() {
  const { setPage, selectedBlog } = useBlogContext();

  const [cameraPermission, setCameraPermission] = useState(null);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [isScannerModalVisible, setIsScannerModalVisible] = useState(false);
  const handleScanButtonPress = async (barcodeType, barcodeData) => {
    try {
      const response = blogs.find(
        (blog) => blog.qrCodeUniqueString === barcodeData
      );

      if (!response) {
        showToast("No Contribution found against this QR code.");
        return;
      }
      setViewBlog(response._id);
      setPage("Details");
      router.navigate("listBlog");
    } catch (error) {
      console.error("Failed to fetch blog by QR Code :", error);
      showToast("An error occurred while scanning QR Code.");
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
            <Text style={styles.closeButtonText}>
              <MaterialIcons name="close-fullscreen" size={40} color="#000" />
            </Text>
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
  closeButtonText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
});
