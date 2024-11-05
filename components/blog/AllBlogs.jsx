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
        <ActivityIndicator
          style={{ marginTop: 100 }}
          size="large"
          color="#000"
        />
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
  const [qrBlog, setQrBlog] = useState(null);

  const fetchBlogsByQrCode = async () => {
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode: item.qrCode });
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        showToast("Failed to fetch data: " + errorData.message);
        return;
      }

      const data = await res.json();
      if (data.data.length > 0) {
        setQrBlog(data.data[0]); // Set only the first item if multiple are returned
      } else {
        showToast("No Contribution found against this QR code.");
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      showToast("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchBlogsByQrCode();
  }, []);

  if (!qrBlog) {
    return null;
  }

  return (
    <BlogCard
      charityName={qrBlog.charityName || ""}
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
  const [qrBlog, setQrBlog] = useState(null);

  const fetchBlogsByQrCode = async () => {
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode: item.qrCode });
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        showToast("Failed to fetch data: " + errorData.message);
        return;
      }

      const data = await res.json();
      if (data.data.length > 0) {
        setQrBlog(data.data[0]); // Set only the first item if multiple are returned
      } else {
        showToast("No Contribution found against this QR code.");
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      showToast("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchBlogsByQrCode();
  }, []);

  if (!qrBlog) {
    return null;
  }

  return (
    <BlogCard
      charityName={qrBlog.charityName || ""}
      key={qrBlog._id || ""}
      title={qrBlog.charityName || ""}
      description={qrBlog.description || ""}
      donorDescription={`YNT ${qrBlog.token}`}
      donorName={qrBlog.location}
      updatedAtStr={qrBlog.fundsReceivingDate || ""}
      // imagePath={`charity${qrBlog.charityBanner || ""}`}
      onPress={() => handlePress(item._id)}
      imagePath={item?.imagePath}
      hideLabel={false}
    />
  );
};
