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
import * as WebBrowser from "expo-web-browser";
import { END_POINTS } from "../helper/endpoints";

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressButtonAsync = async (qrCode) => {
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode });
      const res = await fetch(url);
      console.log(res, url);

      if (!res.ok) {
        const errorData = await res.json();
        ToastAndroid.show(
          errorData.message || "No Contribution found against this qr-code.",
          ToastAndroid.SHORT
        );
        return;
      }

      const data = await res.json();
      if (data.length > 0) {
        ToastAndroid.show(
          "No Contribution found against this qr-code.",
          ToastAndroid.SHORT
        );
        return;
      }

      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      ToastAndroid.show(
        "An error occurred while fetching data.",
        ToastAndroid.SHORT
      );
    }
  };

  // Request camera permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Callback function when barcode is scanned
  const handleBarCodeScanned = ({ type, data }) => {
    resetScanner();
    console.log(type, data);
    handlePressButtonAsync(type, data);
    setScanned(true);
    setScannedData(`Type: ${type}\nData: ${data}`);
    setIsModalVisible(false); // Close the modal after scanning
    Alert.alert("Scanned");
  };

  // Reset scanning and data
  const resetScanner = () => {
    setScanned(false);
    setScannedData(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View className="items-center mb-10">
          <MaterialIcons name="qr-code-scanner" size={40} color="#000" />
          <Text className="text-lg font-medium text-gray-800 mt-2">SCAN</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Camera
            style={styles.camera}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
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
  scannedContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  scannedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
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
