import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import BlogCard from "./cards/BlogCard";
import { Ionicons } from "@expo/vector-icons";
import { END_POINTS, showToast } from "../../helper/endpoints";

const OverView = ({ setPage, blog }) => {
  const [qrBlog, setQrBlog] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  console.log(qrBlog);

  const fetchBlogsByQrCode = useCallback(async () => {
    setIsFetching(true);
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode: blog.qrCode });
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

  return (
    <View style={styles.flexContainer}>
      <Header
        text={"Blog Overview"}
        desc={
          "View a summary of your contribution and see how you have helped to change lives"
        }
      />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <BlogCard
              charityName={qrBlog[0]?.charityName || ""}
              key={blog._id}
              title={blog?.title || ""}
              description={blog?.description || ""}
              imagePath={blog?.imagePath}
              donorName={qrBlog[0]?.location}
              updatedAt={false}
              updatedAtStr={blog?.qrCodeUniqueString || ""}
              donorDescription={blog?.donorName || ""}
              _id={blog?._id || ""}
              onPress={() => console.log(blog._id)}
            />
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={{ padding: 5 }}>
              <View style={styles.contributorContainer}>
                <Text style={styles.contributorText}>Contributor</Text>
                <Text style={styles.text}>{blog.donorName || ""}</Text>
              </View>
              <Text style={styles.aboutText}>
                About Contributor: {qrBlog[0]?.goodsName}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setPage("Details")}
              style={[styles.backButton, { maxWidth: 70 }]}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPage("Read")}
              style={[styles.readBlogButton, { marginLeft: 4 }]}
            >
              <View style={styles.readBlogContent}>
                <Text style={[styles.readBlogText, { fontWeight: "800" }]}>
                  Read The Blog
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: 4,
  },
  contributorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginRight: 5,
  },
  contributorText: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    fontSize: 14,
    color: "#666",
  },
  text: {
    fontSize: 13,
    color: "#333",
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
    lineHeight: 20,
  },
  seeDetailsButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
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
  readBlogText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default OverView;
