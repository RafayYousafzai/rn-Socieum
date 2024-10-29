import React from "react";
import Header from "@/components/Header";

import { ActivityIndicator, SafeAreaView } from "react-native";
import { useBlogContext } from "@/context/BlogContext";
import ViewBlogs from "@/components/blog/Index";

const listBlog = () => {
  const { loading, } = useBlogContext();

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={"Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code to see how your contribution is progressing"
        } />
      <ViewBlogs />
    </SafeAreaView>
  );
};

export default listBlog;
