import React from "react";

import { SafeAreaView } from "react-native";
import ViewBlogs from "@/components/blog/Index";

const listBlog = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ViewBlogs />
    </SafeAreaView>
  );
};

export default listBlog;
