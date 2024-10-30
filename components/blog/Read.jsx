import { SafeAreaView } from "react-native";
import React from "react";
import ReadBlog from "./ReadBlog";

const OverView = ({ setPage, blog }) => {
  return (
    <SafeAreaView className="flex-1">
      <ReadBlog />
    </SafeAreaView>
  );
};

export default OverView;
