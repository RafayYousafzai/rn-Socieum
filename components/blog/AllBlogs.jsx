import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import BlogCard from "@/components/blog/cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import Header from "@/components/Header";
import NoBlogHistory from "./NoBlogHistory";
import { getValueFor } from "@/lib/SecureStore";

const openedBlogIds = "openedBlogIds";

export default function AllBlogs({ setPage, onlyHistory }) {
  const { blogs, setViewBlog } = useBlogContext();
  const [historyIds, setHistoryIds] = useState([]);
  // console.log(...blogs);

  useEffect(() => {
    const fetchHistoryIds = async () => {
      try {
        const existingIds = await getValueFor(openedBlogIds);
        const blogIdsArray = existingIds ? JSON.parse(existingIds) : [];
        setHistoryIds(blogIdsArray); // Store the history IDs in state
      } catch (error) {
        console.error("Error fetching blog IDs:", error);
      }
    };

    if (onlyHistory) {
      fetchHistoryIds();
    } else {
      setHistoryIds([]);
    }
  }, [onlyHistory, setViewBlog]);

  const filteredBlogs = onlyHistory
    ? blogs.filter((blog) => historyIds.includes(blog._id))
    : blogs;

  return (
    <View style={{ flex: 1 }}>
      <Header
        text={"Blog"}
        desc={"Read other blogs published by Y"}
        logo={true}
      />
      {filteredBlogs.length > 0 ? (
        <FlatList
          data={filteredBlogs}
          keyExtractor={(blog) => blog._id}
          renderItem={({ item }) => (
            <BlogCard
              key={item._id}
              title={item?.title || ""}
              description={item?.description || ""}
              donorDescription={item?.donorName || ""}
              imagePath={item?.imagePath || ""}
              updatedAt={item?.childStory[0]?.updatedAt || ""}
              donorName={"UK"}
              _id={item?._id || ""}
              onPress={(_id) => {
                setViewBlog(_id);
                setPage("Details");
              }}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        />
      ) : (
        <NoBlogHistory />
      )}
    </View>
  );
}
