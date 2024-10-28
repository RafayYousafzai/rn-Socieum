import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const Scan = () => {
  return (
    <ScrollView className="bg-gray-100 flex-1">
      <LinearGradient
        colors={["#6366f1", "#2563eb"]}
        className="mx-5 mt-10 mb-6 rounded-2xl shadow-lg elevation-8"
        style={{ borderRadius: 10 }}

      >
        <View className="p-8">
          <Text className="text-2xl font-bold text-white text-center mb-2">
            Scan Your QR Code
          </Text>
          <Text className="text-base text-blue-200 text-center">
            Scan your QR code or use your 6 digit code to see how your
            contribution is progressing
          </Text>
        </View>
      </LinearGradient>

      <View className="px-5 pb-12 mt-10 items-center">
        <Image
          source={{
            uri: "https://www.google.com",
          }}
          className="w-[200px] h-[200px] mb-[20px]"
        />
        <View className="items-center mb-10">
          <MaterialIcons name="qr-code-scanner" size={40} color="#3b82f6" />
          <Text className="text-lg font-medium text-gray-800 mt-2">SCAN</Text>
        </View>

        <View className="flex-row items-center bg-white rounded-full shadow-md p-4">
          <TextInput
            placeholder="Or enter your 6 digit code"
            className="flex-1 text-base text-gray-800"
            keyboardType="numeric"
          />
          <TouchableOpacity className="ml-3">
            <MaterialIcons name="search" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Scan;
