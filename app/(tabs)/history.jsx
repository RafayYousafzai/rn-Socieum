import React from "react";
import Header from "@/components/Header";

import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import BlogCard from "@/components/BlogCard";
import { useBlogContext } from "@/context/BlogContext";

const History = () => {
  const { blogs, loading, } = useBlogContext();
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;



  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={"Search History"}
        desc={"View which blogs you have previously read"}
      />
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

export default History;
