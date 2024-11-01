import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import BarcodeScanner from "@/components/BarCodeScanner";
import img from "@/assets/images/HomeQR.png";

const Scan = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={" Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code assigned to your garment."
        }
      />

      <ScrollView>
        <View className="px-5 pb-12 mt-10 items-center">
          <Image source={img} className="w-[200px] h-[200px] mb-[20px] " />
          <BarcodeScanner />

          <View className="flex flex-row w-full">
            <TextInput
              placeholder="Or enter your 6 digit code"
              className="w-[75%] ml-[5%] rounded-sm bg-slate-100 py-2 px-4 text-base text-gray-800"
              keyboardType="default"
            />
            <TouchableOpacity className="ml-3 w-14 rounded-sm bg-slate-100 py-2 px-4 text-base text-gray-800">
              <MaterialIcons name="search" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Scan;
