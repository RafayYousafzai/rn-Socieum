import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import BlogCard from "@/components/blog/cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import Header from "@/components/Header";
import NoBlogHistory from "./NoBlogHistory";
import { getValueFor } from "@/lib/SecureStore";
import { END_POINTS, showToast } from "../../helper/endpoints";

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
          desc={"View which blogs you have previously read"}
        />
      ) : (
        <Header text={"Blog Y"} desc={"Read other blogs published by Y"} />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredBlogs.length > 0 ? (
        <FlatList
          data={filteredBlogs}
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
      key={item._id}
      title={item?.title}
      description={item?.description}
      donorDescription={item?.donorName}
      imagePath={item?.imagePath}
      updatedAt={false}
      updatedAtStr={item?.qrCodeUniqueString}
      donorName={"UK"}
      _id={item?._id}
      onPress={() => handlePress(item._id)}
      hideLabel={false}
    />
  );
};
const HistoryCard = ({ item, handlePress }) => {
  const [qrBlog, setQrBlog] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchBlogsByQrCode = useCallback(async () => {
    setIsFetching(true);
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode: item.qrCode });
      const res = await fetch(url);
      console.log(url);
      if (!res.ok) {
        const errorData = await res.json();
        showToast("Failed to fetch data: " + errorData.message);
        return;
      }
      const data = await res.json();
      setQrBlog(data.data.length > 0 ? data.data : []);
      if (data.data.length === 0) {
        showToast("No Contribution found against this QR code.");
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      showToast("An error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogsByQrCode();
  }, []);

  if (isFetching) {
    return;
  }

  return (
    <BlogCard
      key={qrBlog[0]?._id || ""}
      title={qrBlog[0]?.charityName || ""}
      description={qrBlog[0]?.description || ""}
      donorDescription={`YNT ${qrBlog[0]?.token}`}
      donorName={qrBlog[0]?.location}
      updatedAtStr={qrBlog[0]?.fundsReceivingDate || ""}
      imagePath={"charity" + qrBlog[0]?.charityBanner || ""}
      onPress={() => handlePress(item._id)}
      hideLabel={false}
    />
  );
};
