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

const Details = ({ setPage, blog }) => {
  const { selectedBlogs, loading } = useBlogContext();
  const [qrBlog, setQrBlog] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  console.log("qrBlog", qrBlog);

  const qrCode = selectedBlogs?.qrCode;

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
        return;
      }

      const data = await res.json();
      if (data.data.length === 0) {
        showToast("No Contribution found against this QR code.");
        setQrBlog([]);
        return;
      }

      setQrBlog(data.data); // Set qrBlog as the array from response data
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
    if (!loading) {
      fetchBlogsByQrCode();
    }
  }, [selectedBlogs, loading]);

  return (
    <View className="flex-1">
      <Header
        text="Track Your Contribution"
        desc="See details about where, when and how your contribution has been used"
      />
      <View style={styles.container}>
        {isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
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
            <TouchableOpacity
              onPress={() => setPage("OverView")}
              style={styles.overviewButton}
            >
              <Text style={styles.overviewButtonText}>Blog Overview</Text>
            </TouchableOpacity>
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
    borderRadius: 10,
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
    borderRadius: 3,
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
    borderRadius: 3,
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
});

export default Details;
