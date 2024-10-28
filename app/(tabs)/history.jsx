import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const HistoryCard = ({ contribution, date, location, title, description }) => (
  <View className="bg-white rounded-xl p-6 mb-6 border border-gray-100 shadow-md elevation-5">
    <View className="bg-gray-200 rounded-xl p-4 mb-4">
      <LinearGradient
        colors={["#4b5563", "#1f2937"]}
        className="rounded-xl p-4 flex-row justify-between items-center"
      >
        <View className="flex items-center">
          <MaterialIcons name="attach-money" size={24} color="white" />
          <Text className="text-white mt-2">{contribution}</Text>
        </View>
        <View className="flex items-center">
          <MaterialIcons name="calendar-today" size={24} color="white" />
          <Text className="text-white mt-2">{date}</Text>
        </View>
        <View className="flex items-center">
          <MaterialIcons name="location-on" size={24} color="white" />
          <Text className="text-white mt-2">{location}</Text>
        </View>
      </LinearGradient>
    </View>

    <Text className="text-lg font-semibold text-gray-800 mb-2">{title}</Text>
    <Text className="text-base text-gray-600">{description}</Text>
  </View>
);

const History = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={"Search History"}
        desc={"View which blogs you have previously read"}
      />
      <View className="px-5 pb-12 mt-10">
        <HistoryCard
          contribution="500 YNT"
          date="29-10-2022"
          location="Across the UK"
          title="School Uniform & Educational Support"
          description="Providing free school uniform and educational equipment to support school children."
        />
      </View>
    </SafeAreaView>
  );
};

export default History;
