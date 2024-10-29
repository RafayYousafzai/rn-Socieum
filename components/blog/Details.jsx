import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import BlogCard from "./cards/BlogCard";

const Details = ({ setPage }) => {
  const blog = {
    key: "key",
    title: "title",
    description: "description",
    donorDescription: "donorDescription",
    imagePath: "imagePath",
    updatedAt: "updatedAt",
    donorName: "donorName",
    _id: "_id",
  };

  return (
    <View>
      <Header
        text={"Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code to see how your contribution is progressing"
        }
      />

      <BlogCard
        key={blog._id}
        title={blog?.title || ""}
        description={blog?.description || ""}
        donorDescription={blog?.donorDescription || ""}
        imagePath={blog?.imagePath || ""}
        updatedAt={blog?.updatedAt || ""}
        donorName={blog?.donorName || ""}
        _id={blog?._id || ""}
      />
      <TouchableOpacity onPress={() => setPage("AllBlogs")}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage("OverView")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
