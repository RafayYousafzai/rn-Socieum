import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const BlogCard = ({
  image,
  contributor,
  code,
  location,
  title,
  description,
}) => (
  <View className="bg-white rounded-xl p-6 mb-6 border border-gray-100 shadow-md">
    <Image
      source={{ uri: image }}
      className="w-full h-36 rounded-lg mb-4"
      resizeMode="cover"
    />
    <LinearGradient
      colors={["#4b5563", "#1f2937"]}
      className="rounded-lg p-4 mb-4 flex-row justify-between items-center"
    >
      <View className="flex items-center">
        <MaterialIcons name="person" size={24} color="white" />
        <Text className="text-white mt-2 text-sm text-center">
          {contributor}
        </Text>
      </View>
      <View className="flex items-center">
        <MaterialIcons name="pin" size={24} color="white" />
        <Text className="text-white mt-2 text-sm text-center">{code}</Text>
      </View>
      <View className="flex items-center">
        <MaterialIcons name="place" size={24} color="white" />
        <Text className="text-white mt-2 text-sm text-center">{location}</Text>
      </View>
    </LinearGradient>

    <Text className="text-lg font-semibold text-gray-800 mb-1">{title}</Text>
    <Text className="text-sm text-gray-600">{description}</Text>
  </View>
);

const ListBlog = () => {
  return (
    <ScrollView className="bg-gray-100 flex-1">
      <LinearGradient
        colors={["#6366f1", "#2563eb"]}
        className="mx-5 mt-10 mb-6 rounded-2xl shadow-lg"
      >
        <View className="p-8">
          <Text className="text-2xl font-bold text-white text-center mb-2">
            Blog Y
          </Text>
          <Text className="text-base text-blue-200 text-center">
            Read other blogs published by Y
          </Text>
        </View>
      </LinearGradient>

      <View className="px-5 pb-12 mt-10">
        <BlogCard
          image="https://via.placeholder.com/300x150.png?text=Cash+For+Kids"
          contributor="Contributor Name"
          code="YPVMKU"
          location="UK"
          title="Cash For Kids"
          description="Helping families and children hit hardest by the pandemic"
        />
        <BlogCard
          image="https://via.placeholder.com/300x150.png?text=Bolton+Helping+The+Homeless"
          contributor="Anonymous-blockchain su..."
          code="WVG6D6"
          location="UK"
          title="Bolton Helping The Homeless"
          description="Providing the homeless with hot and cold food"
        />
      </View>
    </ScrollView>
  );
};

export default ListBlog;
