import React from "react";

import { ActivityIndicator, SafeAreaView } from "react-native";
import { useBlogContext } from "@/context/BlogContext";
import ViewBlogs from "@/components/blog/Index";

const listBlog = () => {
  const { loading } = useBlogContext();

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ViewBlogs />
    </SafeAreaView>
  );
};

export default listBlog;
