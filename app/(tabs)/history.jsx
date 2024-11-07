import React from "react";

import { SafeAreaView } from "react-native";
import ViewBlogs from "@/components/blog/Index";

const listBlog = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ViewBlogs onlyHistory={true} />
    </SafeAreaView>
  );
};

export default listBlog;
