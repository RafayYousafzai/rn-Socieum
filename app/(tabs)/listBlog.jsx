import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import BlogCard from "../../components/BlogCard";

const ListBlog = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={" Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code to see how your contribution is progressing"
        }
      />

      <ScrollView className="bg-gray-100 flex-1">
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
    </SafeAreaView>
  );
};

export default ListBlog;
