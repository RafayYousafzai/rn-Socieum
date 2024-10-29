import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import BlogDetails from "@/components/BlogDetails";
import { useBlogContext } from "@/context/BlogContext";
import { SERVER_URL } from "@/helper/endpoints";

const ListBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { blogs, loading, error } = useBlogContext();

  const handleBlogPress = (blogData) => {
    setSelectedBlog(blogData);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3B82F6"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text style={{ color: "#EF4444", fontSize: 16 }}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

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
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              image={`${SERVER_URL}${blog.imagePath}`}
              contributor={blog.donorName}
              contribution={`${blog.donorDescription}`}
              date={new Date(blog.updatedAt).toLocaleDateString()}
              location={blog.location || "Unknown"}
              title={blog.title}
              description={blog.description}
              onPress={() => handleBlogPress(blog)}
            />
          ))}
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
