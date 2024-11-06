import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import BlogCard from "@/components/blog/cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import Header from "@/components/Header";
import NoBlogHistory from "./NoBlogHistory";
import { getValueFor } from "@/lib/SecureStore";
const openedBlogIds = "openedBlogIds";

export default function AllBlogs({ setPage, onlyHistory }) {
  const { blogs, setViewBlog } = useBlogContext();

  const [historyIds, setHistoryIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryIds = async () => {
      try {
        const existingIds = await getValueFor(openedBlogIds);
        const blogIdsArray = existingIds ? JSON.parse(existingIds) : [];
        setHistoryIds(blogIdsArray);
      } catch (error) {
        console.error("Error fetching blog IDs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (onlyHistory) {
      fetchHistoryIds();
    } else {
      setHistoryIds([]);
      setLoading(false);
    }
  }, [onlyHistory, setViewBlog]);

  const filteredBlogs = onlyHistory
    ? blogs.filter((blog) => historyIds.includes(blog._id))
    : blogs;

  const handlePress = (_id) => {
    setViewBlog(_id);
    setPage("Details");
  };

  return (
    <View style={{ flex: 1 }}>
      {onlyHistory ? (
        <Header
          text={"Search History"}
          desc={"View blogs you have previously read"}
        />
      ) : (
        <Header text={"Blog Y"} desc={"Read other blogs published by Y"} />
      )}
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          size="large"
          color="#000"
        />
      ) : filteredBlogs.length > 0 ? (
        <FlatList
          data={filteredBlogs.filter((blog) => blog.title !== "Gira")}
          keyExtractor={(blog) => blog._id}
          renderItem={({ item }) =>
            onlyHistory ? (
              <HistoryCard item={item} handlePress={handlePress} />
            ) : (
              <BasicCard item={item} handlePress={handlePress} />
            )
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        />
      ) : (
        <NoBlogHistory />
      )}
    </View>
  );
}

const BasicCard = ({ item, handlePress }) => {
  return (
    <BlogCard
      charityName={item?.more?.charityName || ""}
      key={item._id}
      _id={item?._id}
      title={item?.title}
      description={item?.description}
      imagePath={item?.imagePath}
      donorName={item?.more.location}
      donorDescription={item?.donorName}
      updatedAtStr={item?.qrCodeUniqueString}
      updatedAt={false}
      onPress={() => handlePress(item._id)}
      hideLabel={false}
    />
  );
};
const HistoryCard = ({ item, handlePress }) => {
  return (
    <BlogCard
      charityName={item?.more?.charityName || ""}
      key={item?.more?._id || ""}
      title={item?.title}
      description={item?.description}
      imagePath={item?.imagePath}
      donorName={item?.more?.location}
      donorDescription={`YNT ${item?.more?.token}`}
      updatedAtStr={item?.more?.fundsReceivingDate || ""}
      onPress={() => handlePress(item._id)}
      hideLabel={false}
    />
  );
};
