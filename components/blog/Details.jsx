import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import BlogCard from "./cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import { END_POINTS, showToast } from "@/helper/endpoints";
import * as WebBrowser from "expo-web-browser";
import { getValueFor, save } from "@/lib/SecureStore";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const BLOG_IDS_KEY = "openedBlogIds";

const saveBlogId = async (blogId) => {
  try {
    const existingIds = await getValueFor(BLOG_IDS_KEY);
    const blogIdsArray = existingIds ? JSON.parse(existingIds) : [];
    if (!blogIdsArray.includes(blogId)) {
      blogIdsArray.push(blogId);
    }
    await save(BLOG_IDS_KEY, JSON.stringify(blogIdsArray));
  } catch (error) {
    console.error("Error saving blog ID:", error);
  }
};

const Details = ({ setPage }) => {
  const { selectedBlog, viewBlog, setViewBlog, loading } = useBlogContext();
  const [qrBlog, setQrBlog] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const qrCode = selectedBlog?.qrCode;

  const fetchBlogsByQrCode = useCallback(async () => {
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
  }, [qrCode]);

  const handlePressButtonAsync = async () => {
    const transactionLink = qrBlog?.[0]?.tokenTranHash;
    if (transactionLink) {
      await WebBrowser.openBrowserAsync(transactionLink);
    } else {
      showToast("No blockchain link available.");
    }
  };

  useEffect(() => {
    if (!loading && selectedBlog?._id) {
      saveBlogId(selectedBlog._id);
      fetchBlogsByQrCode();
    }
  }, [selectedBlog, loading, fetchBlogsByQrCode]);

  return (
    <View style={styles.container}>
      <Header
        text="Track Your Contribution"
        desc="See details about where, when and how your contribution has been used"
      />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View>
            <View>
              {isFetching && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    style={{ marginVertical: 100 }}
                    size="large"
                    color="#000"
                  />
                </View>
              )}
              <View>
                {qrBlog.length > 0 && (
                  <BlogCard
                    charityName={qrBlog[0]?.charityName || ""}
                    key={qrBlog[0]._id}
                    title={qrBlog[0].charityName}
                    description={qrBlog[0].description}
                    donorDescription={`YNT ${qrBlog[0]?.token}`}
                    donorName={qrBlog[0]?.location}
                    updatedAtStr={qrBlog[0].fundsReceivingDate}
                    imagePath={"charity" + qrBlog[0].charityBanner}
                    onPress={() => console.log(qrBlog[0]._id)}
                  />
                )}
              </View>
              <View style={[styles.card, { padding: 4 }]}>
                <View>
                  <TouchableOpacity
                    style={styles.blockchainButton}
                    onPress={handlePressButtonAsync}
                  >
                    <Text style={[styles.buttonText, { fontWeight: "800" }]}>
                      View Blockchain
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 10 }}>
                    <Text style={styles.text}>
                      View your contribution on the blockchain
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setPage("AllBlogs")}
              style={[styles.readBlogButton, { maxWidth: 70 }]}
            >
              <View style={styles.readBlogContent}>
                <Ionicons
                  name="arrow-back"
                  size={20}
                  color="white"
                  style={styles.bookIcon}
                />
              </View>
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
                <Text style={[styles.buttonText, { fontWeight: "800" }]}>
                  Blog Overview
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blockchainButton: {
    padding: 10,
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  backButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 2,
    alignItems: "center",
  },
  readBlogButton: {
    backgroundColor: "#000",
    flex: 1,
    marginLeft: 4,
    padding: 12,
    borderRadius: 2,
  },
  readBlogContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bookIcon: {
    marginRight: 8,
  },
  contributorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contributorText: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    fontSize: 14,
    color: "#666",
  },
  textSmall: {
    fontSize: 14,
    color: "#4B5563",
  },
});

export default Details;
