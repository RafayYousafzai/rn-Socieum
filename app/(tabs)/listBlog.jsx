import React from "react";
import Header from "@/components/Header";

import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import BlogCard from "@/components/BlogCard";
import { useBlogContext } from "@/context/BlogContext";

const listBlog = () => {
  const { blogs, loading, } = useBlogContext();
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;



  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={"Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code to see how your contribution is progressing"
        } />
      <ScrollView className="px-5 pb-12">
        {blogs && blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default listBlog;
