import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import BlogCard from "./cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import { END_POINTS, showToast } from "@/helper/endpoints";
import * as WebBrowser from "expo-web-browser";
import { getValueFor, save } from "@/lib/SecureStore";
import { Ionicons } from "@expo/vector-icons";

const BLOG_IDS_KEY = "openedBlogIds";

const saveBlogId = async (blogId) => {
  try {
    const existingIds = await getValueFor(BLOG_IDS_KEY);
    const blogIdsArray = existingIds ? JSON.parse(existingIds) : [];
    // console.log(existingIds);

    if (!blogIdsArray.includes(blogId)) {
      blogIdsArray.push(blogId);
    }

    await save(BLOG_IDS_KEY, JSON.stringify(blogIdsArray));
  } catch (error) {
    console.error("Error saving blog ID:", error);
  }
};

const Details = ({ setPage }) => {
  const { selectedBlog, loading } = useBlogContext();
  const [qrBlog, setQrBlog] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const qrCode = selectedBlog?.qrCode;

  const fetchBlogsByQrCode = async () => {
    if (!qrCode) {
      showToast("No QR Code.");
      return;
    }

    setIsFetching(true);
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode });
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        showToast("Failed to fetch data: " + errorData.message);
        return;
      }

      const data = await res.json();
      if (data.data.length === 0) {
        showToast("No Contribution found against this QR code.");
        setQrBlog([]);
        return;
      }

      setQrBlog(data.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      showToast("An error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  const _handlePressButtonAsync = async () => {
    if (qrBlog?.[0]?.tokenTranHash) {
      await WebBrowser.openBrowserAsync(qrBlog[0].tokenTranHash);
    } else {
      showToast("No blockchain link available.");
    }
  };

  useEffect(() => {
    if (!loading && selectedBlog?._id) {
      saveBlogId(selectedBlog._id);
    }

    if (!loading) {
      fetchBlogsByQrCode();
    }
  }, [selectedBlog, loading]);

  return (
    <View className="flex-1">
      <Header
        text="Track Your Contribution"
        desc="See details about where, when and how your contribution has been used"
      />
      <View style={styles.container}>
        {isFetching ? (
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <View>
            {qrBlog.length > 0 && (
              <BlogCard
                key={qrBlog[0]._id}
                title={qrBlog[0].charityName}
                description={qrBlog[0].description}
                imagePath={"charity" + qrBlog[0].charityBanner}
                updatedAt={qrBlog[0].fundsReceivingDate}
                onPress={() => console.log(qrBlog[0]._id)}
              />
            )}

            <View style={styles.card}>
              <TouchableOpacity>
                <Text style={styles.text}>
                  View your Contribution on the blockchain
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={_handlePressButtonAsync}
              >
                <Text style={styles.buttonText}>View Blockchain</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setPage("AllBlogs")}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPage("OverView")}
                style={styles.readBlogButton}
              >
                <View style={styles.readBlogContent}>
                  <Ionicons
                    name="reader-outline"
                    size={20}
                    color="white"
                    style={styles.bookIcon}
                  />
                  <Text style={styles.overviewButtonText}>Blog Overview</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  card: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android
  },
  button: {
    padding: 8,
    backgroundColor: "#000",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  overviewButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#000",
    alignItems: "center",
  },
  overviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  backButton: {
    backgroundColor: "#000",
    padding: 10,
    width: 90,
    alignItems: "center",
  },
  readBlogButton: {
    backgroundColor: "#000",
    flex: 1,
    marginLeft: 4,
    padding: 12,
  },
  readBlogContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bookIcon: {
    marginRight: 8,
  },
});

export default Details;
