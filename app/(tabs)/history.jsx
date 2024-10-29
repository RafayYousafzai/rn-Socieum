import React from "react";
import Header from "@/components/Header";

import { SafeAreaView, ScrollView } from "react-native";
import BlogCard from "@/components/BlogCard";
import { useBlogContext } from "@/context/BlogContext";

const History = () => {
  const { blogs, loading, error, fetchBlogs } = useBlogContext();
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;



  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        text={"Search History"}
        desc={"View which blogs you have previously read"}
      />
      <ScrollView className="px-5 pb-12">
        <BlogCard
          contribution="500 YNT"
          date="29-10-2022"
          location="Across the UK"
          title="School Uniform & Educational Support"
          description="Providing free school uniform and educational equipment to support school children."
        />
        <BlogCard
          contribution="500 YNT"
          date="29-10-2022"
          location="Across the UK"
          title="School Uniform & Educational Support"
          description="Providing free school uniform and educational equipment to support school children."
        />
        <BlogCard
          contribution="500 YNT"
          date="29-10-2022"
          location="Across the UK"
          title="School Uniform & Educational Support"
          description="Providing free school uniform and educational equipment to support school children."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
