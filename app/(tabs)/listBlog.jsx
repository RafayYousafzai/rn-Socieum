import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import BlogCard from "../../components/BlogCard";
import BlogDetails from "../../components/BlogDetails";

const ListBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBlogPress = (blogData) => {
    setSelectedBlog(blogData);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={"Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code to see how your contribution is progressing"
        }
      />

      <ScrollView className="bg-gray-100 flex-1">
        <View className="px-5 pb-12 mt-10">
          <BlogCard
            image="https://via.placeholder.com/300x150.png?text=Cash+For+Kids"
            contributor="Contributor Name"
            contribution="500 YNT"
            date="28-10-2021"
            location="Manchester"
            title="Cash For Kids"
            description="Helping families and children hit hardest by the pandemic"
            onPress={handleBlogPress}
          />
          <BlogCard
            image="https://via.placeholder.com/300x150.png?text=Bolton+Helping+The+Homeless"
            contributor="Anonymous"
            contribution="750 YNT"
            date="29-10-2021"
            location="Bolton"
            title="Bolton Helping The Homeless"
            description="Providing the homeless with hot and cold food"
            onPress={handleBlogPress}
          />
        </View>
      </ScrollView>

      <BlogDetails
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        blogData={selectedBlog}
      />
    </SafeAreaView>
  );
};

export default ListBlog;
