import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import BlogCard from "@/components/blog/cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import Header from "@/components/Header";
import { getValueFor } from "@/lib/SecureStore";

const openedBlogIds = "openedBlogIds";

export default function AllBlogs({ setPage, onlyHistory }) {
  const { blogs, setViewBlog } = useBlogContext();
  const [historyIds, setHistoryIds] = useState([]);

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
  }, [onlyHistory]);

  const filteredBlogs = onlyHistory
    ? blogs.filter((blog) => historyIds.includes(blog._id))
    : blogs;

  return (
    <View style={{ flex: 1 }}>
      <Header text={"Blog Y"} desc={"Read other blogs published by Y"} />
      <FlatList
        data={filteredBlogs}
        keyExtractor={(blog) => blog._id} // Unique key for each blog
        renderItem={({ item }) => (
          <BlogCard
            key={item._id}
            title={item?.title || ""}
            description={item?.description || ""}
            donorDescription={item?.donorDescription || ""}
            imagePath={item?.imagePath || ""}
            updatedAt={item?.updatedAt || ""}
            donorName={item?.donorName || ""}
            _id={item?._id || ""}
            onPress={(_id) => {
              setViewBlog(_id);
              setPage("Details");
            }}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }} // Adjust padding as needed
      />
    </View>
  );
}
